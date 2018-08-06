import React from 'react';
import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';

// 通用分页组件
export default class Pagination extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <RcPagination
            {...this.props}
            hideOnSinglePage
            showQuickJumper
          />
        </div>
      </div>
    );
  }
}