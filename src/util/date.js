export const calcDate = (date1, date2) => {
  var date3 = date2 - date1

  var days = Math.floor(date3 / (24 * 3600 * 1000))

  var leave1 = date3 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))

  var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))

  var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  var seconds = Math.round(date3 / 1000)
  return {
    leave1,
    leave2,
    leave3,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

/**
 * 日期格式化
 */
export function dateFormat(date) {
  let format = 'yyyy-MM-dd hh:mm:ss'
  if (date !== 'Invalid Date') {
    var o = {
      'M+': date.getMonth() + 1, // month
      'd+': date.getDate(), // day
      'h+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      'S': date.getMilliseconds() // millisecond
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1,
          RegExp.$1.length === 1 ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return format
  }
  return ''
}

export function getDateWeek(date) {
  var todayDate = new Date(date);
  var date = todayDate.getDate();
  var month = todayDate.getMonth() + 1;
  var year = todayDate.getYear();
  var dateweek = "";
  switch (todayDate.getDay()) {
    case 0:
      dateweek += "星期日";
      break;
    case 1:
      dateweek += "星期一";
      break;
    case 2:
      dateweek += "星期二";
      break;
    case 3:
      dateweek += "星期三";
      break;
    case 4:
      dateweek += "星期四";
      break;
    case 5:
      dateweek += "星期五";
      break;
    case 6:
      dateweek += "星期六";
      break;
  }
  return dateweek;
}


Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}

/**
 * 日期格式化
 */
export function dateFormatNew(date,format) {
  var todayDate = new Date(date);

  var result = todayDate.format(format);
  return result;
}
