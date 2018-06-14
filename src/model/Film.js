/*export */ class Film {
    constructor(id, title, synopsis, categories) {
        this.id = id;
        this.title = title;
        this.synopsis = synopsis;
        this.categories = categories;
    }
}

module.exports = {
    Film: Film
};