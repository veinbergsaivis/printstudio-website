<?php
// Copy this file to contact.config.php on the server (DO NOT COMMIT REAL SECRETS)
return [
  'to' => 'info@printstudio.lv',
  'from' => 'no-reply@printstudio.lv',
  'smtp' => [
    'enabled' => false,
    'host' => 'smtp.yourdomain.lv',
    'port' => 587,
    'user' => 'no-reply@yourdomain.lv',
    'pass' => 'CHANGE_ME',
    'secure' => 'tls',
  ],
  // Update this if your repo path differs
  'repo_root' => '/home4/printstu/repositories/printstudio-website',
];
