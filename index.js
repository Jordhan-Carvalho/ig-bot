const ig = require('./instagram');
const utils = require('./utils');

(async () => {
  const resp = await utils.getUserPass();

  await ig.initialize();

  await ig.login(resp.name, resp.password);

  await ig.likeTagsProcess(['barreiras', 'lem']);
})();
