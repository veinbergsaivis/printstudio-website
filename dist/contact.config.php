<?php
/**
 * Contact Form Configuration
 * PRODUCTION SERVER CONFIG - DO NOT COMMIT TO GIT
 * 
 * This file contains real passwords and SMTP credentials.
 * Keep it secure and never add to version control.
 */

return [
  // E-pasta saņēmējs (kur nāk visas kontakta formas ziņas)
  'to' => 'info@printstudio.lv',
  
  // E-pasta sūtītājs (no kā tiek sūtītas ziņas)
  'from' => 'no-reply@printstudio.lv',
  
  // SMTP konfigurācija (ieteicams labākai piegādei)
  'smtp' => [
    'enabled' => true,                    // Ieslēgts SMTP
    'host' => 'printstudio.lv',          // SMTP serveris
    'port' => 465,                        // SSL ports
    'user' => 'no-reply@printstudio.lv',  // SMTP lietotājvārds
    'pass' => 'b6G_TivVkjbXM8nT',        // SMTP parole
    'secure' => 'ssl',                    // SSL šifrēšana (ports 465)
  ],
  
  // Repository ceļš uz serveri (PHPMailer vendor mapes lokācijai)
  'repo_root' => '/home4/printstu/repositories/printstudio-website',
];
