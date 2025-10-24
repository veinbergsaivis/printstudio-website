# 📧 E-pasta uzstādīšanas ceļvedis

## ✅ Kas jau ir gatavs

- ✅ Kontakta forma ar validāciju (`src/components/ContactForm.tsx`)
- ✅ PHP e-pasta apstrādātājs (`public/contact.php`)
- ✅ reCAPTCHA v3 aizsardzība pret botiem
- ✅ Failu augšupielādes atbalsts (līdz 10MB)
- ✅ PHPMailer SMTP atbalsts

## 🔧 Serverī veicamie soļi

### 1. Izveidot e-pasta kontus cPanel

Piesakieties cPanel un izveidojiet šādus e-pasta kontus:

1. **info@printstudio.lv** - saņem kontakta formas ziņas
2. **no-reply@printstudio.lv** - sūta kontakta formas ziņas

**Kā izveidot:**

- cPanel → Email Accounts
- Create → Aizpildiet formu
- Saglabājiet paroles drošā vietā

### 2. Konfigurēt contact.config.php uz servera

1. **SSH vai File Manager:** Ejiet uz `/home4/printstu/public_html/`

2. **Kopējiet example failu:**

   ```bash
   cp contact.config.example.php contact.config.php
   ```

3. **Rediģējiet contact.config.php:**
   ```php
   <?php
   return [
     'to' => 'info@printstudio.lv',           // E-pasts, kurā saņemsiet ziņas
     'from' => 'no-reply@printstudio.lv',     // E-pasts, no kura sūtīs forma
     'smtp' => [
       'enabled' => true,                      // Ieslēgt SMTP
       'host' => 'mail.printstudio.lv',       // cPanel SMTP serveris
       'port' => 587,                          // Port (587 = TLS, 465 = SSL)
       'user' => 'no-reply@printstudio.lv',   // SMTP lietotājvārds
       'pass' => 'JŪSU_PAROLE_ŠEIT',          // SMTP parole
       'secure' => 'tls',                      // 'tls' vai 'ssl'
     ],
     'repo_root' => '/home4/printstu/repositories/printstudio-website',
   ];
   ```

### 3. SMTP iestatījumi cPanel

Lai iegūtu pareizos SMTP iestatījumus:

1. **cPanel → Email Accounts**
2. **Connect Devices** blakus jūsu e-pastam
3. **Manual Settings** → skatiet:
   - **SMTP Server:** parasti `mail.jūsudomēns.lv` vai `server-hostname`
   - **SMTP Port:** 587 (TLS) vai 465 (SSL)
   - **Username:** pilns e-pasts (no-reply@printstudio.lv)
   - **Password:** e-pasta parole

### 4. Instalēt PHPMailer uz servera

PHPMailer ir nepieciešams SMTP un failu pielikumiem.

**SSH metodē:**

```bash
cd ~/repositories/printstudio-website
composer install --no-dev
```

**Vai manuāli:**

1. Lejupielādējiet PHPMailer: https://github.com/PHPMailer/PHPMailer/releases
2. Iekopējiet `vendor` mapi uz serveri

### 5. Pārbaudīt failu atļaujas

```bash
chmod 644 contact.php
chmod 600 contact.config.php  # Tikai lasāms serverim
```

## 🧪 Testēšana

### Lokāli testēt (bez SMTP)

1. Ja izmantojat lokālo serveri (XAMPP/WAMP):

   ```bash
   # contact.config.php
   'smtp' => [
     'enabled' => false,  // Izmanto PHP mail()
   ]
   ```

2. Atvērt formu un nosūtīt testa ziņu

### Serverī testēt

1. Atvērt mājas lapu: https://printstudio.lv
2. Ejiet uz kontaktu sadaļu
3. Aizpildiet formu un nosūtiet
4. **Pārbaudiet:**
   - ✅ Forma parāda "Paldies! Ziņojums nosūtīts."
   - ✅ E-pasts ierodas uz info@printstudio.lv
   - ✅ Faili tiek pievienoti (ja augšupielādēti)

## 🔍 Problēmu risināšana

### E-pasti nenāk

1. **Pārbaudiet SMTP iestatījumus** `contact.config.php`
2. **cPanel mail log:**
   - cPanel → Track Delivery
   - Skatiet, vai e-pasts tiek sūtīts

3. **PHP kļūdu log:**
   - cPanel → Errors
   - Skatiet PHP kļūdas

4. **Spam mape:**
   - Pārbaudiet spam/junk mapē

### 500 Internal Server Error

1. Pārbaudiet PHP versiju (jābūt 7.4+)
2. Pārbaudiet failu atļaujas
3. Skatiet error log

### "Failed to send email"

1. SMTP enabled = true?
2. Paroles pareizas?
3. PHPMailer instalēts?

## 📋 Checklist

- [ ] Izveidoti e-pasta konti: info@ un no-reply@
- [ ] `contact.config.php` izveidots uz servera
- [ ] SMTP iestatījumi konfigurēti
- [ ] PHPMailer instalēts
- [ ] Failu atļaujas uzstādītas
- [ ] Testēts un e-pasti nāk

## 🔐 Drošība

- ✅ `contact.config.php` ir `.gitignore` - paroles netiek commitotas
- ✅ reCAPTCHA v3 novērš spam
- ✅ Honeypot lauks papildus aizsardzībai
- ✅ Validācija serverī un klientā
- ✅ Failu tipu un izmēra ierobežojumi

## 📞 Atbalsts

Ja rodas problēmas:

1. Pārbaudiet šo ceļvedi vēlreiz
2. Skatiet cPanel error logs
3. Testējiet ar `'smtp' => ['enabled' => false]` vispirms

---

**Piezīme:** Aizsargājiet `contact.config.php` paroles! Nekad necommitojiet šo failu Git!
