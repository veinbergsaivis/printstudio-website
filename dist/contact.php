<?php
// Contact form handler for cPanel (PHP)
// - Tries PHPMailer via Composer if available (SMTP support)
// - Falls back to PHP mail() if PHPMailer not installed

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

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

if ($honeypot !== '') {
  http_response_code(200);
  echo json_encode(['ok' => true]); // silently accept
  exit;
}

if ($name === '' || $email === '' || $message === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Invalid email']);
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
    'host' => 'smtp.yourdomain.lv',
    'port' => 587,
    'user' => 'no-reply@yourdomain.lv',
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

$subject = 'New contact form message from ' . $name;
$body = "Name: {$name}\nEmail: {$email}\n\nMessage:\n{$message}\n";

// Try PHPMailer if available and enabled
$autoload1 = $cfg['repo_root'] . '/vendor/autoload.php';
$autoload2 = __DIR__ . '/../vendor/autoload.php'; // in case vendor is copied near public_html

$phpmailerAvailable = file_exists($autoload1) || file_exists($autoload2);

if ($phpmailerAvailable && (!empty($cfg['smtp']['enabled']))) {
  // Load Composer autoload
  if (file_exists($autoload1)) {
    require_once $autoload1;
  } elseif (file_exists($autoload2)) {
    require_once $autoload2;
  }
  try {
    $mailer = new PHPMailer\PHPMailer\PHPMailer(true);
    if (!empty($cfg['smtp']['enabled'])) {
      $mailer->isSMTP();
      $mailer->Host = $cfg['smtp']['host'];
      $mailer->SMTPAuth = true;
      $mailer->Username = $cfg['smtp']['user'];
      $mailer->Password = $cfg['smtp']['pass'];
      $mailer->SMTPSecure = $cfg['smtp']['secure'];
      $mailer->Port = (int)$cfg['smtp']['port'];
    }

    $mailer->CharSet = 'UTF-8';
    $mailer->setFrom($cfg['from'], 'Website');
    $mailer->addAddress($cfg['to']);
    $mailer->addReplyTo($email, $name);
    $mailer->Subject = $subject;
    $mailer->Body = $body;

    $mailer->send();
    echo json_encode(['ok' => true]);
    exit;
  } catch (Throwable $e) {
    // fall through to mail() as a backup
  }
}

// Fallback: PHP mail()
$headers = "From: {$cfg['from']}\r\nReply-To: {$email}\r\nX-Mailer: PHP/" . phpversion();
$sent = @mail($cfg['to'], $subject, $body, $headers);

if ($sent) {
  echo json_encode(['ok' => true]);
} else {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Failed to send email']);
}
