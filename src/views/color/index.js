import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './index.scss'
@inject ('Car','List')
@observer
class Color extends Component {
	constructor(props) {
		super(props);
		this.state = {
				data:[],
				yearIndex:0,
				res:{}
		};
	}
	componentDidMount(){
		let id=localStorage.getItem('SerialID')
		this.props.Car.getCarColor(id)
		.then(res=>{
			this.setState({
					data:res,
					res:res[0]
			})
		});
	};
	handleYear(index,year){
		this.setState({
			yearIndex:index,
			res:this.state.data[index]
		})
	};
	//点击颜色带着参数返回Img页面
	handeAllColor(ColorId,Name){
		if(Name==='全部颜色'){
			sessionStorage.setItem('CarTypeColor',JSON.stringify({id:'',val:Name}));
			let id=localStorage.getItem('SerialID');
			this.props.List.getImg(id);
			this.props.history.push(`/img`);
		}else{
			sessionStorage.setItem('CarTypeColor',JSON.stringify({id:ColorId,val:Name}))
			this.props.List.getCarColorList(ColorId)
			this.props.history.push(`/img`);
		}	
	}
	render() {
		let {data,res} =this.state;
    return (
			<div className='color'>
				<p data-hover='hover' onClick={()=>this.handeAllColor('','全部颜色')}>全部颜色</p>
				<div>
					<p className='c-type'>
					{data&&data.map((item,index)=>{
						return <span key={index} onClick={()=>this.handleYear(index,item.year)} className={this.state.yearIndex===index?'active':''}>{item.year}</span> 
					})}
					</p>
					<ul>
						{res.list?res.list.map(item=>{
							return <li key={item.ColorId} data-id={item.ColorId} onClick={()=>this.handeAllColor(item.ColorId,item.Name)}>
								<span style={{backgroundColor:`${item.Value}`}}></span>{item.Name}
							</li>
						}):''}
					</ul>
				</div> 
		</div>
		);
	};
}

export default Color;