# cPanel Deployment Setup Guide

## 📋 Priekšnosacījumi

- cPanel konts ar Git Version Control
- SSH piekļuve (ieteicams)
- Node.js 18+ uz servera (ja nepieciešams build serverī)

## 🚀 Automātiska Deploy no GitHub uz cPanel

### 1. solis: cPanel Git Version Control iestatīšana

1. **Piesakies cPanel**
2. **Atver "Git Version Control"**
3. **Klikšķini "Create"**
4. **Aizpildi formu:**
   - **Clone URL:** `https://github.com/veinbergsaivis/printstudio-website.git`
   - **Repository Path:** `/home/username/repositories/printstudio-website`
   - **Repository Name:** `printstudio-website`

### 2. solis: Deploy konfigurācija

`.cpanel.yml` fails jau ir izveidots repozitorijā. Tas automātiski:

- Kopē `dist` mapes saturu uz `public_html`
- Izpildās katru reizi, kad izdara "Pull or Deploy HEAD Commit" cPanel

### 3. solis: Build process

#### Opcija A: Build lokāli (IETEICAMS)

```bash
# Lokālajā datorā
npm run build

# Commit un push dist mapi
git add dist -f
git commit -m "Add production build"
git push origin master
```

#### Opcija B: Build uz servera (ja ir Node.js)

1. SSH uz serveri
2. Ej uz repo direktoriju:
   ```bash
   cd ~/repositories/printstudio-website
   ```
3. Palaist build:
   ```bash
   npm ci
   npm run build
   ```

### 4. solis: Deploy uz cPanel

1. **Atver "Git Version Control"** cPanel
2. **Atrodi savu repository**
3. **Klikšķini "Manage"**
4. **Klikšķini "Pull or Deploy HEAD Commit"**
5. **cPanel automātiski:**
   - Velk jaunāko kodu no GitHub
   - Izpilda `.cpanel.yml` komandas
   - Kopē failus uz `public_html`

## 📝 Atjaunināt projektu (workflow)

Kad veic izmaiņas:

```bash
# 1. Lokālajā datorā
git add .
git commit -m "Tavs apraksts"
git push origin master

# 2. Build production
npm run build

# 3. Commit build failus (ja build lokāli)
git add dist -f
git commit -m "Update build"
git push origin master

# 4. cPanel
# Ej uz Git Version Control → Manage → Pull or Deploy HEAD Commit
```

## 🔧 .cpanel.yml faila pielāgošana

Rediģē `.cpanel.yml` un nomainit `username` ar savu cPanel lietotājvārdu:

```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/TAVS_USERNAME/public_html/
    - /bin/cp -R dist/* $DEPLOYPATH
```

## 🎯 Alternatīva: FTP Upload

Ja Git Version Control nestrādā:

1. **Build lokāli:**

   ```bash
   npm run build
   ```

2. **Upload caur FileZilla vai cPanel File Manager:**
   - Upload visu no `dist/` mapes
   - Uz `public_html/` direktoriju

## 🌐 .htaccess fails (SPA routing)

Izveidot `.htaccess` failā `public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

## ✅ Pārbaude

Pēc deployment:

1. Atvērt mājas lapu: `http://tavs-domens.lv`
2. Pārbaudīt, vai viss ielādējas
3. Pārbaudīt console (F12) vai nav kļūdu

## 🐛 Problēmu risināšana

### "dist mape nav atrasta"

- Pārliecinies, ka esi palaidis `npm run build`
- Pārbaudi, vai `dist` mape eksistē

### "Permission denied"

- Pārbaudi failu atļaujas cPanel
- Māpes: 755, Faili: 644

### "Blank page"

- Pārbaudi browser console (F12)
- Pārbaudi, vai `.htaccess` ir pareizs
- Pārbaudi, vai ceļi failiem ir relatīvi, nevis absolūti

## 📞 Palīdzība

Ja rodas problēmas, pārbaudi:

1. cPanel Error Log
2. Browser Console (F12)
3. Git Version Control log cPanel
