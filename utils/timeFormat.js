const moment = require('moment')

module.exports = {
  format_date: (date) => {
    return `${moment.utc(date).format('MM/DD/YYYY hh:mm:ss')}`;
  },
  format_date2: (date) => {
    console.log(date);
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear()}`;
  }
};