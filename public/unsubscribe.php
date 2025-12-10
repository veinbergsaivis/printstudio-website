<?php
// Unsubscribe handler
header('Content-Type: text/html; charset=utf-8');
ini_set('default_charset', 'UTF-8');

$email = trim($_GET['email'] ?? $_POST['email'] ?? '');
$token = trim($_GET['token'] ?? $_POST['token'] ?? '');

if (!$email || !$token) {
  echo "<h3>Neizdevās atteikties. Trūkst parametru.</h3>";
  exit;
}

// Load config same as newsletter.php
$configPath = __DIR__ . '/contact.config.php';
$cfg = [
  'to' => 'info@printstudio.lv',
  'from' => 'no-reply@printstudio.lv',
  'repo_root' => '/home4/printstu/repositories/printstudio-website',
];
if (file_exists($configPath)) {
  $userCfg = include $configPath;
  if (is_array($userCfg)) $cfg = array_replace_recursive($cfg, $userCfg);
}

$secret = $cfg['from'] ?? 'no-reply@printstudio.lv';
$calc = hash_hmac('sha256', strtolower($email), $secret);
if (!hash_equals($calc, $token)) {
  echo "<h3>Neizdevās pārbaudīt pieprasījumu. Token sakritība neizdevās.</h3>";
  exit;
}

$subscribersFile = __DIR__ . '/subscribers.json';
$subscribers = [];
if (file_exists($subscribersFile)) {
  $json = file_get_contents($subscribersFile);
  $subscribers = json_decode($json, true) ?: [];
}

$removed = false;
$new = [];
foreach ($subscribers as $s) {
  if (isset($s['email']) && strtolower($s['email']) === strtolower($email)) {
    $removed = true;
    continue;
  }
  $new[] = $s;
}

if ($removed) {
  @file_put_contents($subscribersFile, json_encode($new, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
  // notify admin
  $subject = 'Atteikšanās no jaunumiem - ' . $email;
  $body = "Lietotājs ir atteicies no jaunumiem:\n\nEmail: {$email}\nLaiks: " . date('Y-m-d H:i:s') . "\n";
  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
  $headers .= "From: {$cfg['from']}\r\n";
  @mail($cfg['to'], $subject, $body, $headers);

  echo "<h3>Paldies — Jūs esat atteicies no jaunumu saņemšanas.</h3>";
  echo "<p>Ja vēlaties pierakstīties atpakaļ, varat to izdarīt mūsu mājaslapā.</p>";
  exit;
} else {
  echo "<h3>Nav atrasts abonents ar šo e-pastu.</h3>";
  exit;
}
