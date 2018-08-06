import MUtil from 'util/mm.jsx'

export default class User {

  static USER_INFO_KEY = 'userInfo';

  // 用户登录
  static login = (loginInfo) => {
    return MUtil.request({
      type: 'post',
      url: '/manage/user/login.do',
      data: loginInfo
    });
  }
  // 检查登录接口的数据是不是合法
  static checkLoginInfo = (loginInfo) => {
    let username = $.trim(loginInfo.username),
      password = $.trim(loginInfo.password);
    // 判断用户名为空
    if (typeof username !== 'string' || username.length === 0) {
      return {
        status: false,
        msg: '用户名不能为空！'
      }
    }
    // 判断密码为空
    if (typeof password !== 'string' || password.length === 0) {
      return {
        status: false,
        msg: '密码不能为空！'
      }
    }
    return {
      status: true,
      msg: '验证通过'
    }
  }
  // 退出登录
  static logout = () => {
    return MUtil.request({
      type: 'post',
      url: '/user/logout.do'
    });
  }

  static getUserList = (pageNum) => {
    return MUtil.request({
      type: 'post',
      url: '/manage/user/list.do',
      data: {
        pageNum: pageNum
      }
    });
  }
}

