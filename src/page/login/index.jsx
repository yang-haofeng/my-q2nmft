import React from 'react';
import MUtil from 'util/mm.jsx'
import User from 'service/user-service.jsx'

import './index.scss';

//登录界面
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      //记录从哪个路由跳转过来的
      redirect: MUtil.getUrlParam('redirect') || '/'
    }
  }

  componentWillMount() {
    document.title = '登录 - MMALL ADMIN';
  }

  // 当用户名发生改变
  onInputChange = (e) => {
    const inputValue = e.target.value,
      inputName = e.target.name;
    this.setState({
      [inputName]: inputValue
    });
  }

  onInputKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.onSubmit();
    }
  }

  // 当用户提交表单
  onSubmit = () => {
    const loginInfo = {
      username: this.state.username,
      password: this.state.password
    };
    //表单验证
    const checkResult = User.checkLoginInfo(loginInfo);
    // 验证通过
    if (checkResult.status) {
      User.login(loginInfo).then((res) => {

        //存储登录数据到本地
        MUtil.setStorage(User.USER_INFO_KEY, res);

        //使用ReactRouter提供的路由管理对象history, 切换到之前路由
        this.props.history.push(this.state.redirect);
      }, (errMsg) => {
        MUtil.errorTips(errMsg);
      });
    } else { // 验证不通过
      MUtil.errorTips(checkResult.msg);
    }

  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登录 - MMALL管理系统</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <input type="text"
                       name="username"
                       className="form-control"
                       placeholder="请输入用户名"
                       onKeyUp={this.onInputKeyUp}
                       onChange={this.onInputChange}/>
              </div>
              <div className="form-group">
                <input type="password"
                       name="password"
                       className="form-control"
                       placeholder="请输入密码"
                       onKeyUp={this.onInputKeyUp}
                       onChange={this.onInputChange}/>
              </div>
              <button className="btn btn-lg btn-primary btn-block"
                      onClick={this.onSubmit}>
                登录
              </button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Login;