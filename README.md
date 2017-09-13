# jQuery-jcDate说明
基于jQuery-jcDate完善修改
# jQuery-jcDate示例
- **首先引入库相关的.css .js文件**
```js
<link rel="stylesheet" type="text/css" href="../src/jcDate.css" media="all" />
<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.js" charset="utf-8"></script>
<script type="text/javascript" src="../src/jQuery-jcDate.js" charset="utf-8"></script>
```
- **html input元素**
```js
<input class="jcDate"/>
```
- **控件初始化**
```js
$(".jcDate").jcDate({
        Class : "", //为input注入自定义的class类（默认为空）
        Default: "today", //设置默认日期（默认为当天）
        Event : "click", //设置触发控件的事件，默认为click
        Speed : 100,    //设置控件弹窗的速度，默认100（单位ms）
        Left : 0,       //设置控件left，默认0
        Top : 22,       //设置控件top，默认22
        Format : "-",   //设置控件日期样式,默认"-",效果例如：XXXX-XX-XX
        DoubleNum: true, //设置控件日期月日格式，默认true,例如：true：2015-05-01 false：2015-5-1
        Timeout : 100,   //设置鼠标离开日期弹窗，消失时间，默认100（单位ms）
        OnChange: function() { //设置input中日期改变，触发事件，默认为function(){}
            console.log('num change');
        }
	});
```