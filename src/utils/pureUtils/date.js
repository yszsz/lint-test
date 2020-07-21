import moment from 'moment';

const FORMAT = {
  DATE: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
};

// 转换为指定的格式，date支持number,moment, format等格式，参考 https://momentjs.com/docs/#/parsing/
export function toString(date, format) {
  if (date == null || date === undefined) {
    return '';
  }
  if (!(date instanceof moment)) {
    date = moment(date);
  }
  return date.format(format);
}

// 转换为日期格式
export function toDateString(date) {
  return toString(date, FORMAT.DATE);
}

// 转换为日期时间格式
export function toDateTimeString(date) {
  return toString(date, FORMAT.DATETIME);
}
