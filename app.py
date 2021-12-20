import os
import time

from slack_sdk import WebClient
from slackeventsapi import SlackEventAdapter
from flask import Flask
"""from yahoo_oauth import OAuth2
import yahoo_fantasy_api as yfa
"""
app = Flask(__name__)

slack_web_client = WebClient(token=os.getenv("SLACKBOT_TOKEN"))
slack_events_adapter = SlackEventAdapter(os.getenv("SIGNING_SECRET"), "/slack/events", app)

MESSAGE_BLOCK = {
    "type": "section",
    "text": {
        "type": "mrkdwn",
        "text": ""
    }
}


@app.route("/")
def football():
    return "FOOTBALL"


def print_mvp():
    MVP = "me"
    MESSAGE_BLOCK["text"]["text"] = f"The league MVP of the Week is {MVP}"
    message = {"channel": "C02BMDWP7N1", "blocks": MESSAGE_BLOCK}
    slack_web_client.chat_postMessage(**message)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)
    slack_events_adapter.start(port=3000)
    print_mvp()
    if time.localtime(time.time()).tm_wday == 1 and time.localtime(time.time()).tm_hour == 12:
        print_mvp()
