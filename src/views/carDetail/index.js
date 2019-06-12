import React, { Component } from 'react';
import './index.scss';
import { inject, observer } from 'mobx-react';
import DetailList from '../../component/detailList';
import withLoading from '../../component/withLoading/withLoading';
@inject ('List','Quotation',)
@observer
class CarDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{},
      type:['全部'],
      typeIndex:0,
      CarImg:[],
      list:[]
    };
  };
   
  componentDidMount(){
    //获取地址栏Id
    let id=this.props.match.params.id;
    //获取车型的详情信息
    this.props.List.getDetail(id).then(res=>{
      res.list.forEach(item=>{
        if(this.state.type.indexOf(item.market_attribute.year)===-1){
          this.state.type.push(item.market_attribute.year)
        }
      })
      this.setState({
        list:res.list
      })
     this.setState({
       data:res
     })
   })
  };
  render() {
    let {data,typeIndex}=this.state;
    return (
      <div className="car">
        <div className='content'>
          <div className='img' onClick={()=>this.handleImg()}>
            <img src={data.CoverPhoto} data-hover='hover' alt=''/>
            <span>{data.pic_group_count}张照片</span>
          </div>
          <div className="info">
            <div className='price'>
              <p>{data.market_attribute?data.market_attribute.dealer_price:''}
              </p>
              <p>指导价{data.market_attribute&&data.market_attribute.official_refer_price}</p>

            </div>
            <div className='action'>
              <button onClick={()=>this.handleInquiry()}>
                {data.BottomEntranceTitle}
              </button>
            </div>
          </div>
          <div className='car-list'> 
            <div className='c-type'>
              {this.state.type.map((item,index)=>{
                return <span key={index} onClick={()=>this.handeList(item,index)} className={index===typeIndex?'connert':''}>{item}</span>
              })}
            </div>
            <DetailList list={this.state.list} {...this.props}/>
          </div>
        </div>
        <div className='bottom'>
          <p>询问底价</p>
          <p>本地经销商为您报价</p>
        </div>

      </div>
    );
  }
  //tab切换
  handeList(year,index){
    if(year==='全部'){
      this.setState({
        list:this.state.data.list,
        typeIndex:index
      })
    }else{
     let list= this.state.data.list.filter(item=>{
        return item.market_attribute.year===year
     })
     this.setState({
        list:list,
        typeIndex:index
     })
    }
  };
  //跳转Img页面
  handleImg(){
    this.props.history.push(`/img`);
   localStorage.setItem('SerialID',this.props.match.params.id);
   let id=this.props.match.params.id;
  //  sessionStorage.setItem('carInfo',{
  //   aliasName:'',
  //   carId:'',
  //   carName:'',
  //   colorId:'',
  //   colorName:'',
  //   id:''
  //  })
   this.props.List.getImg(id)
  }
  //跳转询问低价
  handleInquiry(){
    // this.props.history.push(`/quotation`);
    // console.log()
    // this.props.Quotation.newList.map(item=>{
    //   console.log(item)
    // })
  }
}
export default CarDetail;