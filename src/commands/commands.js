
const YahooFantasy = require('yahoo-fantasy')
require('dotenv').config({path: '../SlackSecrets.env'})
var express = require('express');
const { onlyCommands } = require('@slack/bolt');
var router = express.Router();
const key = process.env.LEAGUE_KEY;


/*
router.tokenCallback = function({access_token, refresh_token}) {
    return new Promise((resolve, reject) => {
        if (access_token){
            return resolve();
        }
        return reject("No access token");
    });
};
*/
yf = new YahooFantasy(
    process.env.APPLICATION_KEY,
    process.env.APPLICATION_SECRET,
);
function commands(){
    this.getTeams = async function(){
        try{
         const {teams} = await yf.league.teams(key);
            const data = teams.map(({team_key, name, roster}) => {
                
            });
            return teams;
        }
        
        catch (e){
            console.log(e);
            return;
        }
    }
/*
router.get("/auth", (req, res) => {
    router.yf.auth(res);
});
router.get("/auth/callback", (req, res) => {
    router.yf.authCallback(req, (err, authObj) => {
        if (err) {
            handleError(res, err);
            return;
        }
        if (authObj){
            console.log(authObj);
        }
        res.redirect(`http://localhost:5000/yahoo`);
    });
});

router.get("/league", async(req, res) => {
    try {
        let id = LEAGUE_ID
        const meta = await router.yf.league.meta(id);
        console.log(`${res.json(meta)}`);
    }
    catch (e){
        console.log(`${res.json({msg: e})}`);
    }
});


//const getLeague = async(LEAGUE_ID){}
*/
}
module.exports = commands;
