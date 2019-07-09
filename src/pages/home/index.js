import React, { PureComponent } from "react";
import Page from "components/Page";
import { connect } from 'dva';


@connect(({ home, loading }) => ({ home, loading }))
class Home extends PureComponent {

  render(){
    return (
      <Page inner>
        测试
      </Page>
    );
  }
}

export default Home;
