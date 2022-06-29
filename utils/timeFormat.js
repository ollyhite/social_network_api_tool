const moment = require('moment')

module.exports = {
  format_date: (date) => {
    console.log(date);
    return `${moment.utc(date).format('MM/DD/YYYY HH:MM:SS')}`;
  },
  format_date2: (date) => {
    console.log(date);
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear()}`;
  }
};