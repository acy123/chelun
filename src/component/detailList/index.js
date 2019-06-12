import React, { Component } from 'react';
import './index.scss';
import { inject, observer } from 'mobx-react';
@inject ('Quotation')
@observer
class index extends Component {
  constructor(props) {
      super(props);
      this.state = {  };
  }
  render() {
      this.props.list.sort((a,b)=>{
        //排量升序
        if(a.exhaust!==b.exhaust){
            return a.exhaust-b.exhaust
        }else{
          //发动机升序
          if(a.max_power!==b.max_power){
            return a.max_power-b.max_power
          }else{
            //吸气方式排序
            if(a.inhale_type!==b.inhale_type){
              return a.inhale_type<b.inhale_type
            }else{
              //年份降序
              return b.market_attribute.year-a.market_attribute.year
            }
          }
        }
      });
      this.props.list.forEach(item=>{
        item.type=`${item.exhaust_str}/${item.max_power_str} ${item.inhale_type}`
      })
      //合并参数相同的车型
      let NewList=[];
      this.props.list.forEach(item=>{
        let index=NewList.findIndex(val=>val.type===item.type);
        if(index===-1){
          NewList.push({
            type:item.type,
            list:[item]
          })
        }else{
          NewList[index].list.push(item)
        }
      });
      return (
        <div className='carList'> 
        {NewList?NewList.map((item,index)=>{
          return < div key={index}> <p>{item.type}</p>
          {item.list.map((val,key)=>{
            return <ul key={key}>
            <li>
              <p>{val.market_attribute.year} 款 {val.car_name}</p>
              <p>{val.horse_power}马力 {val.gear_num}挡{val.trans_type}</p>
              <p><span>指导价{val.market_attribute.dealer_price_max}</span><span>{val.market_attribute.dealer_price_min}</span></p>
              <button data-hover='hover' data-id={val.car_id} onClick={()=>this.handeleQuotation(NewList,val.car_id)}>询问底价</button>
            </li>
          </ul>
          })}
          </div>
        }):null}
      </div>
    );
  };
  //点击询问低价 跳转页面
  handeleQuotation(NewList,carID){ 
    localStorage.setItem('carID',carID)
    this.props.history.push(`/quotation`);
    this.props.Quotation.getCityId();
    localStorage.setItem('NewList',JSON.stringify(NewList));
    
  }
}

export default index;