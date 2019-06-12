import { autorun } from "mobx";
import list from './modules/getList';
import car from './modules/getColor';
import quotation from './modules/quotation';
import showLoading from './modules/showLoading'
const List=new list();
const Car =new car();
const Quotation =new quotation();
const ShowLoading=new showLoading()
autorun(()=>{
})
export default {
    List,
    Car,
    Quotation,
    ShowLoading
}