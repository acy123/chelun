import React, { Component } from 'react';
import  './App.scss';
import CarType from './views/CarType';
import {Redirect,Route,BrowserRouter,Switch} from 'react-router-dom';
import CarDetail from './views/carDetail';
import Images from './views/Img';
import Color from './views/color';
import Quotation from './views/quotation';
import Type from './views/Type';
import ImgType from './views/imgType';
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {  };
  };
  render(){
    return (
        <BrowserRouter>
          <Switch>
            <Route path='/official' component={CarType}></Route>
            <Route path='/car/:id' component={CarDetail}></Route>
            <Route path='/img' component={Images}></Route>
            <Route path='/color' component={Color}></Route>
            <Route path='/quotation' component={Quotation}></Route>
            <Route path='/type' component={Type}></Route>
            <Route path='/ImgType' component={ImgType}></Route>
            <Redirect exact to='/official' from='/'></Redirect>
          </Switch>
        </BrowserRouter>
    );
  };
}

export default App;
