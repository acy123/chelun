
const SpliceImg=(arr)=>{
	arr.map(item=>{
		item.List.map((item) => {
			item.Url	 = item.Url.replace(/\{0\}/g, '3')
				return item
				})
				return item
		})
}
export default SpliceImg