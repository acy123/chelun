import { observable, action } from "mobx";
import {getColor} from "../../services/example";

export default class list{
  @observable SerialID
  constructor(){
      this.SerialID=localStorage.getItem('SerialID')
    }
  
    //获取颜色
  @action async getCarColor(id){
    this.SerialID=id
    const data=await getColor(this.SerialID)
    let lists=[];
    let list=Object.values(data).map((val,key)=>{
        return val
      })
    Object.keys(data).map((item,index)=>{
      return lists.push({
        year:item,
        list:list[index]
      })
      })
      lists.sort((a,b)=>{
        return b.year-a.year
    })
  return lists
  };
 
}