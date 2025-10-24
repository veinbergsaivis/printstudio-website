# 📧 E-pasta sistēmas arhitektūra

## 🔄 Kontakta formas darbības plūsma

```
┌─────────────────────────────────────────────────────────────────┐
│                         LIETOTĀJS                                │
│                    (printstudio.lv)                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 1. Aizpilda formu
                         │    - Vārds, e-pasts, ziņa
                         │    - Faila pievienošana (opt.)
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              React ContactForm Component                         │
│                  (ContactForm.tsx)                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ • Validācija (react-hook-form)                           │  │
│  │ • reCAPTCHA v3 token                                     │  │
│  │ • Honeypot (anti-spam)                                   │  │
│  │ • FormData ar failu                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 2. POST /contact.php
                         │    (FormData)
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   PHP Backend                                    │
│                  (contact.php)                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ VALIDĀCIJA SERVERĪ:                                      │  │
│  │ ✓ reCAPTCHA pārbaude (Google API)                       │  │
│  │ ✓ Honeypot pārbaude                                     │  │
│  │ ✓ E-pasta formāta pārbaude                              │  │
│  │ ✓ Faila izmēra/tipa pārbaude                            │  │
│  │ ✓ Obligāto lauku pārbaude                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                      │
│  ┌────────────────────────▼──────────────────────────────────┐  │
│  │ KONFIGURĀCIJA (contact.config.php):                      │  │
│  │ • to: info@printstudio.lv                                │  │
│  │ • from: no-reply@printstudio.lv                          │  │
│  │ • SMTP host, port, user, pass                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                      │
│  ┌────────────────────────▼──────────────────────────────────┐  │
│  │ E-PASTA SŪTĪŠANA:                                        │  │
│  │                                                           │  │
│  │ [SMTP enabled?] ──YES──> PHPMailer + SMTP               │  │
│  │        │                      │                           │  │
│  │       NO                      │                           │  │
│  │        │                      │                           │  │
│  │        └──> PHP mail()        │                           │  │
│  │                │              │                           │  │
│  │                └──────────────┘                           │  │
│  └──────────────────────┬────────────────────────────────────┘  │
└─────────────────────────┼────────────────────────────────────────┘
                          │
                          │ 3. Sūta e-pastu
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SMTP Serveris                                  │
│              (mail.printstudio.lv:587)                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Autentifikācija:                                         │  │
│  │ • User: no-reply@printstudio.lv                          │  │
│  │ • Pass: [no config]                                      │  │
│  │ • Secure: TLS                                            │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 4. Piegādā e-pastu
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   E-pasta saņemšana                              │
│                info@printstudio.lv                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Subject: New contact form message from [Vārds]           │  │
│  │ From: no-reply@printstudio.lv                            │  │
│  │ Reply-To: [lietotāja e-pasts]                            │  │
│  │                                                           │  │
│  │ Body:                                                     │  │
│  │ Name: [Vārds]                                            │  │
│  │ Email: [E-pasts]                                         │  │
│  │                                                           │  │
│  │ Message:                                                  │  │
│  │ [Ziņas teksts]                                           │  │
│  │                                                           │  │
│  │ Attachment: [fails] (ja pievienots)                      │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 🛡️ Drošības slāņi

```
┌──────────────────────────────────────────────────────────┐
│ 1. reCAPTCHA v3                                          │
│    └─> Novērš automātiskus botus (score < 0.5 = reject) │
├──────────────────────────────────────────────────────────┤
│ 2. Honeypot lauks                                        │
│    └─> Slēpts lauks, ko boti aizpilda (reject if filled)│
├──────────────────────────────────────────────────────────┤
│ 3. Klienta validācija (React)                            │
│    └─> E-pasta formāts, obligātie lauki, min garums     │
├──────────────────────────────────────────────────────────┤
│ 4. Servera validācija (PHP)                              │
│    └─> Atkārtota validācija, failu pārbaude             │
├──────────────────────────────────────────────────────────┤
│ 5. Failu ierobežojumi                                    │
│    └─> Max 10MB, tikai PDF/JPG/PNG/DOC                  │
├──────────────────────────────────────────────────────────┤
│ 6. SMTP autentifikācija                                  │
│    └─> Tikai autorizēti lietotāji var sūtīt             │
└──────────────────────────────────────────────────────────┘
```

## 📁 Failu struktūra

```
project/
├── src/components/
│   ├── ContactForm.tsx          ← React forma
│   └── ReCaptchaV3.tsx          ← reCAPTCHA komponente
│
├── public/
│   ├── contact.php              ← PHP backend (GALVENAIS)
│   ├── contact.config.php       ← Konfigurācija (GIT IGNORED)
│   ├── contact.config.example.php ← Template
│   └── test-email.php           ← Testēšanas skripts
│
├── vendor/                      ← Composer dependencies
│   └── phpmailer/phpmailer/     ← E-pasta bibliotēka
│
├── composer.json                ← PHP dependencies
└── EMAIL_SETUP_GUIDE.md         ← Šī dokumentācija
```

## 🔧 Konfigurācijas fails

```php
<?php
// contact.config.php (uz servera)
return [
  'to' => 'info@printstudio.lv',      // KAM sūta
  'from' => 'no-reply@printstudio.lv', // NO kā sūta

  'smtp' => [
    'enabled' => true,                 // Lietot SMTP?
    'host' => 'mail.printstudio.lv',   // SMTP serveris
    'port' => 587,                     // SMTP ports (TLS)
    'user' => 'no-reply@printstudio.lv', // Lietotājs
    'pass' => '***************',       // Parole (SECRET!)
    'secure' => 'tls',                 // Šifrēšana
  ],

  'repo_root' => '/home4/printstu/repositories/printstudio-website',
];
```

## ⚙️ SMTP vs PHP mail()

```
┌─────────────────────────────────────────────────────────────┐
│                    SMTP (PHPMailer)                         │
│                    [IETEICAMS]                              │
├─────────────────────────────────────────────────────────────┤
│ ✅ Laba piegādes likme                                      │
│ ✅ Mazāk nonāk spamā                                        │
│ ✅ Autentifikācija                                          │
│ ✅ TLS/SSL šifrēšana                                        │
│ ✅ Failu pielikumi strādā labāk                             │
│ ✅ Kļūdu ziņojumi detalizētāki                              │
│                                                              │
│ ⚠️  Nepieciešams PHPMailer                                  │
│ ⚠️  Nepieciešami SMTP iestatījumi                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    PHP mail()                               │
│                    [Fallback]                               │
├─────────────────────────────────────────────────────────────┤
│ ✅ Vienkārši lietot                                         │
│ ✅ Nav papildus dependencies                                │
│ ✅ Strādā uz visiem serveriem                               │
│                                                              │
│ ❌ Bieži nonāk spamā                                        │
│ ❌ Failu pielikumi var nestrādāt                            │
│ ❌ Nav autentifikācijas                                     │
│ ❌ Sliktāka piegādes likme                                  │
└─────────────────────────────────────────────────────────────┘
```

## 🧪 Testēšanas process

```
1. LOCAL DEVELOPMENT
   └─> npm run dev
       └─> Test forma localhost:5173
           └─> contact.php uz servera vai mock

