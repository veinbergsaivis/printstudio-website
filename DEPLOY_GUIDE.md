# 🚀 PRINTSTUDIO DEPLOY GUIDE

Quick guide to deploy your website to printstudio.lv

---

## ⚡ QUICK DEPLOY (Manual - Recommended)

### Step 1: Build
```powershell
npm run build
```

### Step 2: Upload via cPanel File Manager

1. **Login to cPanel**
   - URL: https://your-cpanel-url.com
   - Username: Your cPanel username
   - Password: Your cPanel password

2. **Open File Manager**
   - Find "File Manager" icon
   - Click to open

3. **Navigate to public_html**
   - Click `public_html` folder in left sidebar

4. **Upload Files**
   - Click "Upload" button (top right)
   - Drag ALL files from `D:\PS WEB\project\dist\` folder
   - OR click "Select File" and choose multiple files
   - Wait for upload to complete

5. **Verify**
   - Visit https://printstudio.lv
   - Press Ctrl+F5 to clear cache
   - Check that changes are visible

---

## 🤖 AUTOMATED DEPLOY (FTP)

### Prerequisites

1. **Install WinSCP**
   - Download: https://winscp.net/eng/download.php
   - Install with default settings

2. **Get FTP Credentials**
   - Login to cPanel
   - Go to "FTP Accounts"
   - Create new FTP account or use existing
   - Note: Username, Password, FTP Host

### Configure Script

Edit `deploy-ftp.ps1`:
```powershell
$ftpHost = "ftp.printstudio.lv"  # Your FTP host
$ftpUser = "your-ftp-username"    # Your FTP username
$ftpPass = "your-ftp-password"    # Your FTP password
```

### Run Deploy

```powershell
.\deploy-ftp.ps1
```

Script will:
1. Build your project (`npm run build`)
2. Connect to FTP server
3. Upload all files from `dist/` to `/public_html/`
4. Show success message

---

## 📋 FILES TO UPLOAD

Always upload these from `dist/` folder:

```
dist/
├── index.html              ⭐ CRITICAL
├── .htaccess              ⭐ CRITICAL (for routing)
├── assets/                 ⭐ CRITICAL (JS, CSS)
├── contact.php            ⭐ CRITICAL (contact form)
├── favicon.ico            ✅ Important
├── favicon.svg            ✅ Important
├── apple-touch-icon.png   ✅ Important
├── icon-192.png           ✅ Important
├── icon-512.png           ✅ Important
├── robots.txt             ✅ SEO
├── sitemap.xml            ✅ SEO
├── site.webmanifest       ✅ PWA
└── fonts/                 ✅ Fonts
```

---

## 🔍 VERIFY DEPLOYMENT

After upload, check:

1. **Homepage**
   - https://printstudio.lv
   - Should load correctly

2. **Navigation**
   - https://printstudio.lv/pricing
   - https://printstudio.lv/file-guidelines
   - https://printstudio.lv/blog

3. **Contact Form**
   - Try sending a test message
   - Check if email arrives

4. **Clear Browser Cache**
   - Press Ctrl+F5 (Windows)
   - Or Cmd+Shift+R (Mac)

---

## ⚠️ TROUBLESHOOTING

### "404 Not Found" on /pricing
- **Problem:** `.htaccess` not uploaded
- **Solution:** Upload `dist/.htaccess` to `/public_html/.htaccess`

### Contact form doesn't work
- **Problem:** `contact.php` not uploaded or wrong config
- **Solution:** Upload `dist/contact.php` to `/public_html/contact.php`

### Old version still showing
- **Problem:** Browser cache
- **Solution:** Press Ctrl+F5 to hard refresh

### Styling broken
- **Problem:** CSS files not uploaded
- **Solution:** Upload entire `dist/assets/` folder

---

## 📝 DEPLOYMENT CHECKLIST

Before deploy:
- [ ] Run `npm run build`
- [ ] Check build completed successfully
- [ ] Test locally if possible

After deploy:
- [ ] Visit https://printstudio.lv
- [ ] Test all navigation links
- [ ] Test contact form
- [ ] Check on mobile device
- [ ] Clear cache and re-test

---

## 🔄 REGULAR UPDATES

When you make changes:

1. Edit files in `src/`
2. Run `npm run build`
3. Upload `dist/` contents
4. Test on live site

**Quick command:**
```powershell
npm run build ; .\deploy-ftp.ps1
```

---

## 📞 NEED HELP?

If deployment fails:
1. Check cPanel credentials
2. Check FTP settings
3. Check server disk space
4. Contact hosting support

---

**Last Updated:** 2025-11-05
