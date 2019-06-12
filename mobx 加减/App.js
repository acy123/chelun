import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// 获取根组件注入的数据，如果有多个，把模块的名字追加在后面
@inject('count')
@observer
class App extends Component {

  changeCount(type){
    this.props.count.changeCount(type);
    // this.props.count.autoAdd().then(res=>{
    //   console.log('数据更新完成');
    // })
  }

  render() {
    console.log('props...', this.props);
    return (
      <div>
        <button onClick={()=>this.changeCount('+')}>+</button>
        <span>{this.props.count.count}</span>
        <button onClick={()=>this.changeCount('-')}>-</button>
      </div>
    );


  }
}

export default App;
