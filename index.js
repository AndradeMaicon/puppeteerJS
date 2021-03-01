const puppeteer = require('puppeteer');
const fs = require('fs');
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://instagram.com/rocketseat_oficial');

  const imgList = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('article img')

    const imgArry = [...nodeList]

    const imgList = imgArry.map(({src}) => ({src}))

    return imgList;
  });
  
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
    if(err) throw new Error('Something went wrong')

    console.log('well done!')
  });

  await browser.close();
})();