import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';


class NavTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: MUtil.getStorage(User.USER_INFO_KEY).username || ''

    }
  }

  // 退出登录
  onLogout = () => {
    User.logout().then(res => {
      //删除存储
      MUtil.removeStorage(User.USER_INFO_KEY);
      //返回登录界面
      window.location.href = '/login';
    }, errMsg => {
      MUtil.errorTips(errMsg);
    });
  }

  render() {
    return (
      <div className="navbar navbar-default top-navbar">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/"><b>HAPPY</b>MMALL</Link>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" href="javascript:;">
              <i className="fa fa-user fa-fw" />
              {
                this.state.username
                  ? <span>欢迎，{this.state.username}</span>
                  : <span>欢迎您</span>
              }
              <i className="fa fa-caret-down" />
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a onClick={this.onLogout}>
                  <i className="fa fa-sign-out fa-fw" />
                  <span>退出登录</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavTop;