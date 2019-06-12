import React, { Component } from 'react';
import './index.scss';
import { inject, observer } from 'mobx-react';
@inject ('Quotation')
@observer
class City extends Component {
	constructor(props) {
		super(props);
		this.state = {
			city:[],
			CityID:''
		 };
	}	
	render() {
		let {city}=this.props;
		return (
			<div className={this.props.Quotation.flagP?'city city_active':'city'} onClick={()=>this.handeHide()}>
				<ul className='cityList'>
					{city.map(item=>{
						return <li key={item.CityID} 
						data-id={item.CityID}
						onClick={()=>this.handleCity(item.CityID,item.CityName)}
						>{item.CityName}</li>
					})}
				</ul>
			</div>
		);
	};
	
	async	handleCity(CityID,CityName){
		//获取车的Id
		let carID=localStorage.getItem('carID')
		await this.props.Quotation.getQuotation(CityID,CityName,carID);
		this.props.Quotation.setFlag(false);
		this.props.Quotation.setCity(false);
	}
	handeHide(){
		this.props.Quotation.setCity(false);
	}
}

export default City;