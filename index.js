/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";
inquirer.prompt([
    {
        name: 'url',
        message: 'Input url here to convert into a QR code image:',
        type: 'input'
    }
  ])
  .then((answers) => {
    let url = answers.url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
    }
    var qr_png = qr.image(url, { type: 'png' });
    qr_png.pipe(fs.createWriteStream("qr_img.png"));
    fs.writeFile('URL.txt', url, err => {
      if (err) {
        console.error(err);
      } else {
        console.log('User input saved successfully as a .txt file!');
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
        console.log('Prompt couldn\'t be rendered in the current environment')
    } else {
        console.error('An error occured:', error);
    }
  });