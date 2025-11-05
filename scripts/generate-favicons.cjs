const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const sourceImage = path.join(__dirname, '../src/assets/PS.webp')
const outputDir = path.join(__dirname, '../public')

async function generateFavicons() {
  console.log('🎨 Generating favicons from PS logo...')

  try {
    // Read source image
    const image = sharp(sourceImage)
    const metadata = await image.metadata()
    console.log(`Source image: ${metadata.width}x${metadata.height}, format: ${metadata.format}`)

    // 1. Generate favicon.ico (32x32)
    console.log('Creating favicon.ico (32x32)...')
    await image
      .clone()
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(outputDir, 'favicon-32.png'))

    // For .ico, we'll use the PNG
    await image
      .clone()
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(outputDir, 'favicon.ico')) // Browser will accept PNG as .ico

    // 2. Generate Apple Touch Icon (180x180)
    console.log('Creating apple-touch-icon.png (180x180)...')
    await image
      .clone()
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 1 } })
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'))

    // 3. Generate PWA icons
    console.log('Creating icon-192.png (192x192)...')
    await image
      .clone()
      .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 1 } })
      .png()
      .toFile(path.join(outputDir, 'icon-192.png'))

    console.log('Creating icon-512.png (512x512)...')
    await image
      .clone()
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 1 } })
      .png()
      .toFile(path.join(outputDir, 'icon-512.png'))

    // 4. Generate favicon.svg (if possible, otherwise create a 64x64 PNG)
    console.log('Creating favicon.svg fallback as 64x64 PNG...')
    await image
      .clone()
      .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(outputDir, 'favicon.svg')) // Will be PNG, but most browsers accept it

    console.log('✅ All favicons generated successfully!')
    console.log('\nGenerated files:')
    console.log('  - favicon.ico (32x32)')
    console.log('  - apple-touch-icon.png (180x180)')
    console.log('  - icon-192.png (192x192)')
    console.log('  - icon-512.png (512x512)')
    console.log('  - favicon.svg (64x64 PNG fallback)')
  } catch (error) {
    console.error('❌ Error generating favicons:', error)
    process.exit(1)
  }
}

generateFavicons()
