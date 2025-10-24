# 🔴 reCAPTCHA problēmas risinājums

## Problēma

```
Uncaught Error: Invalid site key or not loaded in api.js
6LcA2OOrAAAAANbWMHQqlSOIDOtGIQtJjQRisbnA3
```

**Cēlonis:** reCAPTCHA v3 site key nav reģistrēts `printstudio.lv` domēnam.

---

## ⚡ ĀTRAIS RISINĀJUMS (testēšanai)

### Variants 1: Īslaicīgi bez reCAPTCHA (5 min)

Es esmu izveidojis īslaicīgu versiju BEZ reCAPTCHA pārbaudes:

**Fails:** `contact-no-recaptcha.php`

#### Upload uz serveri:

1. **cPanel File Manager**
2. **public_html**
3. **Upload:** `d:\PS WEB\project\public\contact-no-recaptcha.php`
4. **Rename:** `contact.php` → `contact-BACKUP.php`
5. **Rename:** `contact-no-recaptcha.php` → `contact.php`

#### Testē:

```
https://printstudio.lv
```

✅ **Tagad strādās bez reCAPTCHA!**

---

## 🔒 ILGTERMIŅA RISINĀJUMS

### Reģistrēt jaunus reCAPTCHA v3 atslēgas

1. **Atver:** https://www.google.com/recaptcha/admin/create

2. **Aizpildi:**
   - Label: `PrintStudio Website`
   - reCAPTCHA type: `reCAPTCHA v3`
   - Domains: `printstudio.lv`
   - Accept terms

3. **Saglabā atslēgas:**
   - **Site key:** (SĀKAS AR 6L...)
   - **Secret key:** (SĀKAS AR 6L...)

4. **Atjaunini kodu:**

#### ContactForm.tsx:

```typescript
const RECAPTCHA_SITE_KEY = 'JAUNAIS_SITE_KEY_ŠEIT'
```

#### contact.php:

```php
$recaptchaSecret = 'JAUNAIS_SECRET_KEY_ŠEIT';
```

5. **Rebuild & Deploy:**

```bash
npm run build
git add .
git commit -m "Update reCAPTCHA keys for printstudio.lv"
git push
```

6. **cPanel → Deploy** (Pull or Deploy HEAD Commit)

---

## 🎯 KO DARĪT TAGAD?

### Testēšanai (BEZ reCAPTCHA):

1. ✅ Upload `contact-no-recaptcha.php` uz serveri
2. ✅ Rename to `contact.php`
3. ✅ Testē formu
4. ✅ E-pasti strādās!

### Production (AR reCAPTCHA):

1. 📝 Reģistrē jaunas reCAPTCHA atslēgas
2. 🔧 Atjaunini kodu
3. 📦 Build & deploy
4. ✅ reCAPTCHA atkal strādās!

---

## ⚠️ DROŠĪBAS PIEZĪME

Bez reCAPTCHA:

- ✅ E-pasta forma strādās
- ✅ Honeypot field joprojām aizsargā
- ⚠️ Mazāka aizsardzība pret spam botiem

**Ieteikums:** Izmanto bez reCAPTCHA tikai testēšanai, pēc tam reģistrē jaunas atslēgas!

---

## 📞 Palīdzība

Ja vajag palīdzību ar reCAPTCHA reģistrāciju, pateic man!

---

**Status:** ⚡ Īslaicīgs risinājums izveidots - `contact-no-recaptcha.php`
