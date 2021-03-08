
Component({

    properties: {
      _sliderCurrValue: {
        type: Array,
        value: [0, 60000]
      },
      _sliderLimitValue: {
          type: Array,
          value: [0, 600000]
      },
      _sliderStep:Number
    },

    data: {
        _sliderMinLeft: 0,//滑块实际显示位置
        _sliderMaxLeft: 340 - 26,//滑块实际显示位置
        _slider: [0, 340 - 26],//slider的最大实际范围和最小实际范围
    },

    attached(){
        this.initSlider()
    },
    methods: {
        mySet(data,log=false){
            this.setData(data)
            if(!log) return
            clearTimeout(this.setLog)
            this.setLog=setTimeout(_=>{
                console.log(...Object.keys(data),this.data)
            },500)
        },
        initSlider() {
            if (this.data._sliderLimitValue[0] == this.data._sliderLimitValue[1]){
                throw new Error('极限最大值和最小值不能相等')
            }
            //避免除不尽问题初始化时不传出移动后的值
            this.emitChange()
            this.mySet({enAnimation: true})
            this.calculateLeft()
            setTimeout(_=>{
                this.mySet({enAnimation: false})
            },300)
            // this.emitChange()
        },

        calculateLeft() {//根据外部带入的当前值计算滑块位置
            console.log(this.data._sliderCurrValue)
            if (this.data._sliderCurrValue[0]==undefined||this.data._sliderCurrValue[1]==undefined){
                throw new Error('带入的值不完整')
            }
            let value = this.data._sliderCurrValue
            this.mySet({
                _sliderMinLeft: this.conversionValue(value[0], true),
                _sliderMaxLeft: this.conversionValue(value[1], true)
            })
            this.calculateLine()
        },

        calculateLineLeft() {
            return this.data._sliderMinLeft < this.data._sliderMaxLeft
        },

        calculateLine() {//计算线

            let _sliderLineLeft = this.calculateLineLeft() ?
                this.data._sliderMinLeft :
                this.data._sliderMaxLeft;
            let _sliderLineWidth = Math.abs(this.data._sliderMaxLeft - this.data._sliderMinLeft)
            this.mySet({
                _sliderLineLeft: _sliderLineLeft + 13,
                _sliderLineWidth
            })
        },

        conversionValue(value, type) {//带入值和滑块left之间转换
            let romValue = (this.data._slider[1] - this.data._slider[0])
            let coverValue = (this.data._sliderLimitValue[1] - this.data._sliderLimitValue[0])
            return type ?
                (romValue / coverValue * value) :
                Math.round(coverValue / romValue * value)
        },

        emitChange() {
            if(this.data.enAnimation) return
            this.triggerEvent('change',{value:this.data._sliderCurrValue})
        },
        sliderChange(e) {//滑动小值滑块
            const left = e.detail.x;
            const type=e.currentTarget.dataset.type
            if(type=='min'){
                this.data._sliderMinLeft = left;
            }else{
                this.data._sliderMaxLeft = left;
            }
            this.calculateLine();
            if (type=='min'?this.calculateLineLeft():!this.calculateLineLeft()) {
                this.data._sliderCurrValue[0] = this.conversionValue(left, false)
            } else {
                this.data._sliderCurrValue[1] = this.conversionValue(left, false)
            }
            this.emitChange()
            // this.mySet({_sliderCurrValue:this.data._sliderCurrValue})

        },

    }
})
