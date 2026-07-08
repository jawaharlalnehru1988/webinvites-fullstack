const fs = require('fs');
const path = require('path');

const htmlContent = fs.readFileSync('public/FinalHari.html', 'utf8');
const regex = /src="(data:image\/([a-zA-Z]+);base64,([^"]+))"/g;

let match;
let imageCount = 0;
let tsContent = `// Auto-generated exports for template images\n`;

const names = [
  'imgEnd',
  'frameTop',
  'frameBottom',
  'frameLeft',
  'frameRight',
  'panelLeftInner',
  'panelRightInner',
  'scrollOpen',
  'card0',
  'card1',
  'card2'
];

while ((match = regex.exec(htmlContent)) !== null) {
  const ext = match[2];
  const base64Data = match[3];
  
  const name = names[imageCount] || `image_${imageCount}`;
  const filename = `${name}.${ext}`;
  const filepath = path.join('public', 'images', 'animated-template', filename);
  
  fs.writeFileSync(filepath, Buffer.from(base64Data, 'base64'));
  
  tsContent += `export const ${name} = '/images/animated-template/${filename}';\n`;
  
  console.log(`Saved ${filename}`);
  imageCount++;
}

const tsDir = path.join('src', 'app', 'components', 'animated-template');
if (!fs.existsSync(tsDir)) {
  fs.mkdirSync(tsDir, { recursive: true });
}

fs.writeFileSync(path.join(tsDir, 'templateImages.ts'), tsContent);
console.log('Successfully extracted images and created templateImages.ts');
