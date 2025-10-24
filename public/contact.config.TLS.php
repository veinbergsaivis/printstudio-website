<?php
/**
 * Contact Form Configuration - ALTERNATIVE TLS VERSION
 * Use this if SSL (port 465) doesn't work
 * 
 * PRODUCTION SERVER CONFIG - DO NOT COMMIT TO GIT
 */

return [
  'to' => 'info@printstudio.lv',
  'from' => 'no-reply@printstudio.lv',
  
  'smtp' => [
    'enabled' => true,
    'host' => 'printstudio.lv',          // SMTP serveris
    'port' => 587,                        // TLS ports (alternatīva)
    'user' => 'no-reply@printstudio.lv',
    'pass' => 'b6G_TivVkjbXM8nT',
    'secure' => 'tls',                    // TLS šifrēšana (ports 587)
  ],
  
  'repo_root' => '/home4/printstu/repositories/printstudio-website',
];
