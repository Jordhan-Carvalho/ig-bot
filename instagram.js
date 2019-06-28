const puppeteer = require('puppeteer');
const utils = require('./utils');

const url = 'https://instagram.com';
const tagUrl = tag => `https://www.instagram.com/explore/tags/${tag}/`;

const instagram = {
  browser: null,
  page: null,

  initialize: async () => {
    instagram.browser = await puppeteer.launch({
      executablePath: utils.getPath,
      headless: false,
    });
    instagram.page = await instagram.browser.newPage();
  },

  login: async (username, password) => {
    await instagram.page.goto(url, { waitUntil: 'networkidle2' });
    await instagram.page.waitFor(1000);
    let loginButton = await instagram.page.$x(
      '//a[contains(text(), "Log in")]'
    );
    // Click on the login url button
    await loginButton[0].click();

    // await instagram.page.waitForNavigation({ waitUntil: 'networkidle2' });

    await instagram.page.waitFor(1000);

    // Writing the username and password
    await instagram.page.type('input[name="username"]', username, {
      delay: 78,
    });
    await instagram.page.type('input[name="password"]', password, {
      delay: 152,
    });
    // Click on the login button
    loginButton = await instagram.page.$x('//div[contains(text(), "Log In")]');
    await loginButton[0].click();

    await instagram.page.waitFor(10000);
  },

  likeTagsProcess: async (tags = []) => {
    for (const tag of tags) {
      // Go to the tag page
      await instagram.page.goto(tagUrl(tag));
      await instagram.page.waitFor(1000);
      // Save posts on the recent div
      const posts = await instagram.page.$$(
        'article > div:nth-child(3) img[decoding="auto"]'
      );
      for (let i = 0; i < 3; i++) {
        const post = posts[i];
        // click on the post
        await post.click();
        // wait for the modal appear
        await instagram.page.waitFor(
          'span[id="react-root"][aria-hidden="true"]'
        );
        await instagram.page.waitFor(2000);
        // check if already likes
        const isLikable = await instagram.page.$('span[aria-label="Like"]');
        if (isLikable) {
          await instagram.page.click('span[aria-label="Like"]');
        }
        await instagram.page.waitFor(3000);
        // close modal
        const closedModalButton = await instagram.page.$x(
          '//button[contains(text(), "Close")]'
        );
        await closedModalButton[0].click();
        await instagram.page.waitFor(1000);
      }
      await instagram.page.waitFor(10000);
    }
  },
};

module.exports = instagram;
