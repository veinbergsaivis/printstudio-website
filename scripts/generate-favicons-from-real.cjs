const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const sourceImage = path.join(__dirname, '../public/favicon.REAL.png')
const outputDir = path.join(__dirname, '../public')

async function generateFaviconsFromReal() {
  console.log('🎨 Generating all favicons from favicon.REAL file...')

  try {
    // Check if source file exists
    if (!fs.existsSync(sourceImage)) {
      console.error('❌ Error: favicon.REAL.png not found in public/ folder!')
      process.exit(1)
    }

    // Read source image with explicit format
    const image = sharp(sourceImage, { failOnError: false })
    const metadata = await image.metadata()
    console.log(`Source image: ${metadata.width}x${metadata.height}, format: ${metadata.format}`)

    // 1. Generate favicon.ico (32x32) - overwrites old one
    console.log('✓ Creating favicon.ico (32x32)...')
    await image
      .clone()
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(outputDir, 'favicon.ico'))

    // 2. Generate Apple Touch Icon (180x180)
    console.log('✓ Creating apple-touch-icon.png (180x180)...')
    await image
      .clone()
      .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'))

    // 3. Generate PWA icons
    console.log('✓ Creating icon-192.png (192x192)...')
    await image
      .clone()
      .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(path.join(outputDir, 'icon-192.png'))

    console.log('✓ Creating icon-512.png (512x512)...')
    await image
      .clone()
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(path.join(outputDir, 'icon-512.png'))

    // 4. Generate favicon.svg as 64x64 PNG
    console.log('✓ Creating favicon.svg (64x64 PNG)...')
    await image
      .clone()
      .resize(64, 64, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(outputDir, 'favicon.svg'))

    // 5. Also create a proper 16x16 version
    console.log('✓ Creating favicon-16.png (16x16)...')
    await image
      .clone()
      .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(outputDir, 'favicon-16.png'))

    console.log('\n✅ All favicons generated successfully from favicon.REAL.ico!')
    console.log('\n📦 Generated files:')
    console.log('  ✓ favicon.ico (32x32) - Main favicon')
    console.log('  ✓ favicon.svg (64x64) - Modern browsers')
    console.log('  ✓ favicon-16.png (16x16) - Extra small size')
    console.log('  ✓ apple-touch-icon.png (180x180) - iOS devices')
    console.log('  ✓ icon-192.png (192x192) - PWA small')
    console.log('  ✓ icon-512.png (512x512) - PWA large')
    console.log('\n🎯 Your website will now display the correct favicon everywhere!')
  } catch (error) {
    console.error('❌ Error generating favicons:', error)
    process.exit(1)
  }
}

generateFaviconsFromReal()
