import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './index.scss'
@inject ('Quotation')
@observer
class QuotationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    let {list}=this.props;
    return (
      <div className='dealer-info'>
       <p className='tip'>选择报价经销商</p>
       <ul>
        {list&&list.map((item,index)=>{
          return <li key={item.dealerId} data-hover='hover' 
          data-id={item.dealerId}
          ref='chack'
          className={item.flag?'active':''}
           onClick={()=>this.handleChack(index)}
           ><p>
                <span>{item.dealerShortName}</span>
                <span>{parseInt(`${item.promotePrice}`)}万</span>
              </p>
              <p>
                <span>{item.address}</span>
                <span>售{item.saleRange}</span>
              </p>
            </li>
          })}
        </ul>
      </div>
    );
  }
  handleChack(index){
  this.props.Quotation.check(index)

  }
}

export default QuotationList;