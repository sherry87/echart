function chartOptions() {
	var option = {
		linkStyle: {
			type: "curve"
		},
		grid: {
			y2: 80
		},
		tooltip: {
			trigger: 'axis',
			formatter: function(params) {
			 var res =  params[0].name;
              for (var i = 0, l = params.length; i < l; i++) {
                  res += '<br/>' + params[i].seriesName + ' : ' + params[i].value;
              }
              return res;
			}
		},
		legend: {},
		xAxis: [{
			type: 'category',//
			boundaryGap:false,//
			axisLabel: {
				rotate:30,//横轴倾斜度
				interval:5
			},
			data:[]
		}],
		yAxis: [{
			type: 'value'
		}],
		series: []
	};

	$.ajaxSettings.async = false; 
	$.getJSON("js/test/timeLine.json", function(data) {
		var legendData = ['CPU', '内存', '网卡'];
		if(data != null) {
			option.legend.data = legendData;
			option.xAxis[0].data=xAxisData(data.cpus[0].records);
			option.series.push(seriesArr(data.cpus[0].records,legendData[0]));
			option.series.push(seriesArr(data.mems[0].records,legendData[1]));
			option.series.push(seriesArr(data.netCards[0].records,legendData[2]));
		}
		
	});
	return option;
	
}

function xAxisData(recordsArr){
	var data=[];
	if(recordsArr!=null&&recordsArr.length>0){
		for(var i=0;i<recordsArr.length;i++){
			var date = dateFormate(recordsArr[i].day);
			var str = (date.getMonth()+1)+"月"+date.getDate()+"日"
			data.push(str+" "+formateNum(date.getHours())+":"+formateNum(date.getMinutes()));
		}
	}
	return data;
}
function seriesArr(recordsArr,name){
	var ser = {
			name: name,
			type: 'line',
			showAllSymbol: true,
			symbol: "emptyCircle",
			symbolSize: 4,
			smooth: true,
			data: []
		}
	if(recordsArr!=null&&recordsArr.length>0){
		for(var i=0;i<recordsArr.length;i++){
			ser.data.push(parseInt(recordsArr[i].ratio));
		}
	}
	return ser;
}



$(function(){
	require.config({
		paths: {
			echarts: 'js/echarts' //echarts.js路径
		}
	});
	
	var opt = chartOptions();
	require(
		[
			'echarts',
			'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
		],
		function(ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('main'));
			// 为echarts对象加载数据 
			myChart.setOption(opt);
		}
	);
});
