const  { InstallProvider, defaultCallbackFailure} = require('@slack/oauth');
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
    installationStore: {
        storeInstallation: async (installation) => {
          // Bolt will pass your handler an installation object
          // Change the lines below so they save to your database
          if (installation.isEnterpriseInstall && installation.enterprise !== undefined) {
            // handle storing org-wide app installation
            return await database.set(installation.enterprise.id, installation);
          }
          if (installation.team !== undefined) {
            // single team app installation
            return await database.set(installation.team.id, installation);
          }
          throw new Error('Failed saving installation data to installationStore');
        },
        fetchInstallation: async (installQuery) => {
          // Bolt will pass your handler an installQuery object
          // Change the lines below so they fetch from your database
          if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
            // handle org wide app installation lookup
            return await database.get(installQuery.enterpriseId);
          }
          if (installQuery.teamId !== undefined) {
            // single team app installation lookup
            return await database.get(installQuery.teamId);
          }
          throw new Error('Failed fetching installation');
        },
        deleteInstallation: async (installQuery) => {
          // Bolt will pass your handler  an installQuery object
          // Change the lines below so they delete from your database
          if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
            // org wide app installation deletion
            return await database.delete(installQuery.enterpriseId);
          }
          if (installQuery.teamId !== undefined) {
            // single team app installation deletion
            return await database.delete(installQuery.teamId);
          }
          throw new Error('Failed to delete installation');
        },
      },
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