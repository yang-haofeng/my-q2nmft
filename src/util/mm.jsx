
//通用工具类
export default class MUtil {
  //请求方法
  static request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.type || 'get',
        url: param.url || '',
        dataType: param.dataType || 'json',
        data: param.data || null,
        success: res => {
          if (0 === res.status) { // 数据请求成功
            typeof resolve === 'function' && resolve(res.data, res.msg);
          } else if (10 === res.status) { // 没有登录状态，强制登录
            this.doLogin();
          } else {
            typeof reject === 'function' && reject(res.msg || res.data);
          }
        },
        error: err => {
          typeof reject === 'function' && reject(err.statusText);
        }
      });
    });
  }

  // 跳转登录界面
  static doLogin() {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
  }

  // 获取URL参数
  static getUrlParam(name) {
    // xxx.com?param=123&param1=456
    const queryString = window.location.search.split('?')[1] || '',
      reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
      result = queryString.match(reg);
    //result: ['param=123&', '', '123', '&']
    return result ? decodeURIComponent(result[2]) : null;
  }

  // 成功提示
  static successTips(successMsg) {
    alert(successMsg || '操作成功！');
  }

  // 错误提示
  static errorTips(errMsg) {
    alert(errMsg || '好像哪里不对了~');
  }

  // 本地存储
  static setStorage(name, data){
    let dataType = typeof data;
    // json对象
    if(dataType === 'object'){
      window.localStorage.setItem(name, JSON.stringify(data));
    }
    // 基础类型
    else if(['number','string','boolean'].indexOf(dataType) >= 0){
      window.localStorage.setItem(name, data);
    }
    // 其他不支持的类型
    else{
      alert('该类型不能用于本地存储');
    }
  }
  // 取出本地存储内容
  static getStorage(name){
    let data = window.localStorage.getItem(name);
    if(data){
      return JSON.parse(data);
    }
    else{
      return '';
    }
  }
  // 删除本地存储
  static removeStorage(name){
    window.localStorage.removeItem(name);
  }

}