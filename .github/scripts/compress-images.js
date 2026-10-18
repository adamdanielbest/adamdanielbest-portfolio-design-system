const sharp = require('sharp');
const { glob } = require('glob');
const fs = require('fs');
const path = require('path');

const QUALITY = 82;
const MIN_SAVING_BYTES = 1024; // skip if saving less than 1KB

async function compress() {
  const files = await glob('assets/images/**/*.{jpg,jpeg,JPG,JPEG}');

  if (files.length === 0) {
    console.log('No JPG files found in assets/images/');
    return;
  }

  for (const file of files) {
    const original = fs.statSync(file).size;
    const tmp = file + '.tmp';

    await sharp(file)
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(tmp);

    const compressed = fs.statSync(tmp).size;
    const saving = original - compressed;

    if (saving > MIN_SAVING_BYTES) {
      fs.renameSync(tmp, file);
      console.log(`✅ ${file}: ${kb(original)} → ${kb(compressed)} (saved ${kb(saving)})`);
    } else {
      fs.unlinkSync(tmp);
      console.log(`⏭  ${file}: already optimised (${kb(original)})`);
    }
  }
}

function kb(bytes) {
  return `${Math.round(bytes / 1024)}KB`;
}

compress().catch(err => {
  console.error(err);
  process.exit(1);
});
