# 📧 E-pasta uzstādīšana - Ātrā atsauce

## 🎯 Serverī veicamie soļi (5 minūtes)

### 1️⃣ Izveidot e-pasta kontus

```
cPanel → Email Accounts → Create
- info@printstudio.lv (saņem ziņas)
- no-reply@printstudio.lv (sūta ziņas)
```

### 2️⃣ Iegūt SMTP iestatījumus

```
cPanel → Email Accounts → Connect Devices → Manual Settings
Saglabājiet:
- SMTP Server: mail.printstudio.lv
- SMTP Port: 587
- Username: no-reply@printstudio.lv
- Password: [jūsu parole]
```

### 3️⃣ Izveidot contact.config.php

```bash
cd /home4/printstu/public_html/
cp contact.config.example.php contact.config.php
nano contact.config.php
```

Rediģēt:

```php
<?php
return [
  'to' => 'info@printstudio.lv',
  'from' => 'no-reply@printstudio.lv',
  'smtp' => [
    'enabled' => true,
    'host' => 'mail.printstudio.lv',
    'port' => 587,
    'user' => 'no-reply@printstudio.lv',
    'pass' => 'JŪSU_REĀLĀ_PAROLE',
    'secure' => 'tls',
  ],
  'repo_root' => '/home4/printstu/repositories/printstudio-website',
];
```

Saglabāt: `Ctrl+O`, `Enter`, `Ctrl+X`

### 4️⃣ Instalēt PHPMailer

```bash
cd /home4/printstu/repositories/printstudio-website
composer install --no-dev
```

### 5️⃣ Testēt

```
1. Augšupielādējiet test-email.php uz public_html/
2. Atveriet: https://printstudio.lv/test-email.php
3. Pārbaudiet, vai viss ir zaļš ✓
4. DZĒSIET test-email.php!
```

## ✅ Pārbaudes checklist

- [ ] E-pasta konti izveidoti
- [ ] SMTP iestatījumi iegūti
- [ ] contact.config.php izveidots un rediģēts
- [ ] PHPMailer instalēts
- [ ] test-email.php parāda visu zaļu
- [ ] test-email.php DZĒSTS
- [ ] Kontakta forma testēta mājaslapā
- [ ] E-pasts saņemts uz info@printstudio.lv

## 🆘 Problēmu risināšana

| Problēma       | Risinājums                                       |
| -------------- | ------------------------------------------------ |
| 500 Error      | Pārbaudiet PHP versiju (7.4+), failu atļaujas    |
| E-pasts nenāk  | Skatiet cPanel → Track Delivery, pārbaudiet spam |
| SMTP kļūda     | Pārbaudiet SMTP paroli un serveri                |
| Failed to send | PHPMailer instalēts? `composer install`          |

## 📞 Palīdzība

Pilna dokumentācija: `EMAIL_SETUP_GUIDE.md`

---

Print Studio © 2025
