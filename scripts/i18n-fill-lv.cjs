const fs = require('fs')
const path = require('path')

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

function flatten(obj, prefix = '') {
  const out = {}
  if (
    typeof obj === 'string' ||
    typeof obj === 'number' ||
    typeof obj === 'boolean' ||
    Array.isArray(obj)
  ) {
    out[prefix] = obj
    return out
  }
  for (const k of Object.keys(obj || {})) {
    const key = prefix ? prefix + '.' + k : k
    Object.assign(out, flatten(obj[k], key))
  }
  return out
}

function unflatten(flat) {
  const out = {}
  for (const k of Object.keys(flat)) {
    const parts = k.split('.')
    let cur = out
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i]
      if (i === parts.length - 1) {
        cur[p] = flat[k]
      } else {
        cur[p] = cur[p] || {}
        cur = cur[p]
      }
    }
  }
  return out
}

;(function () {
  const enPath = path.join(__dirname, '..', 'src', 'i18n', 'locales', 'en.ts')
  const lvPath = path.join(__dirname, '..', 'src', 'i18n', 'locales', 'lv.ts')
  const en = loadLocale(enPath)
  const lv = loadLocale(lvPath) || {}
  const enFlat = flatten(en)
  const lvFlat = flatten(lv)

  const merged = {}
  const rows = [['key', 'english', 'latvian']]
  for (const key of Object.keys(enFlat).sort()) {
    const enVal = enFlat[key]
    const lvVal = lvFlat[key]
    if (lvVal !== undefined) {
      merged[key] = lvVal
      rows.push([key, String(enVal), String(lvVal)])
    } else {
      // add English fallback (no marker) so UI won't display marker tokens; translators can use the CSV to update
      const toSet = typeof enVal === 'string' || typeof enVal === 'number' ? String(enVal) : enVal
      merged[key] = toSet
      rows.push([key, String(enVal), String(toSet)])
    }
  }

  const newLv = unflatten(merged)
  const outContent = 'export default ' + JSON.stringify(newLv, null, 2) + '\n'
  fs.writeFileSync(lvPath, outContent, 'utf8')

  const csv = rows
    .map(r => r.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(','))
    .join('\n')
  fs.writeFileSync(path.join(__dirname, '..', 'i18n-translation-queue.csv'), csv, 'utf8')

  console.log('LV locale merged and i18n-translation-queue.csv created.')
})()
