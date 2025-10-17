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

function extractTKeysFromFile(file) {
  const src = fs.readFileSync(file, 'utf8')
  const re = /t\(\s*(['"`])((?:\\\\.|(?!\1).)*)\1/gm // captures literal string in t('key') or t(`key`)
  const keys = []
  let m
  while ((m = re.exec(src))) {
    const key = m[2]
    // ignore strings that contain ${ (template expressions) or concatenation patterns with + or { or } inside
    if (/\$\{|\+/.test(key)) continue
    // skip when key includes backticks or template placeholders
    if (key.trim() === '') continue
    keys.push(key)
  }
  return keys
}

function unique(arr) {
  return Array.from(new Set(arr)).sort()
}

function loadLocaleObj(file) {
  const txt = fs.readFileSync(file, 'utf8')
  // naive transform: replace `export default` with `module.exports =` and remove TypeScript-only syntax if any
  const transformed = txt.replace(/export\s+default/, 'module.exports =')
  try {
    const vm = require('vm')
    const script = new vm.Script(transformed, { filename: file })
    const sandbox = { module: {}, exports: {} }
    vm.createContext(sandbox)
    script.runInContext(sandbox)
    const obj = sandbox.module.exports || sandbox.exports
    return obj
  } catch (e) {
    console.error('Failed to eval', file, e.message)
    return null
  }
}

function flatten(obj, prefix = '') {
  const out = {}
  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
    out[prefix] = obj
    return out
  }
  if (Array.isArray(obj)) {
    out[prefix] = obj
    return out
  }
  for (const k of Object.keys(obj || {})) {
    const val = obj[k]
    const key = prefix ? prefix + '.' + k : k
    Object.assign(out, flatten(val, key))
  }
  return out
}

;(async function () {
  const srcDir = path.join(__dirname, '..', 'src')
  const files = walk(srcDir)
  const tKeys = []
  for (const f of files) {
    const keys = extractTKeysFromFile(f)
    for (const k of keys) tKeys.push(k)
  }
  const usedKeys = unique(tKeys.filter(Boolean))

  const enPath = path.join(__dirname, '..', 'src', 'i18n', 'locales', 'en.ts')
  const lvPath = path.join(__dirname, '..', 'src', 'i18n', 'locales', 'lv.ts')
  const enObj = loadLocaleObj(enPath)
  const lvObj = loadLocaleObj(lvPath)

  const enFlat = enObj ? flatten(enObj) : {}
  const lvFlat = lvObj ? flatten(lvObj) : {}

  const enKeys = Object.keys(enFlat).sort()
  const lvKeys = Object.keys(lvFlat).sort()

  const missingInEn = usedKeys.filter(k => !enKeys.includes(k))
  const missingInLv = usedKeys.filter(k => !lvKeys.includes(k))

  const typeMismatches = []
  for (const k of usedKeys) {
    if (enFlat[k] !== undefined && lvFlat[k] !== undefined) {
      const t1 = Array.isArray(enFlat[k]) ? 'array' : typeof enFlat[k]
      const t2 = Array.isArray(lvFlat[k]) ? 'array' : typeof lvFlat[k]
      if (t1 !== t2) typeMismatches.push({ key: k, enType: t1, lvType: t2 })
    }
  }

  const report = { usedKeysCount: usedKeys.length, missingInEn, missingInLv, typeMismatches }
  const outPath = path.join(__dirname, '..', 'i18n-validate-report.json')
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2))
  console.log('Report written to', outPath)
  console.log(JSON.stringify(report, null, 2))
})()
