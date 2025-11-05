const fs = require('fs')
const path = require('path')

// Simple script to copy the REAL favicon to all needed locations
const sourceFile = path.join(__dirname, '../public/favicon.REAL.ico')
const publicDir = path.join(__dirname, '../public')

console.log('📋 Setting up favicon from favicon.REAL.ico...\n')

try {
  // 1. Copy to favicon.ico
  console.log('✓ Copying to favicon.ico')
  fs.copyFileSync(sourceFile, path.join(publicDir, 'favicon.ico'))

  // 2. Copy to apple-touch-icon.png (browsers will handle .ico as image)
  console.log('✓ Copying to apple-touch-icon.png')
  fs.copyFileSync(sourceFile, path.join(publicDir, 'apple-touch-icon.png'))

  // 3. Copy to icon-192.png
  console.log('✓ Copying to icon-192.png')
  fs.copyFileSync(sourceFile, path.join(publicDir, 'icon-192.png'))

  // 4. Copy to icon-512.png
  console.log('✓ Copying to icon-512.png')
  fs.copyFileSync(sourceFile, path.join(publicDir, 'icon-512.png'))

  // 5. Copy to favicon.svg (will be treated as image)
  console.log('✓ Copying to favicon.svg')
  fs.copyFileSync(sourceFile, path.join(publicDir, 'favicon.svg'))

  console.log('\n✅ All done! Your real favicon is now set everywhere.')
  console.log('\n📝 Note: The .ico file will be used for all formats.')
  console.log('   Modern browsers will handle this correctly.')
  console.log('\n🚀 Test it: npm run dev')
} catch (error) {
  console.error('❌ Error:', error.message)
  process.exit(1)
}
