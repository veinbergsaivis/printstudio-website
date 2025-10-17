# 🔐 Password Protection - Instrukcijas

## ✅ Ko esmu pievienojis:

### 1. **Noklusējuma valoda: Latviešu (LV)**
   - Failā: `src/i18n/index.ts`
   - Lapa tagad vienmēr sākas ar LV valodu

### 2. **Password Protection Gate**
   - Failā: `src/components/PasswordGate.tsx`
   - Parādās pirms mājas lapas ielādes
   - Parole tiek saglabāta session (līdz browser aizver)

---

## 🔑 **PAROLE**

### **Noklusējuma parole:**
```
printstudio2025
```

### **Kā mainīt paroli:**

Rediģēt failu: `src/components/PasswordGate.tsx`

```typescript
const CORRECT_PASSWORD = 'printstudio2025' // <-- Mainiet šeit!
```

Piemēri:
- `'TavsVards123'`
- `'test2025'`
- `'ManaParole!@#'`

⚠️ **Pēc paroles maiņas:**
```bash
npm run build
git add .
git commit -m "Update password"
git add dist -f
git commit -m "Update build" --no-verify
git push origin master
```

---

## 🚀 **Kā atslēgt Password Protection**

Kad mājas lapa ir gatava publiskai pieejamībai:

### **Metode 1: Izņemt PasswordGate no App.tsx**

Rediģēt `src/App.tsx`:

**PIRMS (ar paroli):**
```tsx
<PasswordGate>
  <div className='flex min-h-screen...'>
    ...
  </div>
</PasswordGate>
```

**PĒC (bez paroles):**
```tsx
<div className='flex min-h-screen...'>
  ...
</div>
```

Izdzēst arī import:
```tsx
import PasswordGate from './components/PasswordGate' // <-- Izdzēst
```

### **Metode 2: Vides mainīgais (advanced)**

Var pievienot `.env` failu:
```
VITE_PASSWORD_PROTECTED=true
```

Un `PasswordGate.tsx`:
```tsx
if (import.meta.env.VITE_PASSWORD_PROTECTED !== 'true') {
  return <>{children}</>
}
```

---

## 🎨 **Pielāgošana**

### **Mainīt tekstu:**

Rediģēt `src/components/PasswordGate.tsx`:

```tsx
<h1 className="text-3xl font-bold...">
  Lapa Testēšanā  {/* <-- Mainiet */}
</h1>
<p className="text-center text-gray-600...">
  Ievadiet paroli, lai turpinātu  {/* <-- Mainiet */}
</p>
```

### **Mainīt dizainu/krāsas:**

Tailwind klases failā `PasswordGate.tsx`:
- `bg-primary-600` - pogas krāsa
- `from-primary-50 to-secondary-50` - gradient fons
- `shadow-2xl` - ēna

---

## 🔐 **Drošība**

⚠️ **SVARĪGI:**

1. **Šī nav profesionāla drošības sistēma!**
   - Parole ir visible source code (frontend)
   - Piemērots tikai **testēšanas laikam**
   - **NE** sensitīvai informācijai

2. **Kad mājas lapa gatava:**
   - **IZŅEMT** PasswordGate
   - Vai izmantot cPanel **Password Protected Directories**

### **Profesionāla drošība (cPanel):**

1. cPanel → **Directory Privacy**
2. Izvēlies `public_html`
3. "Password protect this directory"
4. Izveido username/password
5. **Serverside** aizsardzība (drošāk)

---

## 📱 **Kā strādā:**

1. Lietotājs atver mājas lapu
2. Redz password logu
3. Ievada paroli
4. Ja pareiza → sessionStorage saglabā verificāciju
5. Mājas lapa pieejama līdz browser aizver

**Refresh (F5):** Parole paliek
**Browser aizver:** Jāievada atkal

---

## ✅ **Pārbaude:**

Lokāli (development):
```bash
npm run dev
```

Atver: `http://localhost:5173`
- Vajadzētu redzēt password logu
- Ievadi: `printstudio2025`
- Mājas lapa ielādējas latviešu valodā

---

## 🚢 **Deploy uz production:**

```bash
# 1. Build
npm run build

# 2. Commit
git add .
git commit -m "Add password protection and LV default language"

# 3. Commit dist
git add dist -f
git commit -m "Update build" --no-verify

# 4. Push
git push origin master

# 5. cPanel deploy
# Git Version Control → Manage → Pull or Deploy
```

---

**🎯 Gatavs testēšanai ar paroli un LV valodu!**
