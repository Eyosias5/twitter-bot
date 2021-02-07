const bull = require("bull");

const someQueue = new bull("queueName", {
  redis: {},
});
const Twitter = require("twitter");
const request = require("request");

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

someQueue.process(async (job, done) => {
  console.log("job starting...");

  await TweetFile(job.data.link);

  done();
});

const TweetFile = async (link) => {
  request({ url: link, encoding: null }, (err, resp, buffer) => {
    client.post(
      "media/upload",
      { media: buffer },
      function (error, media, response) {
        if (!error) {
          // If successful, a media object will be returned.
          console.log(media);

          // Lets tweet it
          var status = {
            status: "I am a tweet",
            media_ids: media.media_id_string, // Pass the media id string
          };

          client.post(
            "statuses/update",
            status,
            function (error, tweet, response) {
              if (!error) {
                console.log(tweet);
              } else {
                console.log(error);
              }
            }
          );
        }
      }
    );
  });
};
