
const generate = require('@pdfme/generator').generate;
const barcodes = require('@pdfme/schemas').barcodes;
const fs = require('fs');
const path = require('path');

const jsonData = fs.readFileSync(path.join(__dirname, 'cmyk-test.json'), 'utf8');
const template = JSON.parse(jsonData);
const pdf = generate({
  template: template,
  inputs: [
    { "field1": "https://www.google.com" },
    { "field1": "https://www.apple.com" },
    { "field1": "https://www.microsoft.com" },
  ],
  options: {
    colorType: 'cmyk'
  },
  plugins: {
    qrcode: barcodes.qrcode,
  }
}).then((pdf) => {
  fs.writeFileSync(path.join(__dirname, 'output.pdf'), pdf);
});