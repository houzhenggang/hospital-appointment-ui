export function getYear(val) {
  return val.getFullYear()
}

export function getMonth(val, pad = 1) {
  return ((val.getMonth() + 1) + '').padStart(pad, '0')
}

export function getDate(val, pad = 1) {
  return (val.getDate() + '').padStart(pad, '0')
}

export function getHours(val, pad = 1) {
  return (val.getHours() + '').padStart(pad, '0')
}

export function getMinutes(val, pad = 1) {
  return (val.getMinutes() + '').padStart(pad, '0')
}

export function getSeconds(val, pad = 1) {
  return (val.getSeconds() + '').padStart(pad, '0')
}

export function valueFormat(val, valueFormat) {
  if (val === '') {
    return ''
  }
  const value = new Date(val)
  const times = {
    yyyy: {
      text: 'yyyy',
      getTime: getYear(value)
    },
    M: {
      text: 'M',
      getTime: getMonth(value)
    },
    MM: {
      text: 'MM',
      getTime: getMonth(value, 2)
    },
    d: {
      text: 'd',
      getTime: getDate(value)
    },
    dd: {
      text: 'dd',
      getTime: getDate(value, 2)
    },
    H: {
      text: 'H',
      getTime: getHours(value)
    },
    HH: {
      text: 'HH',
      getTime: getHours(value, 2)
    },
    m: {
      text: 'm',
      getTime: getMinutes(value)
    },
    mm: {
      text: 'mm',
      getTime: getMinutes(value, 2)
    },
    s: {
      text: 's',
      getTime: getSeconds(value)
    },
    ss: {
      text: 'ss',
      getTime: getSeconds(value, 2)
    }
  }
  if (valueFormat === 'timestamp') {
    if (typeof val === 'number') {
      return +value
    }
    return ''
  } else if (typeof valueFormat === 'string') {
    const reg = /[a-zA-Z]+/g
    const result = valueFormat.match(reg)

    if (_isFormat(result, times)) {
      const unreg = /[^a-zA-Z]+/g
      const unresult = valueFormat.match(unreg)

      return getTimes({ times, unresult, result })
    }
    return ''
  } else {
    return ''
  }
}

// 判断规则是否正确
function _isFormat(val, times) {
  let is = true
  for (let i = 0, len = val.length; i < len; i++) {
    if (times[val[i]] == null) {
      is = false
      break
    }
  }
  return is
}

/**
 * [获取时间]
 * @param  {Object} options.times [格式]
 * @param  {Array}  result        [匹配的时间格式]
 * @param  {Array}  unresult      [匹配时间连接符]
 * @return {[type]}               [description]
 */
function getTimes({ times = {}, result = [], unresult = [] }) {
  let re = ''
  for (let i = 0, len = result.length; i < len; i++) {
    // console.log(times[result[i]])
    re += times[result[i]].getTime
    if (i < unresult.length) {
      re += unresult[i]
    }
  }
  return re
}
