import request from '../util/request';
//获取车辆的种类
export async function getList(){
    let data=await request('https://baojia.chelun.com/v2-car-getMasterBrandList.html')
    return data
}
//获取每种车的类型
export async function getType(params){
    let data= await request(`https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID=${params}`)
    return data
 }
 //跳转详情
 export async function getCarDetail(params){
     let data=await request(`https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID=${params}`)
     return data
 };
 //跳转图片
 export async function getCarImg(params){
    let data=await request(`https://baojia.chelun.com/v2-car-getImageList.html?SerialID=${params}`)
    return data.data
}
//获取图片列表
export async function getImgList(params){
    let data=await request('https://baojia.chelun.com/v2-car-getCategoryImageList.html',{
        params:params
    })
    return data
}
//获取颜色
export async function getColor(params){
    let data=await request(`https://baojia.chelun.com/v2-car-getModelImageYearColor.html?SerialID=${params}`)
    return data.data
}
//获取跳转的城市Id
export async function getIdCity(){
    let data=await request('https://baojia.chelun.com/location-client.html');
    return data
}
//获取询问低价的页面
export async function QuotationCar(params){
   let data=await request('https://baojia.chelun.com/v2-dealer-alllist.html',{
        params:params
    });
    return data.data
}
//获取省份
 export async function getProv(){
    let data=await request('https://baojia.chelun.com/v1-city-alllist.html');
    return data
}
//获取城市
export async function getcity(params){
    let data=await request(`https://baojia.chelun.com/v1-city-alllist.html?provinceid=${params}`);
    return data
}
// 获取询价接口
export async function inquirPrice(params){
    let data = await request('https://baojia.chelun.com/h2-submit-lowprice.html',{
        params:{...params}
    })
    return data.data
}
//获取每种颜色的车
export async function getCarCList(params){
    console.log(params)
    let data = await request('https://baojia.chelun.com/v2-car-getImageList.html',{
        params:{...params}
    })
    console.log(data)
    return data.data
}