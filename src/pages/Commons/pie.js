import React, {PureComponent} from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入饼图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

class Pie extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      myChart: {},
      nextProps: {}
    }
  }
  
  componentDidMount() {
    this.initData();
    this.setOption(this.props)
  }
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setOption(nextProps)
  }
  
  // 组件参数
  setOption = (props) => {
    let option = this.state.myChart.getOption();
    props.hasOwnProperty('color') && (option.color = props.color)
    props.hasOwnProperty('legend') && (option.legend = props.legend)
    props.hasOwnProperty('legendData') && (option.legend[0].data = props.legendData)
    props.hasOwnProperty('title') && (option.title = props.title)
    props.hasOwnProperty('titleText') && (option.title[0].text = props.titleText , option.series[0].name = props.titleText)
    props.hasOwnProperty('seriesData') && (option.series[0].data = props.seriesData)
    props.hasOwnProperty('seriesName') && (option.series[0].name = props.seriesName)
    props.hasOwnProperty('seriesRadius') && (option.series[0].radius = props.seriesRadius)
    props.hasOwnProperty('seriesLabel') && (option.series[0].label = props.seriesLabel)
    props.hasOwnProperty('seriesCenter') && (option.series[0].center = props.seriesCenter)
    this.state.myChart.setOption(option);
  }
  
  //加载图表
  initData = () => {
    const that = this
    // 基于准备好的dom，初始化echarts实例
    this.state.myChart = echarts.init(document.getElementById((this.props.curId || 'main')));
    // 指定图表的配置项和数据
    const option = {
      title: [{
        text: ''
      }],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: [{
        orient: 'vertical',
        x: 'right',
        itemWidth: 15,
        itemHeight: 10,
        itemGap: 5,
        align: 'left',
        data: [],
        textStyle: {
          fontSize: 10
        }
      }],
      series: [
        {
          name: '',
          type: 'pie',
          radius: '90%',
          center: ['30%', '50%'],
          data: [],
          label: {
            show: false   //隐藏标示文字
          },
          labelLine: {
            show: false   //隐藏标示线
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    this.state.myChart.setOption(option);
    // this.setOption(this.props);
    window.addEventListener('resize', function () {
      that.state.myChart.resize();
    });
    setTimeout(function () {
      that.state.myChart.resize();
    }, 500)
  }
  
  render() {
    const {curId, height} = this.props;
    return (
      <div id={curId} style={{'width': '100%', 'height': height}}></div>
    )
  }
}

Pie.propTypes = {}

export default Pie
