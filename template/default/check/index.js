const shell = require('shelljs');

const getLastestTag = () => {
  const cmd = 'git describe --tags';
  return shell.exec(cmd);
};

const checkIsPublished = () => {
  try {
    const lastestTag = getLastestTag();
    if (lastestTag.replace('v', '').split('.')[0] >= 1) {
      throw new Error(
        '\x1b[40m \x1b[31m 项目已发布，不能发布test版本，测试请到temp环境进行！ \x1b[0m'
      );
    }
  } catch (e) {
    throw new Error(
      '\x1b[40m \x1b[31m 项目已发布，不能发布test版本，测试请到temp环境进行！ \x1b[0m'
    );
  }
};
checkIsPublished();
