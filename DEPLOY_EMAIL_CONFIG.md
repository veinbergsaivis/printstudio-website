# 🚀 E-pasta konfigurācijas deployment instrukcijas

## ✅ Izveidoti faili

1. **contact.config.php** (SSL versija - ieteicams)
   - SMTP: printstudio.lv:465 (SSL)
   - Gatavs augšupielādei

2. **contact.config.TLS.php** (TLS alternatīva)
   - SMTP: printstudio.lv:587 (TLS)
   - Izmantot, ja SSL nestrādā

## 📤 Augšupielādes soļi

### Variants A: cPanel File Manager (VIEGLĀKAIS)

1. **Piesakies cPanel**
   - Ej uz: https://printstudio.lv:2083
   - Vai: https://cpanel.tavs-hostings.lv

2. **Atver File Manager**
   - cPanel → Files → File Manager

3. **Ej uz public_html**
   - Navigē uz: `/home4/printstu/public_html/`

4. **Upload failu**
   - Klikšķini **Upload** pogai
   - Izvēlies: `contact.config.php`
   - Gaidi, kamēr augšupielādējas

5. **Pārbaudi atļaujas**
   - Labo peles klikšķis uz `contact.config.php`
   - Permissions → `600` vai `640`
   - Save

✅ **GATAVS!**

---

### Variants B: FTP (FileZilla)

1. **Atver FileZilla**

2. **Savienojies ar serveri:**

   ```
   Host: ftp.printstudio.lv vai printstudio.lv
   Username: [tavs cPanel lietotājvārds]
   Password: [tavs cPanel parole]
   Port: 21
   ```

3. **Navigē uz public_html:**
   - Labajā pusē (remote): `/public_html/`

4. **Ielādē failu:**
   - Kreisajā pusē (local): atrodi `contact.config.php`
   - Ievelc to uz labo pusi

5. **Pārbaudi atļaujas:**
   - Labo peles klikšķis → File permissions → 600

✅ **GATAVS!**

---

### Variants C: SSH (Terminālis)

1. **Savienojies ar serveri:**

   ```bash
   ssh tavs-username@printstudio.lv
   ```

2. **Ej uz public_html:**

   ```bash
   cd /home4/printstu/public_html/
   ```

3. **Izveido failu un kopē saturu:**

   ```bash
   nano contact.config.php
   ```

   Iekopē visu saturu no lokālā faila, Ctrl+O (save), Ctrl+X (exit)

4. **Uzstādi atļaujas:**
   ```bash
   chmod 600 contact.config.php
   ```

✅ **GATAVS!**

---

## 🔧 PHPMailer instalācija

Pēc contact.config.php augšupielādes, **instalē PHPMailer:**

### SSH metodē:

```bash
cd /home4/printstu/repositories/printstudio-website
composer install --no-dev
```

### Vai manuāli:

1. Lejupielādē: https://github.com/PHPMailer/PHPMailer/archive/refs/tags/v6.9.1.zip
2. Iekopē `vendor/` mapi uz serveri

---

## 🧪 Testēšana

### 1. Automātiskais tests:

1. **Atver pārlūkā:**

   ```
   https://printstudio.lv/test-email.php
   ```

2. **Pārbaudi rezultātus:**
   - ✓ Visam jābūt zaļam
   - Ja SSL nestrādā → Izmanto TLS versiju

3. **Ja izmanto TLS versiju:**
   ```bash
   # Serverī:
   cd /home4/printstu/public_html/
   mv contact.config.php contact.config.SSL.backup
   cp contact.config.TLS.php contact.config.php
   ```

### 2. Manuālais tests:

1. **Atver mājaslapu:**

   ```
   https://printstudio.lv
   ```

2. **Aizpildi kontakta formu:**
   - Ieraksti savu info
   - Pēc izvēles pievieno failu
   - Nosūti

3. **Pārbaudi:**
   - ✅ Parādās "Paldies! Ziņojums nosūtīts."
   - ✅ E-pasts ierodas uz info@printstudio.lv
   - ✅ Faila pielikums ir pievienots (ja sūtīji)

---

## 🔒 DROŠĪBA

⚠️ **SVARĪGI - Pēc testēšanas:**

```bash
# Dzēs test-email.php!
rm /home4/printstu/public_html/test-email.php
```

Vai caur File Manager → Delete `test-email.php`

---

## ❌ Problēmu risināšana

### E-pasti nenāk

1. **Izmēģini TLS versiju** (ja izmanto SSL)
2. **Pārbaudi spam mapi** info@printstudio.lv
3. **cPanel → Track Delivery** - skat vai sūta
4. **Pārbaudi paroles** - vai pareizi iekopētas

### 500 Internal Server Error

1. Pārbaudi PHP versiju (vajag 7.4+)
2. Pārbaudi failu atļaujas (600 vai 640)
3. cPanel → Errors - skat error log

### SMTP Connection Failed

1. Izmēģini TLS versiju (587 ports)
2. Pārbaudi, vai serveris ļauj SMTP
3. Pārbaudi lietotājvārdu/paroli

---

## ✅ Checklist

- [ ] `contact.config.php` augšupielādēts uz `public_html/`
- [ ] Faila atļaujas uzstādītas (600)
- [ ] PHPMailer instalēts
- [ ] `test-email.php` testēts - viss zaļš
- [ ] `test-email.php` DZĒSTS
- [ ] Kontakta forma testēta mājaslapā
- [ ] E-pasts saņemts uz info@printstudio.lv

---

## 📞 Kontakts

Ja rodas problēmas, skat:

- **EMAIL_SETUP_GUIDE.md** - pilna dokumentācija
- **EMAIL_QUICK_REFERENCE.md** - ātrā palīdzība

---

**🎉 Veiksmi!**
