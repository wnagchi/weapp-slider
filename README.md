markdown


复制代码
# Mini Program Bidirectional Slider
![](img.png)
```javascript
        <ani-slider
        width="300"
        slider-value="{{sliderVal}}"
        min="0"
        max="100000"
        step="10"
        disabled="{{disabled}}"
        block-color="yellow"
        active-color="red"
        block-size="26"
        background-color="yellow"
        bindchange="sliderChange"
    >
        <text slot="left" class="slider_left">{{min}}</text>
        <text slot="right" class="slider_right">{{max}}</text>
    </ani-slider>

```
###Parameter Description
| Property | Type | Default Value | Required | Description |
| :-----| ----: | :----: |:----: |:----: | 
| width | Number | 320 | No | Width of the slider |
| sliderValue | Object | {min:0,max:100} | No | Focus values |
| min | Number | 0 | No | Minimum range | 
| max | Number | 100 | No | Maximum range |
| step | Number | 1 | No | Step size |
| disabled | Boolean | false | No | Whether disabled |
| active-color | String | #000000 | No | Color of the selected line | 
| background-color | String | #D4D4D4 | No | Color of the background line |
| block-size| Number | 26 | No | Size of the block | 
| bindchange| Function |  | No | Event triggered during sliding |
| bindchangeend| Function |   |No | Event triggered at the end of sliding |
