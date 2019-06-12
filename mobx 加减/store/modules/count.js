import { observable, action } from "mobx";

export default class Count{ 
    @observable count;

    // 初始化
    constructor(){
        this.count = 1000;
    }

    @action changeCount(type){
        type=='+'? this.count++: this.count--;
    }
}   