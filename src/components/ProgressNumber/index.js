import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import './index.less'

class ProgressNumber extends PureComponent {
  
  render() {
    const {
      title,
      value,
      max,
      width,
      height,
      titleWidth,
      numberWidth,
      fontSize,
      barColor,
      configChange
    } = this.props
    let widthPx = width
    let heightPx = height
    let heightPxTitle = '10px'
    let titleWidthPx = `${titleWidth}px`
    let fontSizePx = `${fontSize}px`
    let numberWidthPx = `${numberWidth}px`
    let widthValue = `${parseInt(value / max * 100)}%`
    let textZh = '低'
    if (!isNaN(width)) {
      widthPx = `${width}px`
      titleWidthPx = `${titleWidth}px`
    }
    if (!isNaN(height)) {
      heightPx = `${height}px`
      heightPxTitle = `${Number(height) + 20}px`
    }
    if (max === 0) {
      widthValue = '0%'
      textZh = '无'
    } else {
      if (parseInt(value / max * 100) < 40) {
        textZh = '低'
      } else if (parseInt(value / max * 100) >= 70) {
        textZh = '高'
      } else if (40 < parseInt(value / max * 100) < 70) {
        textZh = '中等'
      }
    }
    
    return (
      <div className="progress-wrap" style={{'width': widthPx, 'fontSize': fontSizePx}}>
        <div className="progress-title" style={{'height': heightPxTitle, 'width': titleWidthPx}}>
          <div className="height-20"></div>
          <div style={{'lineHeight': heightPx, 'height': heightPx, 'fontSize': fontSizePx, cursor:'pointer'}}
               onClick={()=> configChange(title)}>{title}</div>
        </div>
        <div className="progress-over">
          <div className="progress-outer">
            <div className="progress-number top-text height-20">
              <div className="progress-bg height-20" style={{'width': widthValue, 'backgroundColor': 'transparent'}}>
                <span className="progress-top-text">{widthValue}({textZh})</span></div>
            </div>
            <div className="progress-title progress-title-right">
            </div>
          </div>
          <div className="progress-outer" style={{'height': heightPx}}>
            {/*<progress value={value} max={max} className="progress"></progress>*/}
            <div className="progress-number">
              <div className="progress-bg" style={{'width': widthValue, 'backgroundColor': barColor}}></div>
            </div>
            <div className="progress-title progress-title-right" style={{'width': numberWidthPx}}>
              <div style={{'lineHeight': heightPx, 'fontSize': fontSizePx}}>{max}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProgressNumber.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default ProgressNumber
