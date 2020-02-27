import { LOGIN } from '../configs/apiList';
const formateAPI = ([method, path]) =>
  `on${method.replace(/^\S/, s => s.toUpperCase())}:${path}`;
export default {
  [formateAPI(LOGIN)]: {
    ok: true,
    result: {
      id: 1, // 用户id
      nickname: 'user mock', // 昵称
      avatar:
        'http://gz-pro.oss-cn-shenzhen.aliyuncs.com/server/apg-client-review/20191018/36610972-b2a7-4889-9085-75bd5ae213d7?%3FOSSAccessKeyId=LTAIUUHINaeueXoP&Signature=BQhWXbQ2fRgbJK9K%2FYUC0EXknIk%3D', // 头像地址
      isNewUser: true, // 是否是新用户
      serverTime: '2020-02-13T02:39:22.780Z' // 服务器时间
    }
  }
};
