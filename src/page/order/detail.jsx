import React from 'react';
import MUtil from 'util/mm.jsx'
import Order from 'service/order-service.jsx'
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';

import './detail.scss';


//订单详情
class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber: this.props.match.params.orderNumber,
      orderInfo: {}
    }
  }

  componentDidMount() {
    this.loadOrderDetail();
  }

  // 加载商品详情
  loadOrderDetail = () => {
    Order.getOrderDetail(this.state.orderNumber).then((res) => {
      this.setState({
        orderInfo: res
      });
    }, (errMsg) => {
      MUtil.errorTips(errMsg);
    });
  }

  // 发货操作
  onSendGoods = () => {
    if (window.confirm('是否确认该订单已经发货？')) {
      Order.sendGoods(this.state.orderNumber).then((res) => {
        MUtil.successTips('发货成功');
        this.loadOrderDetail();
      }, (errMsg) => {
        MUtil.errorTips(errMsg);
      });
    }
  }

  render() {
    const receiverInfo = this.state.orderInfo.shippingVo || {};
    const tableHeads = [
      {name: '商品图片', width: '10%'},
      {name: '商品信息', width: '45%'},
      {name: '单价', width: '15%'},
      {name: '数量', width: '15%'},
      {name: '合计', width: '15%'}
    ];
    return (
      <div id="page-wrapper">
        <PageTitle title="订单详情"/>
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">订单号</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">创建时间</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.orderInfo.createTime}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">收件人</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {receiverInfo.receiverName}，
                {receiverInfo.receiverProvince}
                {receiverInfo.receiverCity}
                {receiverInfo.receiverAddress}
                {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单状态</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.statusDesc}
                {
                  this.state.orderInfo.status === 20 ?
                    <button
                      className="btn btn-default btn-sm btn-send-goods"
                      onClick={this.onSendGoods}>立即发货
                    </button>
                    : null
                }
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">支付方式</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.paymentTypeDesc}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单金额</label>
            <div className="col-md-5">
              <p className="form-control-static">
                ￥{this.state.orderInfo.payment}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品列表</label>
            <div className="col-md-10">
              <TableList tableHeads={tableHeads}>
                {this.renderListBody()}
              </TableList>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderListBody = () => {
    const productList = this.state.orderInfo.orderItemVoList || [];
    return productList.map((product, index) => {
      return (
        <tr key={index}>
          <td>
            <img className="p-img" alt={product.productName}
                 src={`${this.state.orderInfo.imageHost}${product.productImage}`}/>
          </td>
          <td>{product.productName}</td>
          <td>￥{product.currentUnitPrice}</td>
          <td>{product.quantity}</td>
          <td>￥{product.totalPrice}</td>
        </tr>
      );
    });
  }
}

export default OrderDetail;