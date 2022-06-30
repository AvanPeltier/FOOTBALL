const  {App} = require('../node_modules/@slack/bolt');
const express = require('express');
const cors = require('cors');
require('../node_modules/dotenv').config({path: 'SlackSecrets.env'})
var commands = require('./commands/commands.js')
const port = process.env.PORT || 3000;

//const yahooApp = express();
var command = new commands();
const app = new App({
    token: process.env.BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.APP_TOKEN,

});


app.message('List Teams', async ({message, say}) => {
    await say('Searching...');
    var teams = await command.getTeams();
    console.log(`${Object.entries(teams)}`);
    await say(`The teams from the league are ${teams}`);
});

(async () => {
    await app.start(port)
    console.log('Running')
})().catch(() => {
    console.log('Catch warning')
});
/*
yahooApp.use(cors());
yahooApp.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});
yahooApp.use(express.json());
yahooApp.use(express.urlencoded({extended: false}));

yahooApp.get('/api', function(req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message": "Custom Server running"}');
});

yahooApp.listen(5000, function(){
    console.log(`Listening on port ${5000}`);
});

yahooApp.use((req, res, next) => {
    req = '/yahoo';
    res.set(yahooRouter);
    next();
});*/
