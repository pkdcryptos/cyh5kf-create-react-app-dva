export default {
  /**
   * 指标上报
   */
  addColumn: 'POST /column', // 新增字段定义
  queryColumn: '/column', // 查询字段列表
  query: '/report', // 查询列表
  addReport: 'POST /report', // 新增指标
  deleteReport: '/report/delete', // 删除指标
  updateReport: 'POST /report/update', // 更新指标(批量/单个)
  /**
   * 登录，退出
   */
  loginIn: 'POST /login',
  loginOut: 'POST /logout/',
  updateUserPwd: 'POST /userMge/user/updatepd'
}