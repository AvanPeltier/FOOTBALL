const  { InstallProvider } = require('@slack/oauth');
const { createEventAdapter } = require('@slack/events-api');
const { createMessageAdapter } = require('@slack/interactive-messages')
const YahooFantasy = require('yahoo-fantasy');


const yf = new YahooFantasy(
    process.env.APPLICATION_KEY,
    process.env.APPLICATION_SECRET
);
const installer = new InstallProvider({
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    stateSecret: 'current-state'
});
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);
const slackInteractions = createMessageAdapter(slackSigningSecret);

slackEvents.on('message', (event) => {
    console.log('Recieved a message event: user ${event.user} in channel ${event.channel} says ${event.text}');
    MessageChannel("Recieved a message event: user ${event.user} in channel ${event.channel} says ${event.text}");
});

(async () => {
    const server = await slackEvents.start(8080);
    console.log('Listening for events on ${server.address().port}');
});


console.log("Ran");