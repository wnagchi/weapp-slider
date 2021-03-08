// index.js
// 获取应用实例
const app = getApp()
Page({
  data:{
		_sliderValue:[30000,500000],//外部带入的当前值
		_sliderStep:30,
	},
	onReady(){

	},

	sliderChange(e){
		let val=e.detail.value
		console.log(val)
		this.setData({
			min:val[0],
			max:val[1]
		})
	}
})
