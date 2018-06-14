const typeorm = require("typeorm"); // import * as typeorm from "typeorm";
const Category = require("./src/model/Category").Category;
const Film = require("./src/model/Film").Film;
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

    app.get('/api/films', function (req, res) {
      let filmRepository = connection.getRepository(Film);
      filmRepository.find({ relations: ["categories"] }).then((values) => res.send(values));
    });

    app.get('/api/film/:id', function (req, res) {
      let filmRepository = connection.getRepository(Film);
      filmRepository.findByIds(req.params.id, { relations: ["categories"] }).then((values) => res.send(values));
    });

    app.get('/api/filldb', function (req, res) {
      // Fill categories
      const category1 = new Category(0, "Terror");
      const category2 = new Category(0, "Action");
      const category3 = new Category(0, "SciFy");
      let catRepository = connection.getRepository(Category);
      catRepository.save([category1, category2, category3])
      // Fill films
      const film1 = new Film(0,"Drácula","Vampire film",[category1]);
      const film2 = new Film(0,"Rambo","Strong man film",[category2]);
      const film3 = new Film(0,"Star wars","Space opera",[category2, category3]);
      let filmRepository = connection.getRepository(Film);
      filmRepository.save([film1, film2, film3])

      res.send('Database has been filled');
    });

    app.listen(3000, function () {
      console.log('Server listening on port 3000!');
    });

    return connection

});