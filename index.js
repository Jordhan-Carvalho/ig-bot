const ig = require('./instagram');
require('dotenv').config();

(async () => {
  await ig.initialize();

  await ig.login(process.env.USERNAME_IG, process.env.PASSWORD_IG);

  await ig.likeTagsProcess(['barreiras', 'lem']);
})();
