import MUtil from 'util/mm.jsx'

class Statistic {
  // 首页数据统计
  static getHomeCount() {
    return MUtil.request({
      url: '/manage/statistic/base_count.do'
    });
  }
}

export default Statistic;