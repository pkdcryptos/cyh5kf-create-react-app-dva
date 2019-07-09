import React, {PureComponent, Fragment} from 'react'
import { connect } from 'dva';
import PropTypes from 'prop-types'
import {Button, Row, Form, Input, message} from 'antd'
import store from 'store'
import styles from './index.less'
import mc_logo from '../../assets/images/mc_logo.svg'
import config from 'utils/config'
const FormItem = Form.Item;
const sha256 = require('sha256');


@connect(({ app, loading }) => ({ app, loading }))
@Form.create()
class Login extends PureComponent {
  
  handleOk = (e) => {
    const {form, dispatch} = this.props
    const {validateFieldsAndScroll} = form;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(
          {
            type: 'login/login',
            payload: {
              loginname: values.username,
              password: sha256(values.password)
            }
          }
        )
      }
    })
  }
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.loginCon) {
      if (nextProps.loginCon.code === 200) {
        this.props.history.push('/home')
      } else {
        message.error(nextProps.loginCon.message)
      }
    }
  }
  
  componentDidMount() {
    const isLogin = store.get('isLogin')
    if (isLogin) {
      this.props.history.push('/home')
    }
  }
  
  render() {
    const {form} = this.props
    const {getFieldDecorator} = form
    
    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            <img alt="logo" src={mc_logo} />
            <span>{config.siteName}</span>
          </div>
          <form>
            <FormItem hasFeedback>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '用户名不能为空！'
                  },
                ],
              })(
                <Input
                  onPressEnter={this.handleOk}
                  placeholder="请输入用户名"
                />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '密码不能为空！'
                  },
                ],
              })(
                <Input
                  type="password"
                  onPressEnter={this.handleOk}
                  placeholder="请输入密码"
                />
              )}
            </FormItem>
            <Row>
              <Button
                type="primary"
                onClick={this.handleOk}
                // loading={loading.effects.login}
              >
                登录
              </Button>
              <p>
                <span>
                  Username
                  ：admin
                </span>
                <span>
                  Password
                  ：123456
                </span>
              </p>
            </Row>
          </form>
        </div>

        <div className={styles.footer}>
          <div className="copyright-con">
            {/* <div className="footer-menu">
              <span className="bar-li">关于我们</span>
              <span className="bar-li">联系我们</span>
            </div> */}
            <div>copyright © 2019 杭州美创科技有限公司</div>
          </div>
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login;

