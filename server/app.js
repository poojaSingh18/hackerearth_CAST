var express = require('express');
var path = require('path');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, '../client')));

// get request to fetch repositories count all languages
app.get('/getRepoCount', function(req, res) {

    var javascript_url = 'https://api.github.com/search/repositories?q=javascript';
    var java_url = 'https://api.github.com/search/repositories?q=java';
    var python_url = 'https://api.github.com/search/repositories?q=python';
    var php_url = 'https://api.github.com/search/repositories?q=php';
    var ruby_url = 'https://api.github.com/search/repositories?q=ruby';

    var repoCountObject = {};

    request({
        url: javascript_url,
        headers: {
            'user-agent': 'node.js'
        }
    }, function(error, response, body) { //fetches javascript repositories count
        console.log("javascript_url", javascript_url);
        if (!error) {
            var jsonbody = JSON.parse(body);
            repoCountObject.javascript = jsonbody.total_count;

            // // fetches java repositories count
            request({
                url: java_url,
                headers: {
                    'user-agent': 'node.js'
                }
            }, function(error, response, body) {
                if (!error) {
                    var jsonbody = JSON.parse(body);
                    repoCountObject.java = jsonbody.total_count;

                    //    //fetches python repositories count
                    request({
                        url: python_url,
                        headers: {
                            'user-agent': 'node.js'
                        }
                    }, function(error, response, body) {
                        if (!error) {
                            var jsonbody = JSON.parse(body);
                            repoCountObject.python = jsonbody.total_count;

                            //         //fetches php repositories count
                            request({
                                url: php_url,
                                headers: {
                                    'user-agent': 'node.js'
                                }
                            }, function(error, response, body) {
                                if (!error) {
                                    var jsonbody = JSON.parse(body);
                                    repoCountObject.php = jsonbody.total_count;

                                    //           //fetches ruby repositories count
                                    request({
                                        url: ruby_url,
                                        headers: {
                                            'user-agent': 'node.js'
                                        }
                                    }, function(error, response, body) {
                                        if (!error) {
                                            var jsonbody = JSON.parse(body);
                                            repoCountObject.ruby = jsonbody.total_count;

                                            res.send(repoCountObject);
                                        } else {
                                            console.log("Error while fetching ruby repo count ::", error);
                                        }
                                    });
                                } else {
                                    console.log("Error while fetching php repo count ::", error);
                                }
                            });
                        } else {
                            console.log("Error while fetching python repo count ::", error);
                        }
                    });
                } else {
                    console.log("Error while fetching java repo count ::", error);
                }
            });
        } else {
            console.log("Error while fetching javascript repo count ::", error);
        }
    });

});


//fetch all repositories of selected language
app.post('/getSelectedLanguageRepositories', function(req, res) {

    var url = 'https://api.github.com/search/repositories?q=' + req.body.selectedLanguage;

    var repositoriesObject = {};

    //request to fetch repositories under selected language
    request({
        url: url,
        headers: {
            'user-agent': 'node.js'
        }
    }, function(error, response, body) {
        console.log("url", url);
        if (!error) {
            var jsonbody = JSON.parse(body);
            var repos = jsonbody.items;

            //code to fetch top nine repositories as per their score value
            var topNineRepos = [];
            repos.sort(function(a, b) {
                return parseFloat(a.score) - parseFloat(b.score);
            });
            if (repos.length > (9 * req.body.page)) {
                topNineRepos = repos.slice(((req.body.page - 1) * 9), (9 * req.body.page));
            } else {
                topNineRepos = repos.slice(((req.body.page - 1) * 9));
            }

            var responseObject = {
                repositories: topNineRepos,
                total_count: jsonbody.total_count
            }

            res.send(JSON.stringify(responseObject));

        } else {
            console.log("Error while fetching repositories ::", error);
        }
    });

});

//request to fetch user owner details of the selected repository
app.post('/getSelectedRepoUserDetails', function(req, res) {
    request({
        url: req.body.user_url,
        headers: {
            'user-agent': 'node.js'
        }
    }, function(error, response, body) {
        console.log("url", req.body.user_url);
        if (!error) {
            var jsonbody = JSON.parse(body);
            res.send(jsonbody);
        } else {
            console.log("Error while fetching repositories ::", error);
        }
    });

});

app.listen(8080, function(req, res) {
    console.log("started listening at 8080...");
});
