<?php
// Contact form handler for cPanel (PHP)
// - Tries PHPMailer via Composer if available (SMTP support)
// - Falls back to PHP mail() if PHPMailer not installed

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
// UTF-8 encoding for email
ini_set('default_charset', 'UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

// Read JSON or form-encoded
$input = file_get_contents('php://input');
$data = json_decode($input, true);
if (!$data) {
  // fallback to form POST
  $data = $_POST;
}

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$message = trim($data['message'] ?? '');
$honeypot = trim($data['company'] ?? ''); // hidden field to catch bots
$recaptchaToken = trim($data['recaptchaToken'] ?? '');

// ⚠️ TEMPORARY: reCAPTCHA check disabled
// TODO: Register new reCAPTCHA keys for printstudio.lv domain at https://www.google.com/recaptcha/admin/create
// Current key '6LcA2OOrAAAAANbWMHQqlSOIDOtGIQtJjQRisbnA3' is not valid for this domain
/*
$recaptchaSecret = '6LcA2OOrAAAAAktrGXf0J-Ko3zg3pt9DXfRsnO8F';
if ($recaptchaToken === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Nav reCAPTCHA tokena']);
  exit;
}
$verify = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode($recaptchaSecret) . '&response=' . urlencode($recaptchaToken));
$captchaSuccess = json_decode($verify, true);
if (!$captchaSuccess['success'] || $captchaSuccess['score'] < 0.5) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'reCAPTCHA pārbaude neizdevās']);
  exit;
}
*/

// Faila apstrāde
$file = null;
$fileError = null;
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
  $file = $_FILES['file'];
  // Faila validācija (max 10MB, atļautie tipi)
  $allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if ($file['size'] > 10 * 1024 * 1024) {
    $fileError = 'Fails ir pārāk liels (max 10MB)';
  } elseif (!in_array($file['type'], $allowedTypes)) {
    $fileError = 'Faila tips nav atļauts';
  }
}

if ($honeypot !== '') {
  http_response_code(200);
  echo json_encode(['ok' => true]); // silently accept
  exit;
}

if ($name === '' || $email === '' || $message === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Trūkst obligātu lauku']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Nederīgs e-pasts']);
  exit;
}

if ($fileError) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => $fileError]);
  exit;
}

// Load optional config (DO NOT commit secrets). On server, copy and edit contact.config.php.
$configPath = __DIR__ . '/contact.config.php';
$cfg = [
  'to' => 'info@printstudio.lv',
  'from' => 'no-reply@printstudio.lv',
  // SMTP (optional): set on server for better deliverability
  'smtp' => [
    'enabled' => false,
    'host' => 'smtp.printstudio.lv',
    'port' => 587,
    'user' => 'no-reply@printstudio.lv',
    'pass' => 'CHANGE_ME',
    'secure' => 'tls', // tls or ssl
  ],
  // Absolute repo path for Composer vendor (cPanel repo path)
  'repo_root' => '/home4/printstu/repositories/printstudio-website',
];
if (file_exists($configPath)) {
  // phpcs:ignore
  $userCfg = include $configPath; // should return array
  if (is_array($userCfg)) {
    $cfg = array_replace_recursive($cfg, $userCfg);
  }
}

// Prepare subject and body. Encode subject for non-ASCII names in headers.
$rawSubject = 'New contact form message from ' . $name;
$body = "Name: {$name}\nEmail: {$email}\n\nMessage:\n{$message}\n";

// Ensure mbstring available and set internal encoding
if (function_exists('mb_internal_encoding')) {
  mb_internal_encoding('UTF-8');
}

if (function_exists('mb_encode_mimeheader')) {
  $subject = mb_encode_mimeheader($rawSubject, 'UTF-8', 'B');
} else {
  // Fallback to RFC2047 Base64 encoding
  $subject = '=?UTF-8?B?' . base64_encode($rawSubject) . '?=';
}

// Try PHPMailer first (best for attachments & encoding)
$autoload1 = $cfg['repo_root'] . '/vendor/autoload.php';
$autoload2 = __DIR__ . '/../vendor/autoload.php';

if ((file_exists($autoload1) || file_exists($autoload2)) && $cfg['smtp']['enabled']) {
  if (file_exists($autoload1)) {
    require_once $autoload1;
  } elseif (file_exists($autoload2)) {
    require_once $autoload2;
  }
  
    try {
    $mailer = new PHPMailer\PHPMailer\PHPMailer(true);
    $mailer->isSMTP();
    $mailer->Host = $cfg['smtp']['host'];
    $mailer->SMTPAuth = true;
    $mailer->Username = $cfg['smtp']['user'];
    $mailer->Password = $cfg['smtp']['pass'];
    $mailer->SMTPSecure = $cfg['smtp']['secure'];
    $mailer->Port = (int)$cfg['smtp']['port'];
    $mailer->CharSet = 'UTF-8';
    $mailer->setFrom($cfg['from'], 'PrintStudio');
    $mailer->addAddress($cfg['to']);
    // Use raw subject for PHPMailer (it will encode correctly)
    $mailer->addReplyTo($email, $name);
    $mailer->Subject = $rawSubject;
    $mailer->Body = $body;
    $mailer->isHTML(false);

    // Add attachment if file present
    if ($file) {
      $mailer->addAttachment($file['tmp_name'], $file['name']);
    }

    $mailer->send();
    echo json_encode(['ok' => true]);
    exit;
  } catch (Exception $e) {
    // Fall through to mail() backup
  }
}

// Fallback: PHP mail() - with proper UTF-8 headers
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= "From: {$cfg['from']}\r\n";

// If sender provided a name, encode it for Reply-To header
if (!empty($name) && function_exists('mb_encode_mimeheader')) {
  $encodedName = mb_encode_mimeheader($name, 'UTF-8', 'B');
  $headers .= "Reply-To: {$encodedName} <{$email}>\r\n";
} elseif (!empty($name)) {
  $headers .= "Reply-To: \"{$name}\" <{$email}>\r\n";
} else {
  $headers .= "Reply-To: {$email}\r\n";
}

$headers .= "X-Mailer: PHP/" . phpversion();

$mailBody = "Name: {$name}\nEmail: {$email}\n\nMessage:\n{$message}\n";

// For attachments with mail(), we need multipart MIME
if ($file) {
  $boundary = "boundary_" . md5(time());
  $headers .= "\r\nContent-Type: multipart/mixed; boundary=\"{$boundary}\"";
  
  $mailBody = "--{$boundary}\r\n";
  $mailBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
  $mailBody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
  $mailBody .= "Name: {$name}\nEmail: {$email}\n\nMessage:\n{$message}\n";
  $mailBody .= "\r\n--{$boundary}\r\n";
  $mailBody .= "Content-Type: application/octet-stream\r\n";
  $mailBody .= "Content-Transfer-Encoding: base64\r\n";
  $mailBody .= "Content-Disposition: attachment; filename=\"" . basename($file['name']) . "\"\r\n\r\n";
  $mailBody .= chunk_split(base64_encode(file_get_contents($file['tmp_name'])));
  $mailBody .= "\r\n--{$boundary}--";
} else {
  $headers .= "\r\nContent-Type: text/plain; charset=UTF-8";
}

// Use encoded subject for mail() headers
$sent = @mail($cfg['to'], $subject, $mailBody, $headers);

if ($sent) {
  http_response_code(200);
  echo json_encode(['ok' => true]);
  exit;
} else {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Failed to send email']);
  exit;
}
