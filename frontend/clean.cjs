const fs = require('fs');
let content = fs.readFileSync('public/FinalHari.html', 'utf8');
content = content.replace(/src="data:image\/[^;]+;base64,[^"]+"/g, 'src="BASE64_IMAGE"');
fs.writeFileSync('public/FinalHari_clean.html', content);
