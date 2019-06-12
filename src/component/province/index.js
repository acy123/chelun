import React, { Component } from 'react';
import './index.scss';
import City from '../city';
import { inject, observer } from 'mobx-react';
@inject ('Quotation')
@observer
class Province extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fleg:false,
			CityID:'',
			city:[]
		};
	}
	render() {
		let {ProvinceList} =this.props;
		return (
			<div className={this.props.Quotation.flag?'select-city cuntent':'select-city'}>
				<div className='province'>
					<div className='loaction'>
						<p>自动定位</p>
						<p onClick={()=>this.close(false)}>{localStorage.getItem('CityName')}</p>
					</div>
					<div className='provincelist'>
						<p>省份</p>
						<ul>
							{ProvinceList&&ProvinceList.map(item=>{
								return <li key={item.CityID}
								data-id={item.CityID}
								 onClick={()=>this.province(item.CityID,true)}>{item.CityName}</li>
							})}
						</ul>
					</div>
				</div>
				<City city={this.state.city}/>
			</div>
		);
	};
	close(type){
		this.props.Quotation.setFlag(type)
	}
	province(CityID,type){
		this.props.Quotation.getCity(CityID).then(res=>{
			this.setState({
				city:res
			})
		})
		this.props.Quotation.setCity(type)
	}
}

export default Province;