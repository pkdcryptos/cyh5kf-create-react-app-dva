import React, {PureComponent, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Menu, Icon, Layout} from 'antd'
import store from 'store'
import classnames from 'classnames'
import styles from './Header.less'
import Modal from './Modal'
import head_img from '../../assets/images/head_img.svg'

const {SubMenu} = Menu

class Header extends PureComponent {
  state ={
    userInfo: {}
  }
  
  componentDidMount() {
    this.setState({
      userInfo: store.get('userInfo')
    })
  }
  
  /*
  * 点击下拉框
  * */
  handleClickMenu = e => {
    if (e.key === 'SignOut') {
      this.props.onSignOut()
      return
    }
    this.onUpdateUserPwd();
  }
  
  /*
  * 打开修改密码
  * */
  onUpdateUserPwd = () => {
    this.props.showModal();
  }
  
  render() {
    const {
      fixed,
      collapsed,
      onCollapseChange,
      updatePwdModalVisible,
      loading,
      updateUserPwd,
      // notifications
    } = this.props
    
    const modalProps = {
      visible: updatePwdModalVisible,
      maskClosable: false,
      confirmLoading: loading.effects['app/updateUserPwd'],
      title: '修改密码',
      centered: true,
      onOk: (data) => {
        updateUserPwd(data)
      },
      onCancel: () => {
        this.props.hideModal();
      },
    }
    const rightContent = [
      <Menu key="user" mode="horizontal" onClick={this.handleClickMenu}>
        <SubMenu
          title={
            <Fragment>
              <img style={{marginRight: 8}} alt="" src={head_img}/>
              {/* <span>{this.state.userInfo.name}</span> */}
              <Icon type="down" style={{marginLeft: 8}} />
            </Fragment>
          }
        >
          {/* <Menu.Item key="updateUserPwd">
            修改密码
          </Menu.Item> */}
          <Menu.Item key="SignOut">
            退出
          </Menu.Item>
        </SubMenu>
      </Menu>
    ]
    
    return (
      <Layout.Header
        className={classnames(styles.header, {
          [styles.fixed]: fixed,
          [styles.collapsed]: collapsed,
        })}
        id="layoutHeader"
      >
        <div
          className={styles.button}
          onClick={onCollapseChange.bind(this, !collapsed)}
        >
          <Icon
            type={classnames({
              'menu-unfold': collapsed,
              'menu-fold': !collapsed,
            })}
          />
        </div>
        {updatePwdModalVisible && <Modal {...modalProps} />}
        <div className={styles.rightContainer}>{rightContent}</div>
      </Layout.Header>
    )
  }
}

Header.propTypes = {
  fixed: PropTypes.bool,
  user: PropTypes.object,
  menus: PropTypes.array,
  collapsed: PropTypes.bool,
  onSignOut: PropTypes.func,
  onCollapseChange: PropTypes.func,
}

export default Header
