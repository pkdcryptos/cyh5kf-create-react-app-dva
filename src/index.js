import dva from 'dva';
import createLoading from 'dva-loading';
import { createHashHistory as createHistory } from 'history'
import { message } from 'antd'
import './app.less'
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError(err) {
    message.error(err.message)
  },
});
 
// 2. Plugins
app.use(createLoading());
 
// 3. Model
app.model(require('./models/app').default);
 
// 4. Router
app.router(require('./routes').default);
 
// 5. Start
app.start('#root');