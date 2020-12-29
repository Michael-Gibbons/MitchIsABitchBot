require('dotenv').config();
const Twit = require('twit');
const CronJob = require('cron').CronJob;

var T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000,
  strictSSL: true,
})

let lastTweetID = '';
const bitchArray = [];
const getTweets = async (req, res) =>{
  await T.get('/statuses/user_timeline', {user_id:1249982359, count:1})
  .then((response) => {
    const userName = response.data[0].user.screen_name;
    const tweetId = response.data[0].id_str;
    if(lastTweetID !== tweetId){
      T.post('statuses/update', { in_reply_to_status_id: tweetId, status: `@${userName} ur a lil bitch` }, (err, data, response) => {
        console.log('done')
        console.log('tweeted, setting new tweet id');
        lastTweetID = tweetId;
      })
    }else{
      console.log('has not tweeted, checking again in 60 seconds.')
    }
  })
  .catch((error)=>console.log(error));
}
const MitchMcBitch = new CronJob(
	'0 * * * * *',
  getTweets,
	null,
	true,
	'America/Los_Angeles'
);
