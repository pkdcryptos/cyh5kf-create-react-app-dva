import React, { Component } from 'react'
import { Card } from 'antd';
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './index.less'

export default class Page extends Component {
  
  render() {
    const { title, className, children, inner = false } = this.props

    return (
      <div
        className={classnames(className, {
          [styles.contentInner]: inner,
        })}
      >
        <Card title={title} bordered={false}>
          {children}
        </Card>
      </div>
    )
  }
}

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  inner: PropTypes.bool,
}