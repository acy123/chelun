import React, { Component } from 'react';
import './index.scss'
import { inject, observer } from 'mobx-react';
import Img from '../../component/Img/ImgList'
@inject ('Car','List')
@observer

class Images extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ImgList:[],
		};
	}

	componentDidMount(){

		// let val=JSON.parse(sessionStorage.getItem('CarTypeColor'))
	}
	handleCar(index){
		if(index===0){
			this.props.history.push(`/color`)
			let id=localStorage.getItem('SerialID');
			this.props.Car.getCarColor(id)
		}else{
			this.props.history.push(`/ImgType`)
		}
		
	}
	render() {
		let {data}=this.props.List;
		let val=JSON.parse(sessionStorage.getItem('CarTypeColor'))
		return (
			<div className='Image'>
				<div className='flex-row tit'>

					<p data-hover='hover'onClick={()=>this.handleCar(0)}><span>{val?val.val:'颜色'}</span></p>
					<p data-hover='hover' onClick={()=>this.handleCar(1)}><span>{sessionStorage.getItem('CarType')?sessionStorage.getItem('CarTypeColor'):'车型'}</span></p>
				</div>
				<ul className='img-default'>
					{data?data.map(item=>{
					return <div key={item.Id}>
						{item.List?item.List.map((val,index)=>{
							let id=`${item.Id}`+'_'+index+'_'+`${item.Count}`
							return <li key={index} index={index} data-id={id}>
							<img alt='' src={val.Url} />
							{index===0?<div onClick={()=>this.handleShow(item.Id)}>
								<p>{item.Name}</p>
								<p>{item.Count}张></p>
							</div>:null}
							</li>
						}):null}
						</div>
					}):null}
				</ul>
			{this.state.show?<Img ImgLists={this.state.ImgList}/>:null} 
			</div>
		);
	}
	//显示Img列表
	handleShow(itemId){
		// this.setState({
		// 	show:true
		// })
		this.props.List.ImgList(itemId).then(res=>{
	// 		res.map(item=>{
	// 				item.Url= item.Url.replace(/\{0\}/g, '3')
	// 				return item
	// 		})
	// 		this.setState({
	// 			ImgList:res
	// 		})
		})
	};
	handleType(){
		
	}

}

export default Images;