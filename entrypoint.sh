#!/bin/sh
# run npm start and pass params to the app
npm start -- --username ${BOT_USERNAME:?BOT_USERNAME required} --password ${BOT_PASSWORD:?BUT_PASSOWRD required} --type ${BOT_TYPE:?BOT_TYPE should be degined} --webport ${WEB_PORT:?WEB_PORT should be defined}