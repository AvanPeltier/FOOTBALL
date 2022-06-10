const  { FileInstallationStore } = require('@slack/oauth');
const  {App} = require('@slack/bolt');
const { createEventAdapter } = require('@slack/events-api');
const { createMessageAdapter } = require('@slack/interactive-messages')
const YahooFantasy = require('yahoo-fantasy');
const { createServer } = require('http');
require('dotenv').config({path: 'SlackSecrets.env'})


const port = process.env.PORT || 3000;
//const host = 'localhost';
/*const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("Server")
};
const httpServer = http.createServer(requestListener);
*/
const yf = new YahooFantasy(
    process.env.APPLICATION_KEY,
    process.env.APPLICATION_SECRET
);

const app = new App({
    token: process.env.BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.APP_TOKEN,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    stateSecret: 'state',
    scopes: ['app_mention', 'message.channels', 'message.im', 'message.mpim'],
    //installationStore: new FileInstallationStore()
});

app.message('hello', async ({message, say}) => {
    await say(`I'm alive, Howdy <@${message.user}>`);
});

/*
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);
const slackInteractions = createMessageAdapter(slackSigningSecret);


slackEvents.on('message', (event) => {
    console.log(`Recieved a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);

});
(async () => {
    const eventServer = await slackEvents.start(3000);
    console.log(`Listening for events on ${eventServer.address().port}`);
 })().catch ( (error) => {
    console.log(`Error: ${error}`)
});
*/

(async () => {
    await app.start(3000)
    console.log('Running')
})().catch(() => {
    console.log('Catch warning')
});

/*eventServer.listen(port, host, () => {
    console.log(`Listening for events on ${eventServer.address().address}`);
});*/
/*
server.listen(8080)*/
console.log("Ran");