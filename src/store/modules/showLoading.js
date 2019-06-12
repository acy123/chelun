import {observable,action} from 'mobx'

export default class showLoading {
    @observable flag=true

    @action changeFlag(){
        this.flag=false
    }
}