import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import QuotationList from '../../component/quotationList';
import Province  from '../../component/province'
import './index.scss';
import Daolog from '../../component/daolog';
import withLoading from '../../component/withLoading/withLoading'
@inject ('Quotation','ShowLoading')
@observer
@withLoading
class Quotation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			province:[],
			flag:false,
			userName:'',
			tel:'',
			carId:''
		};
	};
	componentDidMount(){
		//获取定位城市的信息
		this.props.Quotation.getCityId().then(res=>{
			localStorage.setItem('CityName',res.CityName)
			let carId= localStorage.getItem('carID')
			this.setState({
				carId:carId
			})
			this.props.Quotation.getQuotation(res.CityID,res.CityName,this.state.carId)
		})		
	}
	render() {
		let carList=this.props.Quotation.data;
		if(carList){
			this.props.ShowLoading.changeFlag()
		}
		let {province} =this.state;
		return (
			<div className='quotation'>
				<header>
					<p>可向多个商家咨询最低价，商家及时回复</p>
					<img src={require('@/assets/wen.png')} alt=''/>
				</header>
				<div className='q_content' onScroll={(e)=>this.scroll(e)}>
					<div className='q_info' onClick={()=>this.handleType()}>
						<img src={carList.details&&carList.details.serial.Picture} alt=''/>
						<div className='flex-center'>{
							carList.details&&<><p>{carList.details.serial.AliasName}</p>
							<p>{carList.details.market_attribute.year}款{carList.details.car_name}</p></>
						}
						</div>
					</div>
					<div className='self-info'>
						<p className='tip'>个人信息</p>
						<ul>
							<li>
								<span>姓名</span>
								<input maxLength="4" type='text' placeholder='输入你的真实中文姓名' value={this.state.userName} onChange={(e)=>{
									this.setState({
										userName:e.target.value
									})
								}}/>
							</li>
							<li>
							<span>手机</span>
								<input maxLength="11" type='text' placeholder='输入你的真实手机号码' value={this.state.tel} onChange={(e)=>{
									this.setState({
										tel:e.target.value
									})
								}}/>
							</li>
							<li>
							<span>城市</span>
							{/* 默认城市 */}
								<span onClick={()=>this.handleProvince()}>
								{/* 省份 */}
								{this.props.Quotation.CityID===''?localStorage.getItem('CityName'):this.props.Quotation.CityName}
								</span>
							</li>
						</ul>
						<div className='q_quotation' ref='changeTop'>
							<button data-hover='hover' onClick={()=>this.handleQuotion()}>询最低价</button>
						</div>
					</div>
					<QuotationList list={carList.list}/>
				</div>
				<Province ProvinceList={province}/>
				{this.state.flag?<footer><button data-hover='hover' onClick={()=>this.handleQuotion()}>询最低价</button></footer>:null}
				
				{this.props.Quotation.hide?<Daolog />:null}
			</div>
		);
	}
	//点击北京
	handleProvince(){
		this.props.Quotation.getProvince().then(res=>{
			this.setState({
				province:res
			})
		});
		this.props.Quotation.setFlag(true)
	};
	//跳转车的类型
	handleType(){
		let id=localStorage.getItem('carID');
		this.props.history.push(`/type/?id=${id}`)
	};
	//询最低价在滚动过程中显示在底部
	scroll(e){
		if(e.target.scrollTop>=e.target.children[2].offsetTop){
			this.setState({
				flag:true
			})
		}else{
			this.setState({
				flag:false
			})
		}
	};
	//点击询最低价
	handleQuotion(){
		let list=this.props.Quotation.data.list;
		let nearbys = this.props.Quotation.data.nearbys;
		// 经销商有没有选择
		let quotaionFlag = list.find(item=>item.flag)
		// 推荐的经销商有没有选择
		let referrer = nearbys.find(item=>item.flag)
		let str=''
		list.forEach(item=>{
				if(item.flag){
						str+=item.dealerId+','
				}
		})
		nearbys.forEach(item=>{
				if(item.flag){
					str+=item.dealerId+','
				}
		})
		str = str.slice(0,str.length-1)
		// 验证手机号
		let reg = /^1[34578]\d{9}$/
		//验证名字
		let nameReg = /^[\u4e00-\u9fa5]{2,4}$/	
		//判断参数有没有全
		if(this.state.userName===''|| !nameReg.test(this.state.userName)){
			this.props.Quotation.alertFlag('请输入真实的中文姓名')
		}else if(this.state.tel ===''||! reg.test(this.state.tel)){
			this.props.Quotation.alertFlag('请输入真实的手机号码')
		}else if(!quotaionFlag&&!referrer){
			this.props.Quotation.alertFlag('请选择经销商')
		}else{
			//将输入的姓名和电话存本地
			localStorage.setItem('msg',JSON.stringify({names:this.state.userName,tel:this.state.tel}))
			let carID=localStorage.getItem('carID')
			this.props.Quotation.enquiry({
				name:this.state.userName,
				mobile:this.state.tel,
				carid:carID,
				location:this.props.Quotation.CityName?this.props.Quotation.CityName:localStorage.getItem('CityName'),
				dealerids:str
			},{
				src:'../../assets/result.png',
				result:'询价成功',
				msg:'稍后有专业汽车顾问为你服务请保持手机畅通',
				sure:'确定'
			})
		}
	}
}


export default Quotation;