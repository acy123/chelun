import { observable, action } from "mobx";
import {getList,getType,getCarDetail,getImgList,getCarImg,getCarCList} from "../../services/example";
export default class list{
  @observable SerialID
  @observable flag
  @observable data=[]
  // @observable type=['颜色','车型']
  constructor(){
    this.SerialID=localStorage.getItem('SerialID');
    this.flag=false
  }
//获取车的种类
  @action async getListType() {
    const data = await getList();
      return data.data
  }
  //判断车系的显示隐藏
  @action async show(type){
    this.flag=type
  }
  //获取车型
  @action async getCarType(MasterID){
    const data=await getType(MasterID)
    return data.data
  }
  //跳转详情 获取详情信息
  @action async getDetail(id){
    this.SerialID=id;
    const data=await getCarDetail(id);
    return data.data
  }
  //跳转img页面 获取所有img
  @action async getImg(id){
    this.SerialID=id;
    this.data=await getCarImg(this.SerialID);
    Replace(this.data)
  };
   //获取对应颜色的车
   @action async getCarColorList(id){  
    console.log(id)
    let obj={
      ColorID:id,
      SerialID:this.SerialID,
    }
    this.data=await getCarCList(obj);
    console.log(this.data)
    Replace(this.data)
  }
  // @action async setTypeColor(TypeColor){ 
  //   this.type[0]=localStorage.getItem('CarTypeColor');
  // };
  //获取图片列表
  @action async ImgList(itemId){
    let obj={
      SerialID:this.SerialID,
      ImageID:itemId
    }
    const data=await getImgList(obj)
    return data.data.List
  };
  
}
function Replace(data){
  data.map(item=>{
    item.List.map((item) => {
      item.Url	 = item.Url.replace(/\{0\}/g, '3')
        return item
        })
        return item
    })
}