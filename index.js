const addJob = require("./producer");
var relativeTime = require("dayjs/plugin/relativeTime");

var dayjs = require("dayjs");
dayjs.extend(relativeTime);
const date1 = dayjs("2021-02-06");

const daysLeft = date1.diff(dayjs(), "day");

dates = [];
delay = 0;

Array.from(Array(daysLeft).keys())
  .reverse()
  .forEach((day) => {
    dates.push({
      delay: delay,
      link: `https://twitter-bot-s3.s3.ap-south-1.amazonaws.com/${day}.png`,
    });
    delay = delay + 300000;
  });

dates.forEach((date) => {
  addJob(date.link, date.delay);
});
