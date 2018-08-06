import React from 'react';

// 通用的列表
class TableList extends React.Component {
  static defaultProps = {
    tableHeads: []
  }
  constructor(props) {
    super(props);
    this.state = {
      isFirstLoading: true
    }
  }

  componentWillReceiveProps() {
    // 组件更新时调用, 列表只有在第一次挂载的时候，isFirstLoading为true，其他情况为false
    this.setState({
      isFirstLoading: false
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            {/*表头*/}
            <thead>
              <tr>
                {this.renderTableHeader()}
              </tr>
            </thead>
            {/*内容*/}
            <tbody>
              {this.renderTableBody()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  //表头
  renderTableHeader = () => {
    return this.props.tableHeads.map(
      (tableHead, index) => {
        if (typeof tableHead === 'object') {
          return <th key={index} width={tableHead.width}>{tableHead.name}</th>
        } else if (typeof tableHead === 'string') {
          return <th key={index}>{tableHead}</th>
        }
      }
    );
  }
  //内容
  renderTableBody = () => {
    // 列表内容
    const listBody = this.props.children;
    // 列表提示信息
    const listInfo = (
      <tr>
        <td colSpan={this.props.tableHeads.length} className="text-center">
          {this.state.isFirstLoading ? '正在加载数据...' : '没有找到相应的结果~'}</td>
      </tr>
    );
    //根据传入的列表内容是否有数据，显示列表或提示信息
    return listBody.length > 0 ? listBody : listInfo;
  }
}

export default TableList;