const  { InstallProvider } = require('@slack/oauth');
const { createEventAdapter } = require('@slack/events-api');
const { createMessageAdapter } = require('@slack/interactive-messages')
const YahooFantasy = require('yahoo-fantasy');
const { createServer } = require('http');

const port = process.env.PORT || 8080;

const yf = new YahooFantasy(
    process.env.APPLICATION_KEY,
    process.env.APPLICATION_SECRET
);
const installer = new InstallProvider({
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    stateSecret: 'current-state'
});
const server = createServer((req, res) => {
    if (req.url === '/slack/oauth_redirect'){
        installer.handleCallback(req, res);
    }
})
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret, {
    waitForResponse: true
});
const slackInteractions = createMessageAdapter(slackSigningSecret);

slackEvents.on('message', (_event, respond) => {
    console.log('Recieved a message event: user ${event.user} in channel ${event.channel} says ${event.text}');
    respond();
});

(async () => {
    server = await slackEvents.start(port);
    console.log('Listening for events on ${server.address().port}');
});

server.listen(port);
console.log("Ran");