# 🚀 E-pasta uzstādīšana BEZ cPanel termināla

## ⚡ ĀTRAIS CEĻVEDIS (5 minūtes)

Ja tavā cPanel **NAV Terminal**, šeit ir vienkāršākie soļi:

---

## 📤 Solis 1: Upload contact.config.php

### cPanel File Manager:

1. **Piesakies cPanel**
   - https://printstudio.lv:2083

2. **File Manager**
   - cPanel → Files → File Manager

3. **Ej uz public_html**
   - Navigate to: `/home4/printstu/public_html/`

4. **Upload failu**
   - Klikšķini **Upload** (augšā)
   - Izvēlies: `d:\PS WEB\project\public\contact.config.php`
   - Gaidi, kamēr augšupielādējas (100%)

5. **Uzstādi atļaujas**
   - Atgriezies File Manager
   - Labo peles klikšķis uz `contact.config.php`
   - **Permissions** → ieraksti `600`
   - **Change Permissions**

✅ **GATAVS!**

---

## 🧪 Solis 2: Testē sistēmu

1. **Atver testēšanas rīku:**

   ```
   https://printstudio.lv/test-email.php
   ```

2. **Pārbaudi rezultātus:**

   **Ja redzēsi:**
   - ✅ PHP versija - zaļš
   - ✅ contact.config.php - zaļš
   - ⚠️ PHPMailer - dzeltens (nav instalēts)
   - ✅ PHP mail() funkcija - zaļš

   **Tas ir OK!** E-pasts strādās ar PHP mail() funkciju.

3. **Ja viss cits ir zaļš** → Turpini ar testēšanu!

---

## 📧 Solis 3: Testē kontakta formu

1. **Atver mājaslapu:**

   ```
   https://printstudio.lv
   ```

2. **Ej uz kontaktu sadaļu**

3. **Aizpildi formu:**
   - Vārds: Test
   - E-pasts: tavs@epasts.lv
   - Ziņa: Testa ziņa no kontakta formas
   - Fails: (atstāj tukšu pirmajam testam)

4. **Nosūti**

5. **Pārbaudi:**
   - ✅ Parādās "Paldies! Ziņojums nosūtīts."
   - ✅ Pārbaudi e-pastu uz `info@printstudio.lv`
   - ⚠️ Pārbaudi **spam mapi**, ja neredzēsi inbox!

---

## 🗑️ Solis 4: Dzēs testa failu

**SVARĪGI DROŠĪBAI:**

1. **cPanel File Manager**
2. **Ej uz public_html**
3. **Atrod `test-email.php`**
4. **Labo peles klikšķis → Delete**
5. **Confirm Delete**

✅ **GATAVS!**

---

## ✅ Ja viss darbojas

**Apsveicu! E-pasta sistēma strādā!** 🎉

- ✅ Klienti var sūtīt ziņas
- ✅ Tu saņemsi e-pastus uz info@printstudio.lv
- ✅ Spam aizsardzība aktīva

---

## ⚠️ Ja e-pasti NENĀK

### Problēma: E-pasts nesaņemts

**Pārbaudi:**

1. **Spam mapi** `info@printstudio.lv` - 90% gadījumu tur!
2. **cPanel → Email → Track Delivery**
   - Skaties, vai e-pasts tika nosūtīts
3. **Forma parāda kļūdu?**
   - F12 (Developer Console) - skaties kļūdu
   - cPanel → Errors - skaties PHP kļūdas

**Risinājums:**

1. **Ja nonāk spamā:**
   - Atzīmē kā "Not Spam"
   - Pēc 2-3 ziņām parasti sāk nākt inbox

2. **Ja vispār nesūta:**
   - Pārbaudi `contact.config.php` - vai pareizas paroles
   - Izmēģini TLS versiju (port 587)

---

## 🔄 Nomainīt uz TLS (ja nepieciešams)

### Ja SSL (port 465) nestrādā:

1. **cPanel File Manager**
2. **public_html**
3. **Rename:**
   - `contact.config.php` → `contact.config.SSL.backup`
4. **Upload jaunu failu:**
   - `d:\PS WEB\project\public\contact.config.TLS.php`
   - Rename to: `contact.config.php`
5. **Testē vēlreiz**

---

## 📦 Papildus: PHPMailer instalācija (neobligāti)

**PHPMailer uzlabo e-pasta piegādi un ļauj sūtīt failu pielikumus.**

### Ja vēlies instalēt BEZ termināla:

#### Opcija 1: Lokāli + FTP Upload

1. **Lokāli savā datorā (PowerShell):**

   ```powershell
   cd "d:\PS WEB\project"
   composer install --no-dev
   ```

2. **Izmantojot FileZilla (FTP):**
   - Connect to: ftp.printstudio.lv
   - Username: [cPanel username]
   - Password: [cPanel password]
   - Upload folder: `d:\PS WEB\project\vendor\`
   - To: `/home4/printstu/repositories/printstudio-website/vendor/`

#### Opcija 2: cPanel File Manager Upload

1. **Zip vendor mapi lokāli:**

   ```powershell
   Compress-Archive -Path "d:\PS WEB\project\vendor" -DestinationPath "d:\PS WEB\project\vendor.zip"
   ```

2. **cPanel File Manager:**
   - Upload `vendor.zip` uz `/home4/printstu/repositories/printstudio-website/`
   - Labo peles klikšķis uz `vendor.zip` → Extract
   - Dzēs `vendor.zip`

#### Opcija 3: Manuāla lejupielāde

1. **Lejupielādē:**
   - https://github.com/PHPMailer/PHPMailer/releases/latest
   - Download: `Source code (zip)`

2. **Izpako lokāli**

3. **Upload caur File Manager:**
   - Folder structure:
     ```
     /home4/printstu/repositories/printstudio-website/
       vendor/
         phpmailer/
           phpmailer/
             [visi PHPMailer faili]
     ```

---

## 🎯 Kopsavilkums

### Minimālie soļi e-pasta darbībai:

1. ✅ Upload `contact.config.php`
2. ✅ Uzstādi atļaujas (600)
3. ✅ Testē formu
4. ✅ Dzēs `test-email.php`

**E-pasts strādās ar PHP mail() funkciju (pietiekami labi!)**

### Papildus uzlabojumi (ja vēlies):

- 📦 Instalēt PHPMailer (labāka piegāde)
- 📎 Failu pielikumi (vajag PHPMailer)
- 🔄 SMTP optimizācija (vajag PHPMailer)

---

## 📞 Palīdzība

**Ja rodas problēmas:**

- **EMAIL_SETUP_GUIDE.md** - Pilnā dokumentācija
- **EMAIL_QUICK_REFERENCE.md** - Ātrā palīdzība
- **EMAIL_FINAL_INSTRUCTIONS.md** - Visas metodes

---

**🚀 VEIKSMI!**

Nav termināla? Nav problēmu! E-pasts strādās arī bez tā! 📧✅
