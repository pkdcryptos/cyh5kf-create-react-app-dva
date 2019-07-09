import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal,} from 'antd'

const sha256 = require('sha256')

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}
@Form.create()
class PassWordModal extends PureComponent {
  state = {
    confirmDirty: false,
  };

  handleOk = () => {
    const { onOk, form } = this.props
    const { validateFields, getFieldsValue } = form
    
    validateFields(errors => {
      if (errors) {
        return
      }
      const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      const data = {
        ...getFieldsValue(),
      }
      const config = {
        loginname: userInfo.loginname,
        oldPassword: sha256(data.oldPassword),
        password: sha256(data.password)
      }
      onOk(config)
    })
  }
  
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('您输入的两个密码不一致！');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  
  render() {
    const { onOk, form, ...modalProps } = this.props
    const { getFieldDecorator } = form
    
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">

          <FormItem label={'原密码'} required {...formItemLayout}>
            {getFieldDecorator('oldPassword', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '原密码不能为空',
                },
              ],
            })(<Input type="password" />)}
          </FormItem>

          <FormItem label={'新密码'} required {...formItemLayout}>
            {getFieldDecorator('password', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '密码不能为空！'
                },
                {
                  validator: this.validateToNextPassword,
                },
                // {
                //   pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
                //   message: '密码不得少于6位，必需包含字母和数字，不能包含中文',
                // }
              ],
            })(<Input.Password />)}
          </FormItem>

          <FormItem label={'确认密码'} required {...formItemLayout}>
            {getFieldDecorator('confirm', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '确认密码不能为空',
                }, {
                  validator: this.compareToFirstPassword,
                }
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

PassWordModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default PassWordModal
