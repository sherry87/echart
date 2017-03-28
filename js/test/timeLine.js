function chartOptions() {
	var option = {
		/*title: {
			text: '时间坐标折线图'
		},*/
		linkStyle: {
			type: "curve"
		},
		grid: {
			y2: 80
		},
		tooltip: {
			trigger: 'item',
			formatter: function(params) {
				var date = new Date(params.value[0]);
				data = date.getFullYear() + '-' +
					(date.getMonth() + 1) + '-' +
					date.getDate() + ' ' +
					date.getHours() + ':' +
					date.getMinutes();
				return data + '<br/>' +
					params.value[1];
			}
		},
		legend: {},
		xAxis: [{
			type: 'time',
			splitNumber: 12,
			min: dateFormate('2017-03-21 10:25:00'),
			max: dateFormate('2017-03-24 10:25:00'),
			axisLabel: {
				rotate:30,//横轴倾斜度
				formatter: function(params) {
					var date = params;
					data = (date.getMonth() + 1)+"月"+date.getDate() + '日  ' +date.getHours() + ":" + formateNum(date.getMinutes());
					return data;
				}
			}

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
			option.series.push(seriesArr(data.cpus[0].records,legendData[0]));
			option.series.push(seriesArr(data.mems[0].records,legendData[1]));
			option.series.push(seriesArr(data.netCards[0].records,legendData[2]));
			
		}
		
	});

	return option;
	
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
			//放入的是数组元素
			ser.data.push([dateFormate(recordsArr[i].day),parseInt(recordsArr[i].ratio)]);
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
