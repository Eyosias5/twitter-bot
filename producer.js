const bull = require("bull");

const someQueue = new bull("queueName");

module.exports = function addJob(data, delay) {
  someQueue.add(
    { link: data },
    {
      delay,
    }
  );
};
