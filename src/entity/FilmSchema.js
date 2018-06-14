const EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
const Film = require("../model/Film").Film; // import {Film} from "../model/Film";

module.exports = new EntitySchema({
    name: "Film",
    target: Film,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        title: {
            type: "varchar"
        },
        synopsis: {
            type: "varchar"
        }
    },
    relations: {
        categories: {
            target: "Category",
            type: "many-to-many",
            joinTable: true,
            cascade: true
        }
    }
});