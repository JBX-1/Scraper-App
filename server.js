var express = require("express");
var mongojs = require("mongojs");

var request = require("request");
var cheerio = require("cheerio")

var app= express();

//DataBaseInfo
var dataBaseUrl = "scraper";
var collections = ["scrapie"];

// join db to the db variable
var db = mongojs(dataBaseUrl,collections);

//mongo throws error if it catches one
db.on("error", function(error){
    console.log("Database Error:", error);
});

app.get("/", function(req, res){
    res.send("Hello World");
});