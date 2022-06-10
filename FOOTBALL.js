const  { InstallProvider, defaultCallbackFailure } = require('@slack/oauth');
const { createEventAdapter } = require('@slack/events-api');
const { createMessageAdapter } = require('@slack/interactive-messages')
const YahooFantasy = require('yahoo-fantasy');
const { createServer } = require('http');

const port = process.env.PORT || 3000;
/*const host = 'http://football-csh/FOOTBALL';
const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("Server")
};
const httpServer = http.createServer(requestListener);
*/
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
});
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret, 
);
const slackInteractions = createMessageAdapter(slackSigningSecret);
const eventServer = createServer(slackEvents.requestListener());


slackEvents.on('message', (event) => {
    console.log(`Recieved a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);

});
/*(async () => {
    const interactServer = await slackInteractions.start(3001);
    console.log(`Listening for events on ${interactServer.address().address}`);
 })().catch(() => {
    console.log('Catch warning')
});
*/
/*
(async () => {
    
})().catch(() => {
    console.log('Catch warning')
});
*/
eventServer.listen(port, () => {
    console.log(`Listening for events on ${eventServer.address()}`);
});
console.log("Ran");