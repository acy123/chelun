import React, { Component } from 'react';
import './index.scss';
import { inject, observer } from 'mobx-react';
@inject ('Quotation')
@observer
class Daolog extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className='daolog'>
				<div className='alert-content'>
					<div className='wrap'>
						<img src={this.props.Quotation.msg.src?this.props.Quotation.msg.src:''} alt=''/>
						<span className='alert-title-sub'>{this.props.Quotation.title?this.props.Quotation.title:this.props.Quotation.msg.result}</span>
						<span className='alert-title'>{this.props.Quotation.msg.msg}</span>
						<span className='alert-ok' onClick={()=>this.handeHide()}>{this.props.Quotation.msg.sure?this.props.Quotation.msg.sure:'好'}</span>
					</div>
				</div>
			</div>
		);
	}
	handeHide(){
		this.props.Quotation.alertFlag(false)
	}
}

export default Daolog;