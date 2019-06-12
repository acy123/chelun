import React, { Component } from 'react';
import  './index.scss';
import { inject, observer } from 'mobx-react';
@inject ('List')
@observer
class Letter extends Component {
  constructor() {
    super();
    this.state = { 
      data:[],
      startX:'',
      moveX:''
    };
  }
  render() {
    let {data} =this.props;
    return (
       <div className={this.props.List.flag?'Letter active':'Letter'} ref='types' onTouchStart={this.StartTouch} onTouchMove={this.MoveTouch}>
          <div>
            {data?data.map((item,index)=>{
              return <div key={index} className='content'>
              <p>{item.GroupName}</p>
              <ul className='TypeList'>
                {item.GroupList?item.GroupList.map(val=>{
                  return <li key={val.SerialID} onClick={()=>this.handleDetail(val.SerialID)}>
                    <img src={val.Picture} alt=''/>
                    <div>
                      <p>{val.AliasName}</p>
                      <p>{val.DealerPrice}</p>
                    </div>
                  </li>
                }):''}
              </ul>
                </div>
            }):null}
          </div>
        </div>
    );
  }
  handleDetail=(id)=>{
    this.props.history.push(`/car/${id}`)
    this.props.List.show(false)
  };
  StartTouch=(e)=>{
    this.setState({
      startX:e.touches[0].pageX
    })
  };
  MoveTouch=(e)=>{
    this.setState({
      moveX:e.touches[0].pageX
    },()=>{
      if(this.state.moveX-this.state.startX>0){
        this.refs.types.style.transform=`translateX(${this.state.moveX-this.state.startX}px)` 
      if(this.state.moveX-this.state.startX>this.refs.types.clientWidth*2/3){
        this.props.List.show(false)
        this.refs.types.style.transform='translateX(0px)'
      } 
  }
    })
  }
}

export default Letter;