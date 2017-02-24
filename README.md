# Mongo-Scraper
Homework 14 for the Northwestern Coding Boot Camp.

This application is a personal `reddit.com/r/news` scraper app, that allows you to grab articles published on the front page, displays them, and then allows you to save them to your personal collection. You can then comment on articles in your saved collection, and delete them as you please.

Click [**here**](https://whispering-forest-18699.herokuapp.com/) to see the app in production on Heroku.

## Setup

First clone this repo to your local directory.

Next, navigate to your repo in your command terminal, and enter:

`npm install`

This will ensure you have all the necessary NPM packages installed to run this generator.

Next, after ensuring you have MongoDB installed on your machine, you will need to run MongoDB Daemon with  `mongod` in the terminal, and `mongo` in another terminal window. This app uses Mongoose in order to schema Mongo.