2. TEST-EMAIL.PHP uz servera
   └─> Augšupielādēt test-email.php
       └─> Atvērt pārlūkā
           ├─> ✓ PHP versija
           ├─> ✓ contact.config.php
           ├─> ✓ PHPMailer
           ├─> ✓ SMTP connection
           └─> ✓ File permissions

3. PRODUCTION TEST
   └─> Atvērt https://printstudio.lv
       └─> Aizpildīt kontakta formu
           └─> Nosūtīt
               ├─> Pārbaudīt success message
               ├─> Pārbaudīt e-pastu info@
               └─> Pārbaudīt faila pielikumu

4. DZĒST TEST-EMAIL.PHP!
```

## 🚨 Kļūdu apstrāde

```
Frontend (React)
    │
    ├─> Validācijas kļūda
    │   └─> Parāda error message pie input
    │
    ├─> Network kļūda
    │   └─> "Radās kļūda. Lūdzu, mēģiniet vēlreiz."
    │
    └─> Server response error
        └─> Parāda server error message

Backend (PHP)
    │
    ├─> reCAPTCHA fail (score < 0.5)
    │   └─> 400: "reCAPTCHA pārbaude neizdevās"
    │
    ├─> Honeypot filled
    │   └─> 200 (silent accept - nesaka botam)
    │
    ├─> Validation fail
    │   └─> 400: "Trūkst obligātu lauku" / "Nederīgs e-pasts"
    │
    ├─> File too large/wrong type
    │   └─> 400: "Fails ir pārāk liels" / "Faila tips nav atļauts"
    │
    ├─> SMTP fail
    │   └─> Try PHP mail() as fallback
    │
    └─> Complete fail
        └─> 500: "Failed to send email"
```

## 📊 Veiktspējas metrika

```
Tipiska pieprasījuma plūsma:
┌──────────────────────────┬──────────┐
│ React form validation    │  ~50ms   │
├──────────────────────────┼──────────┤
│ reCAPTCHA v3 token       │  ~200ms  │
├──────────────────────────┼──────────┤
│ POST to contact.php      │  ~100ms  │
├──────────────────────────┼──────────┤
│ Server-side validation   │  ~50ms   │
├──────────────────────────┼──────────┤
│ reCAPTCHA verify         │  ~300ms  │
├──────────────────────────┼──────────┤
│ SMTP connection          │  ~500ms  │
├──────────────────────────┼──────────┤
│ Email sending            │  ~200ms  │
├──────────────────────────┼──────────┤
│ Response to client       │  ~50ms   │
├──────────────────────────┼──────────┤
│ KOPĀ:                    │  ~1.5s   │
└──────────────────────────┴──────────┘
```

---

**Piezīme:** Šī diagramma ilustrē pilnu e-pasta sistēmas darbības plūsmu.  
Detalizēta uzstādīšanas instrukcija: **EMAIL_SETUP_GUIDE.md**
