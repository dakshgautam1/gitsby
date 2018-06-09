'use strict';

const getTodayDateTime = () => {
  let date = new Date();  
  let options = {  
      weekday: "long", year: "numeric", month: "short",  
      day: "numeric", hour: "2-digit", minute: "2-digit"  
  };  
  
  return date.toLocaleTimeString("en-us", options);
}


module.exports = {
  getTodayDateTime
}

