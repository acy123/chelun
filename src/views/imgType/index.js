import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './index.scss'
@inject ('Quotation')
@observer
class ImgType extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list:[],
			year:[],
			TabIndex:0
		};
	}
	componentDidMount(){
		let list=JSON.parse(localStorage.getItem('NewList'));
		list.forEach(item=>{
			item.list.forEach(val=>{
				if(this.state.year.indexOf(val.market_attribute.year)===-1){
					this.state.year.push(val.market_attribute.year)
				}
			})
		})
		this.setState({
			list:JSON.parse(localStorage.getItem('NewList'))	
		})	
	}
	render() {
		let {list,year}=this.state;
		return (
			<div className='imgType'>
			<p data-hover='hover'>全部类型</p>
				<div>
					<div className='c_type'>
						{year.map((item,index)=>{
							return <span key={index} className={this.state.TabIndex===index?'active':''} onClick={()=>this.handleTab(index,item)}>{item}</span>
						})}
					</div>
					<div>
						{list&&list.map((item,index)=>{
							return <div key={index}>
							<ul>
								<p className='tip'>{item.type}</p>
								{item.list.map((val,key)=>{
									return <li key={key} data-id={val.car_id}
									onClick={()=>this.handele(val.car_id)}
									>
											<p><span>{val.market_attribute.year} 款 {val.car_name}</span><span>{val.market_attribute.dealer_price_min}</span></p>
											<p><span>{val.horse_power}马力 {val.gear_num}挡{val.trans_type}</span><span>指导价{val.market_attribute.dealer_price_max}</span></p>
										</li>
								})}
								</ul>
							</div>
						})}
					</div>
				</div>
			</div>
		);
	};
	handleTab(index,year){
		 this.state.list.map(val=>{
			return val.list.filter(item=>{
				return item.market_attribute.year===year
			})
		})
		console.log(this.state.list)
		this.setState({
			TabIndex:index,
			list:this.state.list
		});
		
	}
	handele(id){
		localStorage.setItem('carID',id)
		// this.props.history.push(`/quotation`)
	}
}

export default ImgType;