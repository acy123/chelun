import React, { Component } from 'react';
import './index.scss';
class ImgList extends Component {
	constructor(props) {
		super(props);
		this.state = {  };
	}
	render() {
		let {ImgLists} =this.props;
		return (
			<div>
				<ul className='img-list' ref='wrap'> 
					{ImgLists?ImgLists.map((item,index)=>{
						return <li key={index}>
						<img src={item.Url} alt='' 
						/>
						</li>
					}):null}
					<div id='drap' className='drap' ref="wrapper" >
						<img src='http://www.sucaijishi.com/uploadfile/2014/0524/20140524124238403.gif' alt='' />
						<span>加载中....</span>
					</div>
				</ul>
			</div>
		);
	};
	componentDidMount(){
		const wrapper=this.refs.wrapper;
	}
}


export default ImgList;