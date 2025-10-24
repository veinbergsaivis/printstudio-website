<?php
/**
 * 🧪 E-pasta konfigurācijas testa skripts
 * 
 * Augšupielādējiet šo failu uz serveri un atveriet pārlūkā:
 * https://printstudio.lv/test-email.php
 * 
 * ⚠️ DZĒSIET ŠO FAILU PĒC TESTĒŠANAS!
 */

// Drošības pārbaude - ierobežot piekļuvi
$allowed_ips = ['127.0.0.1', '::1']; // Pievienojiet savu IP
// if (!in_array($_SERVER['REMOTE_ADDR'], $allowed_ips)) {
//     die('Access denied');
// }

?>
<!DOCTYPE html>
<html lang="lv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-pasta konfigurācijas tests</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .success { color: #22c55e; }
        .error { color: #ef4444; }
        .warning { color: #f59e0b; }
        h1 { color: #1f2937; }
        h2 { color: #374151; font-size: 1.2em; margin-top: 0; }
        pre {
            background: #f9fafb;
            padding: 12px;
            border-radius: 4px;
            overflow-x: auto;
        }
        .status {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            font-weight: 600;
            font-size: 0.9em;
        }
        .status.ok { background: #dcfce7; color: #16a34a; }
        .status.fail { background: #fee2e2; color: #dc2626; }
        .status.warn { background: #fef3c7; color: #d97706; }
    </style>
</head>
<body>
    <h1>🧪 E-pasta konfigurācijas tests</h1>
    
    <?php
    $errors = [];
    $warnings = [];
    $info = [];
    
    // 1. PHP versija
    echo '<div class="card">';
    echo '<h2>PHP Versija</h2>';
    $php_version = phpversion();
    if (version_compare($php_version, '7.4.0', '>=')) {
        echo '<span class="status ok">OK</span> PHP ' . $php_version;
    } else {
        echo '<span class="status fail">FAIL</span> PHP ' . $php_version . ' (nepieciešama 7.4+)';
        $errors[] = 'PHP versija pārāk veca';
    }
    echo '</div>';
    
    // 2. contact.config.php
    echo '<div class="card">';
    echo '<h2>Konfigurācijas fails</h2>';
    $config_path = __DIR__ . '/contact.config.php';
    if (file_exists($config_path)) {
        echo '<span class="status ok">OK</span> contact.config.php atrasts<br>';
        $cfg = include $config_path;
        
        if (isset($cfg['smtp']['pass']) && $cfg['smtp']['pass'] === 'CHANGE_ME') {
            echo '<span class="status warn">WARN</span> Default parole joprojām lietota!';
            $warnings[] = 'Nomainiet SMTP paroli';
        }
        
        echo '<pre>';
        echo 'To: ' . ($cfg['to'] ?? 'nav iestatīts') . "\n";
        echo 'From: ' . ($cfg['from'] ?? 'nav iestatīts') . "\n";
        echo 'SMTP Enabled: ' . ($cfg['smtp']['enabled'] ? 'Yes' : 'No') . "\n";
        if ($cfg['smtp']['enabled']) {
            echo 'SMTP Host: ' . ($cfg['smtp']['host'] ?? 'nav iestatīts') . "\n";
            echo 'SMTP Port: ' . ($cfg['smtp']['port'] ?? 'nav iestatīts') . "\n";
            echo 'SMTP User: ' . ($cfg['smtp']['user'] ?? 'nav iestatīts') . "\n";
            echo 'SMTP Pass: ' . (isset($cfg['smtp']['pass']) ? '***' : 'nav iestatīts') . "\n";
        }
        echo '</pre>';
    } else {
        echo '<span class="status fail">FAIL</span> contact.config.php NAV atrasts';
        $errors[] = 'Izveidojiet contact.config.php failu';
        $cfg = null;
    }
    echo '</div>';
    
    // 3. PHPMailer
    echo '<div class="card">';
    echo '<h2>PHPMailer</h2>';
    $vendor_paths = [
        __DIR__ . '/../vendor/autoload.php',
        __DIR__ . '/../../vendor/autoload.php',
        '/home4/printstu/repositories/printstudio-website/vendor/autoload.php'
    ];
    
    $phpmailer_found = false;
    foreach ($vendor_paths as $vendor_path) {
        if (file_exists($vendor_path)) {
            echo '<span class="status ok">OK</span> PHPMailer atrasts: ' . $vendor_path;
            $phpmailer_found = true;
            break;
        }
    }
    
    if (!$phpmailer_found) {
        echo '<span class="status warn">WARN</span> PHPMailer nav atrasts<br>';
        echo '<small>SMTP un failu pielikumi nedarbosies. Instalējiet ar: composer install</small>';
        $warnings[] = 'PHPMailer nav instalēts';
    }
    echo '</div>';
    
    // 4. SMTP Connection Test
    if ($cfg && $cfg['smtp']['enabled'] && $phpmailer_found) {
        echo '<div class="card">';
        echo '<h2>SMTP Savienojuma tests</h2>';
        
        try {
            require_once $vendor_path;
            $mail = new PHPMailer\PHPMailer\PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = $cfg['smtp']['host'];
            $mail->SMTPAuth = true;
            $mail->Username = $cfg['smtp']['user'];
            $mail->Password = $cfg['smtp']['pass'];
            $mail->SMTPSecure = $cfg['smtp']['secure'];
            $mail->Port = $cfg['smtp']['port'];
            $mail->Timeout = 10;
            
            // Mēģinām savienoties
            if ($mail->smtpConnect()) {
                echo '<span class="status ok">OK</span> SMTP savienojums veiksmīgs!';
                $mail->smtpClose();
            } else {
                echo '<span class="status fail">FAIL</span> Nevar savienoties ar SMTP serveri';
                $errors[] = 'SMTP savienojums neizdevās';
            }
        } catch (Exception $e) {
            echo '<span class="status fail">FAIL</span> SMTP kļūda: ' . $e->getMessage();
            $errors[] = 'SMTP kļūda: ' . $e->getMessage();
        }
        echo '</div>';
    }
    
    // 5. Mail funkcija
    echo '<div class="card">';
    echo '<h2>PHP mail() funkcija</h2>';
    if (function_exists('mail')) {
        echo '<span class="status ok">OK</span> mail() funkcija pieejama';
    } else {
        echo '<span class="status fail">FAIL</span> mail() funkcija nav pieejama';
        $errors[] = 'PHP mail() funkcija nav pieejama';
    }
    echo '</div>';
    
    // 6. File permissions
    echo '<div class="card">';
    echo '<h2>Failu atļaujas</h2>';
    $contact_php = __DIR__ . '/contact.php';
    if (file_exists($contact_php)) {
        $perms = substr(sprintf('%o', fileperms($contact_php)), -3);
        if ($perms === '644' || $perms === '640') {
            echo '<span class="status ok">OK</span> contact.php atļaujas: ' . $perms;
        } else {
            echo '<span class="status warn">WARN</span> contact.php atļaujas: ' . $perms . ' (ieteicams: 644)';
            $warnings[] = 'Pielāgojiet failu atļaujas';
        }
    }
    echo '</div>';
    
    // Kopsavilkums
    echo '<div class="card">';
    echo '<h2>📊 Kopsavilkums</h2>';
    if (empty($errors)) {
        echo '<p class="success"><strong>✓ Viss kārtībā!</strong> E-pasta sistēma ir gatava testēšanai.</p>';
        echo '<p>Nākamais solis: Testējiet kontakta formu mājaslapā.</p>';
    } else {
        echo '<p class="error"><strong>✗ Atrastas ' . count($errors) . ' problēmas:</strong></p>';
        echo '<ul>';
        foreach ($errors as $error) {
            echo '<li class="error">' . $error . '</li>';
        }
        echo '</ul>';
    }
    
    if (!empty($warnings)) {
        echo '<p class="warning"><strong>⚠ Brīdinājumi:</strong></p>';
        echo '<ul>';
        foreach ($warnings as $warning) {
            echo '<li class="warning">' . $warning . '</li>';
        }
        echo '</ul>';
    }
    echo '</div>';
    ?>
    
    <div class="card">
        <h2>⚠️ SVARĪGI</h2>
        <p style="color: #dc2626;">
            <strong>Dzēsiet šo failu (test-email.php) pēc testēšanas!</strong><br>
            Tas satur sensitīvu informāciju un nevajadzētu būt publiski pieejamam.
        </p>
    </div>
    
    <div class="card">
        <h2>📚 Papildus resursi</h2>
        <ul>
            <li><a href="EMAIL_SETUP_GUIDE.md">E-pasta uzstādīšanas ceļvedis</a></li>
            <li><a href="CPANEL_DEPLOYMENT.md">cPanel deployment ceļvedis</a></li>
        </ul>
    </div>
</body>
</html>
