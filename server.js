var express = require("express");
var mongojs = require("mongojs");

var request = require("request");
var cheerio = require("cheerio")
var axios = require("axios")

var app = express();

//DataBaseInfo
var dataBaseUrl = "scraper";
var collections = ["scrapie"];

// join db to the db variable
var db = mongojs(dataBaseUrl, collections);

//mongo throws error if it catches one
db.on("error", function (error) {
    console.log("Database Error:", error);
});

app.get("/", function (req, res) {
    res.send("Hello World");
});


app.get("/all", function (req, res) {

    db.scrapie.find({}, function (err, found) {
        if (err) {
            console.log(err)
        }
        else {
            res.json(found)
        }
    });
});

app.get("/scrape", function (req, res) {

    //axios callout to use that link
    axios.get("https://xhamster.com/most-viewed/weekly").then(function (response) {

        var $ = cheerio.load(response.data)
        // grabs every .thumb-list tag and does this          
        $(".thumb-list__item video-thumb").each(function (i, element) {

            var result = {};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href")

            db.scrapie.create(result)
                .then(function (dbscrapie) {
                    console.log(dbscrapie)
                })
                .catch(function (err) {
                    return res.json(err);
                })
        })
        res.send("DONE")
    })
})





app.listen(3306, function () {
    console.log("App Running on port 3000!!");
})