/*const  { InstallProvider, defaultCallbackFailure } = require('@slack/oauth');
const { createEventAdapter } = require('@slack/events-api');
const { createMessageAdapter } = require('@slack/interactive-messages')
const YahooFantasy = require('yahoo-fantasy');
const { createServer } = require('http');
*/
const { App } = require("@slack/bolt");
const port = process.env.PORT || 3000;

const app = new App({
    token: BOT_TOKEN,
    signingSecret: SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: SOCKET_TOKEN
});
/*
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
const slackEvents = createEventAdapter(slackSigningSecret, 
);
const slackInteractions = createMessageAdapter(slackSigningSecret);

slackEvents.on('message', (event, respond) => {
    console.log(`Recieved a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);

});

(async () => {
   const eventServer = await slackEvents.start(port);
   console.log(`Listening for events on ${eventServer.address().port}`);
})().catch(() => {
    console.log('Catch warning')
});
(async () => {
    const interactServer = await slackInteractions.start(port);
    console.log(`Listening for events on ${interactServer.address().port}`);
 })().catch(() => {
    console.log('Catch warning')
});

(async () => {
    server.listen(port);
})().catch(() => {
    console.log('Catch warning')
});
*/

app.command("/hello", async({command, ack, say}) => {
    try{
        await ack();
        let txt = command.text;
        if (txt == null){
            say(txt + "Hello World");
        }

    }
    catch(error){
        console.log("err");
        console.log(error);
    }
});
app.start(port);
console.log("Ran");