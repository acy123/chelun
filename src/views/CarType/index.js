import React, { Component } from 'react';
import  './index.scss';
import { inject, observer } from 'mobx-react';
import Letter from '../../component/letter';
import withLoading from '../../component/withLoading/withLoading'
import Scroll from "better-scroll";
@inject ('List','ShowLoading')
@observer
@withLoading
class CarType extends Component {
  constructor(props) {
    super(props);
    this.state = {
     brandList:[],
     carType:[],
     moveY:'',
     ele:''
    }; 
  }
  componentDidMount(){
    //获取车的种类
    this.props.List.getListType().then(res=>{
      if(res){
        this.props.ShowLoading.changeFlag()
      }
      let brandList=[];
      res.forEach(item=>{
        let letter=item.Spelling[0];
        let index=brandList.findIndex(val=>val.letter===letter);
        if(index===-1){
          brandList.push({
            letter,
            list:[item]
          })
        }else{
          brandList[index].list.push(item)
        }
      });
      this.setState({
        brandList:brandList
      })
    });
    //滚动
    this.scroll=new Scroll(this.refs.scroll,{
      click:true,
      probeType:2
    })
    //滑动事件
    this.handeTouch()
  };
  //获取每种车的类型
  handleLetter(MasterID){
    this.props.List.show(true)
    this.props.List.getCarType(MasterID).then(res=>{
      this.setState({
        carType:res
      })
    });
  };
  handleChange(letter){
    this.scroll.scrollToElement('#'+letter)
  }
  render() {
    let {brandList} =this.state
    return ( 
      //左边列表
      <div className='wrap' ref='scroll'>
        <div className='carLeft'>
          {brandList&&brandList.map((item,index)=>{
            return <div key={index} className='car-brand' id={item.letter}>
              <p>{item.letter}</p>
              <ul>
                {item.list.map((val,key)=>{
                  return <li key={key} onClick={()=>this.handleLetter(val.MasterID)}>
                    <span><img src={val.CoverPhoto} alt=''/></span>
                    <span>{val.Name}</span>
                  </li>
                })}
              </ul>
            </div>
          })}
        </div>
        {/* 划到侧边栏时显示的元素 */}
        {this.state.ele?<div className='ele'>{this.state.ele}</div>:''}
        {/* 右边列表 */}
        <div className='carRight' ref='ulList'>
        <span>#</span>
          {brandList&&brandList.map((item,index)=>{
            return <span key={index} 
            onClick={()=>this.handleChange(item.letter)}
            >{item.letter}</span>
          })}
        </div>
      {/* 侧边栏 */}
        <Letter data={this.state.carType} {...this.props} />
      </div>
    );
  };
  handeTouch(){
    //手指开始移动
    this.refs.ulList.addEventListener('touchmove',(e)=>{
      //获取移动的高度
      let Y=e.touches[0].pageY;
      //获取列表到浏览器顶部的距离
      let setY=this.refs.ulList.offsetTop;
      //获取每个li的高度
      let height=this.refs.ulList.children[0].clientHeight;
      //获取下标
      let count =Math.abs((Y-setY-height)/height)
      if(Y>=setY&&Y<=setY+this.refs.ulList.clientHeight){
        //  使用better-scroll开始滚动
      this.scroll.scrollToElement('#'+this.refs.ulList.children[Math.ceil(count)].innerHTML)
      //  让手指划过那个元素旁边显示出来那个元素
      this.setState({
        ele:this.refs.ulList.children[Math.ceil(count)].innerHTML
      })
      }
    })
    //手指松开 ele元素消失
    this.refs.ulList.addEventListener('touchend',(e)=>{
      this.setState({
        ele:''
      })  
    })
  }
}

export default CarType;