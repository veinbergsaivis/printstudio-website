const fs = require('fs')
const path = require('path')

function walk(dir, ext = ['.ts', '.tsx', '.js', '.jsx']) {
  const res = []
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f)
    const stat = fs.statSync(p)
    if (stat.isDirectory()) res.push(...walk(p, ext))
    else if (ext.includes(path.extname(f))) res.push(p)
  }
  return res
}

// extract t('key', 'fallback') capturing key and optional fallback
function extractKeyFallbacks(file) {
  const src = fs.readFileSync(file, 'utf8')
  // matches t('some.key', 'fallback here') or t("some.key", "fallback") or t(`some.key`, 'fallback')
  const re = /t\(\s*(['"`])((?:\\\\.|(?!\1).)*)\1\s*(?:,\s*(['"`])((?:\\\\.|(?!\3).)*)\3)?/gm
  const ret = []
  let m
  while ((m = re.exec(src))) {
    const key = m[2]
    const fallback = m[4]
    ret.push({ key, fallback })
  }
  return ret
}

function isValidKey(k) {
  if (!k) return false
  // valid keys are dot-separated alphanum/underscore/hyphen and may end with numeric array index
  return /^([a-z0-9_\-]+)(\.[a-z0-9_\-]+|\.[0-9]+)*$/i.test(k)
}

function setNested(obj, pathStr, value) {
  const parts = pathStr.split('.')
  let cur = obj
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i]
    const isLast = i === parts.length - 1
    // numeric index -> array
    const idx = Number(p)
    if (!isNaN(idx) && p.trim() !== '') {
      // ensure cur is array
      if (!Array.isArray(cur)) cur = []
      if (isLast) cur[idx] = value
      else {
        cur[idx] = cur[idx] || {}
        cur = cur[idx]
      }
      continue
    }
    if (isLast) cur[p] = value
    else {
      cur[p] = cur[p] || {}
      cur = cur[p]
    }
  }
}

function loadLocale(file) {
  const txt = fs.readFileSync(file, 'utf8')
  const transformed = txt.replace(/export\s+default/, 'module.exports =')
  const vm = require('vm')
  const script = new vm.Script(transformed, { filename: file })
  const sandbox = { module: {}, exports: {} }
  vm.createContext(sandbox)
  script.runInContext(sandbox)
  return sandbox.module.exports || sandbox.exports
}

function writeLocale(file, obj) {
  const content = 'export default ' + JSON.stringify(obj, null, 2) + '\n'
  fs.writeFileSync(file, content, 'utf8')
}

;(function () {
  const srcDir = path.join(__dirname, '..', 'src')
  const files = walk(srcDir)
  const keyMap = new Map() // key -> fallback
  for (const f of files) {
    const list = extractKeyFallbacks(f)
    for (const { key, fallback } of list) {
      if (isValidKey(key)) {
        if (!keyMap.has(key) && fallback) keyMap.set(key, fallback)
        else if (!keyMap.has(key)) keyMap.set(key, null)
      }
    }
  }

  const enFile = path.join(__dirname, '..', 'src', 'i18n', 'locales', 'en.ts')
  const lvFile = path.join(__dirname, '..', 'src', 'i18n', 'locales', 'lv.ts')
  const en = loadLocale(enFile) || {}
  const lv = loadLocale(lvFile) || {}

  const missingInEn = []
  const missingInLv = []

  for (const [key, fallback] of keyMap.entries()) {
    const parts = key.split('.')
    // check existence in flattened object
    const existsEn = parts.reduce((acc, p) => acc && acc[p], en) !== undefined
    const existsLv = parts.reduce((acc, p) => acc && acc[p], lv) !== undefined
    if (!existsEn) {
      missingInEn.push(key)
      // write empty string or fallback to avoid inserting marker tokens
      const val = fallback || ''
      setNested(en, key, val)
    }
    if (!existsLv) {
      missingInLv.push(key)
      // use fallback if available, otherwise leave empty to avoid visible markers
      const val = fallback || ''
      setNested(lv, key, val)
    }
  }

  // write back locales
  writeLocale(enFile, en)
  writeLocale(lvFile, lv)

  const report = {
    addedToEn: missingInEn.length,
    addedToLv: missingInLv.length,
    keysAddedToEn: missingInEn,
    keysAddedToLv: missingInLv,
  }
  const out = path.join(__dirname, '..', 'i18n-sync-report.json')
  fs.writeFileSync(out, JSON.stringify(report, null, 2))
  console.log('i18n sync complete. Report:', JSON.stringify(report, null, 2))
})()
