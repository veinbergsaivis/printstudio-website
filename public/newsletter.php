<?php
// Newsletter subscription handler
// Sends confirmation email to admin and welcomes subscriber

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
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
  $data = $_POST;
}

$email = trim($data['email'] ?? '');
$agreed = (bool)($data['agreed'] ?? false);

if (!$email) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'E-pasts ir obligāts']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Nederīgs e-pasts']);
  exit;
}

if (!$agreed) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Jums jāapstiprina parakstīšanās']);
  exit;
}

// Load config
$configPath = __DIR__ . '/contact.config.php';
$cfg = [
  'to' => 'info@printstudio.lv',
  'from' => 'no-reply@printstudio.lv',
  'smtp' => [
    'enabled' => false,
    'host' => 'smtp.printstudio.lv',
    'port' => 587,
    'user' => 'no-reply@printstudio.lv',
    'pass' => 'CHANGE_ME',
    'secure' => 'tls',
  ],
  'repo_root' => '/home4/printstu/repositories/printstudio-website',
];

if (file_exists($configPath)) {
  $userCfg = include $configPath;
  if (is_array($userCfg)) {
    $cfg = array_replace_recursive($cfg, $userCfg);
  }
}

// Prepare emails
if (function_exists('mb_internal_encoding')) {
  mb_internal_encoding('UTF-8');
}

// Email to admin
$adminSubject = 'Jauns newsletter parakstījums - ' . $email;
if (function_exists('mb_encode_mimeheader')) {
  $adminSubject = mb_encode_mimeheader($adminSubject, 'UTF-8', 'B');
}

$adminBody = "Jauns parakstījums uz jaunumiem:\n\n";
$adminBody .= "E-pasts: {$email}\n";
$adminBody .= "Laiks: " . date('Y-m-d H:i:s') . "\n";

// Email to subscriber
$subscriberSubject = 'Paldies par parakstīšanos uz jaunumiem!';
$subscriberBody = "Sveiki!\n\n";
$subscriberBody .= "Paldies, ka parakstījāties uz mūsu jaunumiem!\n\n";
$subscriberBody .= "Turpmāk jūs saņemsiet jaunākās ziņas par PrintStudio.\n\n";
$subscriberBody .= "Ar labējiem vēlējumiem,\nPrintStudio komanda\n\n";
$subscriberBody .= "Ja jūs nepieminējāties parakstīties, varat ignorēt šo vēstuli.\n";

// Try to send via PHPMailer first
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

    // Send to admin
    $mailer->clearAddresses();
    $mailer->addAddress($cfg['to']);
    $mailer->Subject = $adminSubject;
    $mailer->Body = $adminBody;
    $mailer->isHTML(false);
    $mailer->send();

    // Send to subscriber
    $mailer->clearAddresses();
    $mailer->addAddress($email);
    $mailer->Subject = $subscriberSubject;
    $mailer->Body = $subscriberBody;
    $mailer->isHTML(false);
    $mailer->send();

    echo json_encode(['ok' => true]);
    exit;
  } catch (Exception $e) {
    // Fall through to mail() backup
  }
}

// Fallback: PHP mail()
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: {$cfg['from']}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send to admin
$sent1 = @mail($cfg['to'], $adminSubject, $adminBody, $headers);

// Send to subscriber
$sent2 = @mail($email, $subscriberSubject, $subscriberBody, $headers);

if ($sent1 && $sent2) {
  http_response_code(200);
  echo json_encode(['ok' => true]);
  exit;
} else {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Kļūda sūtot e-pastu']);
  exit;
}
