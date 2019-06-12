
import React, { Component } from 'react';
import Img from '@/assets/timg.jpg'
import './withLoading.scss'


export default Component=>{
  return class extends Component{
		// eslint-disable-next-line no-useless-constructor
		constructor(props){
				super(props)
		}
		render(){		
			return (
			<>
				{super.render()}
				{this.props.ShowLoading.flag?<div className='loading'>
						<img src={Img} alt=""/>
				</div>:null}
			</>
		)
	}
}
}