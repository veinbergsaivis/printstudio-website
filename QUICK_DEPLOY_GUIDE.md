# 🚀 cPanel Deployment - Ātrā Pamācība

## ✅ Viss ir gatavs!

Projekts ir sagatavots deployment uz cPanel. Visi vajadzīgie faili ir GitHub:
- **Repository:** https://github.com/veinbergsaivis/printstudio-website
- **Production build:** `dist/` mape jau ir sagatavojta

---

## 📋 cPanel Deployment Soļi

### 1. Piesakies cPanel kontā

Ej uz savu hosting cPanel (parasti: `https://tavs-domens.lv:2083` vai `https://cpanel.tavs-hosting.lv`)

### 2. Atver Git Version Control

- Meklē "**Git Version Control**" vai "**Git™ Version Control**" cPanel
- Ja neredzams, jautā hosting support, vai ir pieejams

### 3. Izveido Git Repository

Klikšķini **"Create"** un aizpildi:

```
Clone URL: https://github.com/veinbergsaivis/printstudio-website.git
Repository Path: /home/[TAVS_USERNAME]/repositories/printstudio-website
Repository Name: printstudio-website
```

⚠️ **Svarīgi:** Nomainiet `[TAVS_USERNAME]` ar savu cPanel lietotājvārdu!

### 4. Pielāgo .cpanel.yml failu

**Vai nu:**

**A) Caur GitHub (ieteicams):**
1. Ej uz: https://github.com/veinbergsaivis/printstudio-website/blob/master/.cpanel.yml
2. Klikšķini uz pencil ikonas (Edit)
3. Nomainiet `username` ar savu cPanel lietotājvārdu:
   ```yaml
   ---
   deployment:
     tasks:
       - export DEPLOYPATH=/home/TAVS_USERNAME/public_html/
       - /bin/cp -R dist/* $DEPLOYPATH
   ```
4. Commit changes

**Vai B) Caur cPanel File Manager:**
1. Ej uz repositories/printstudio-website
2. Atver `.cpanel.yml`
3. Nomainiet `username`
4. Saglabāt

### 5. Deploy mājas lapu

1. Atpakaļ uz **Git Version Control**
2. Atrodi savu repository listē
3. Klikšķini **"Manage"**
4. Klikšķini **"Pull or Deploy HEAD Commit"**

✅ **Gatavs!** Mājas lapa tagad ir pieejama: `http://tavs-domens.lv`

---

## 🔄 Kā Atjaunināt Mājas Lapu

Kad veici izmaiņas lokāli:

```bash
# 1. Veido izmaiņas
git add .
git commit -m "Tavs apraksts"

# 2. Build jauno versiju
npm run build

# 3. Pievieno build failus
git add dist -f
git commit -m "Update build" --no-verify

# 4. Push uz GitHub
git push origin master
```

Pēc tam **cPanel**:
1. Git Version Control → Manage → **Pull or Deploy HEAD Commit**

---

## 🎯 Alternatīva: Manuāla Upload

Ja Git Version Control nav pieejams:

### 1. Upload caur FTP/SFTP (FileZilla):

```
Host: tavs-domens.lv vai ftp.tavs-domens.lv
Username: [cPanel lietotājvārds]
Password: [cPanel parole]
Port: 21 (FTP) vai 22 (SFTP)
```

### 2. Upload failus:
- Ielādē **VISU** no `dist/` mapes
- Uz `public_html/` direktoriju
- Pārraksti esošos failus

### 3. Pārbaudi atļaujas:
- Māpes: 755
- Faili: 644

---

## ⚙️ .htaccess Pārbaude

Pārliecinies, ka `public_html/.htaccess` satur:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Don't rewrite files or directories
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  
  # Rewrite everything else to index.html
  RewriteRule ^ index.html [L]
</IfModule>
```

☝️ Šis ir kritisks SPA (Single Page Application) darbībai!

---

## 🐛 Problēmu Risināšana

### "Blank page" vai "404 Not Found"

**Pārbaudi:**
1. Vai `.htaccess` fails ir `public_html/`?
2. Browser console (F12) - vai ir kļūdas?
3. cPanel Error Log

**Risinājums:**
- Pārbaudi `.htaccess` saturu
- Pārbaudi, vai visi faili ir augšupielādēti
- Pārbaudi failu atļaujas (755/644)

### "Permission denied"

**Risinājums:**
```bash
# cPanel SSH (ja pieejams):
cd ~/public_html
chmod 644 *.* 
chmod 755 */
```

Vai caur cPanel File Manager → Select All → Permissions

### "CSS/JS not loading"

**Pārbaudi:**
1. Browser console (F12)
2. Vai ceļi ir relatīvi (`/assets/...`)?
3. Vai `.htaccess` ir pareizs?

**Risinājums:**
- Clear browser cache (Ctrl+Shift+Del)
- Pārbaudi `index.html` - vai ceļi ir pareizi?

### Git pull nestrādā

**Risinājums:**
1. cPanel → Git Version Control → Manage
2. Pārbaudi, vai repository URL ir pareizs
3. Mēģini "Update" → Pull

---

## 📞 Nepieciešama Palīdzība?

1. **cPanel dokumentācija:** https://docs.cpanel.net/
2. **Hosting support:** Sazinieties ar savu hosting provider
3. **GitHub Issues:** https://github.com/veinbergsaivis/printstudio-website/issues

---

## 🎉 Pēc Veiksmīga Deployment

✅ **Pārbaudi:**
- [ ] Mājas lapa ielādējas: `http://tavs-domens.lv`
- [ ] Visi attēli redzami
- [ ] Navigācija strādā (About, Services, utt.)
- [ ] Valodu maiņa strādā (LV ⇄ EN)
- [ ] Kontakta forma strādā
- [ ] Mobile versija izskatās labi
- [ ] Browser console (F12) - nav kļūdu

✅ **Google Analytics:**
- Pārbaudi, vai GTM Tag strādā (Google Tag Manager)
- Skat realtime visitors Google Analytics

✅ **SEO:**
- Pārbaudi `robots.txt`: `http://tavs-domens.lv/robots.txt`
- Pārbaudi `sitemap.xml`: `http://tavs-domens.lv/sitemap.xml`
- Reģistrē vietni Google Search Console

---

**🚀 Veiksmīgu launchu!**
