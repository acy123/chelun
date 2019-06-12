import CarType from "../../views/CarType";
import CarDetail from "../../views/CarType/carDetail";
import Quotation from "../../views/CarType/quotation";

const route=[
	{
		path:'/official',
		component:CarType,
		route:[
			{
				path:'/official/car/:id',
				component:CarDetail,
				},
			{
				path:'/official/quotation',
				component:Quotation
			}
		]
	} 
];
export default route;
