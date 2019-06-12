import { observable, action } from "mobx";
import {getIdCity,QuotationCar,getProv,getcity,inquirPrice} from "../../services/example";
export default class list{
  // @observable  newList
  @observable flag=false
  @observable flagP=false
  @observable CityName=''
  @observable CityID=''
  @observable data={}
  @observable hide=false
  @observable title=''
  @observable msg={}
  //获取城市Id
  @action async getCityId(){ 
      const data=await getIdCity();
      return data.data
    };
    //判断省份显示隐藏
  @action setFlag(type){
    this.flag=type
  };
  //判断城市的显示隐藏
  @action setCity(type){
    this.flagP=type
  };
  //把详情页的列表保存
  // @action async setQuotation(NewList){
  //   this.newList=NewList;
  // }
  //跳转询问低价页面
  @action async getQuotation(CityID,CityName,carID){
    this.CityName=CityName;
    this.CityID=CityID;
    let Obj={
      carId: carID,
      cityId:CityID
    }
    const data=await QuotationCar(Obj)
    data.list.map(item=>{
      return item.flag=false;
    })
   this.data=data
  };
  //获取省份
  @action async getProvince(){
    const data=await getProv();
    return data.data
  };
  //获取城市
  @action async getCity(CityID){
    const data=await getcity(CityID);
    return data.data
  };
  //选中
  @action async check(index){
    if(this.data.list[index].flag){
      this.data.list[index].flag=!this.data.list[index].flag
    }else{
      this.data.list[index].flag=true
    }
  };
  //显示弹框
  @action alertFlag(tit){
    this.hide=!this.hide
    this.title=tit
  }
  //询最低价接口
  @action async enquiry(obj,msg){
    await inquirPrice(obj)
    this.msg=msg
    this.hide=true;
  }
}



