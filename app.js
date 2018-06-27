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

    app.get('/api/filldb', async function (req, res) {
      // Fill categories
      let catRepository = connection.getRepository(Category);
      
      let category1 = new Category(0,"Accion");
      await catRepository.save(category1);

      let category2 = new Category(0,"Terror");
      await catRepository.save(category2);

      let category3 = new Category(0,"Comedia");
      await catRepository.save(category3);

      let category4 = new Category(0,"Drama");
      await catRepository.save(category4);

      let filmRepository = connection.getRepository(Film);
      let film1 = new Film(0,"Matrix","Tecnología",[category1,category4]);
      await filmRepository.save(film1);
      let film2 = new Film(0,"ESDLA","Fantasía",[category1, category2, category4]);
      await filmRepository.save(film2);
      let film3 = new Film(0,"Exorcista","Exorcismo",[category1, category2, category3, category4]);
      await filmRepository.save(film3);

      res.send('Database has been filled');
    });

    app.listen(3000, function () {
      console.log('Server listening on port 3000!');
    });

    return connection

});