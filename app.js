const typeorm = require("typeorm"); // import * as typeorm from "typeorm";
const Category = require("./src/model/Category").Category;
var express = require('express');
var app = express();

typeorm.createConnection().then(function (connection) {

    app.get('/', function (req, res) {
        res.send('Hello World!');
      });
    
    app.get('/api', function (req, res) {
      res.send('Api route');
    });

    app.get('/api/categories', function (req, res) {
      let catRepository = connection.getRepository(Category);
      catRepository.find().then((values) => res.send(values));
    });

    app.get('/api/filldb', function (req, res) {
      const category1 = new Category(0, "Films");
      const category2 = new Category(0, "music");
      let catRepository = connection.getRepository(Category);
      catRepository.save([category1, category2])
      res.send('Database has been filled');
    });

    app.listen(3000, function () {
      console.log('Server listening on port 3000!');
    });

    return connection

});