function dateObject(dateStr){
	var dt={};
	var arr = dateStr.split(" ");
	var ymd = arr[0].split("-");
	var hms = arr[1].split(":");
	dt.year=ymd[0];
	dt.month =ymd[1]-1;
	dt.date = ymd[2];
	dt.hour=hms[0]
	dt.minute=hms[1];
	dt.second=hms[2];
	return dt;
}
//IE8 下替换new Date
function dateFormate(dateStr){
	var dateObj = dateObject(dateStr);
	var date = new Date(dateObj.year,dateObj.month,dateObj.date,dateObj.hour,dateObj.minute,dateObj.second);
	return date;
}

function formateNum(num){
	if(num<10){
		return "0"+num;
	}
	return num;
}