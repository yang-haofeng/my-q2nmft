import React from 'react';
import {Link} from 'react-router-dom';
import MUtil from 'util/mm.jsx'
import User from 'service/user-service.jsx'

import PageTitle from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      total: 0,
    };
  }

  componentDidMount() {
    this.loadUserList();
  }

  loadUserList = () => {
    User.getUserList(this.state.pageNum).then(res => {
      this.setState(res);
    }, errMsg => {
      //请求失败，列表置空
      this.setState({
        list: []
      });
      MUtil.errorTips(errMsg);
    });
  }

  // 页数发生变化的时候
  onPageNumChange = (pageNum) => {
    //setState完之后，请求当前页数据
    this.setState({
      pageNum: pageNum
    }, this.loadUserList);
  }

  render() {
    const tableHeads = ['ID', '用户名', '邮箱', '电话', '注册时间'];
    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表"/>
        <TableList tableHeads={tableHeads}>
          {this.createListBody()}
        </TableList>
        <Pagination
          current={this.state.pageNum}
          total={this.state.total}
          onChange={this.onPageNumChange}/>
      </div>
    );
  }
  createListBody = () => {
    return (
      this.state.list.map((user, index) => {
        return (
          <tr key={index}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{new Date(user.createTime).toLocaleString()}</td>
          </tr>
        );
      })
    )
  }
}

export default UserList;