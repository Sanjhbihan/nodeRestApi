const _ = require("lodash");

const film = [
    { title: "Hirak rajar deshe", director: "Satyajit Ray" },
    { title: "Money heist", director: "unknown" },
    { title: "Gupi gayen Baga Bayem", director: "Satyajit Ray" },
    { title: "Pother Pachali", director: "Satyajit Ray" },
    { title: "Hemlock Society", director: "Srijit mukherjee" },
    { title: "Sonar kella", director: "Satyajit Ray" },
];
const films = (req, res) => {
    const { search, order, by } = req.query;
    let movie = _.cloneDeep(film);

    let orderby = by ? by : "title";
    let orderFilter = order ? order : "asc";
    if (orderFilter === "asc") {
        movie.sort((a, b) => {

            var check = a.hasOwnProperty(orderby) ? orderby : "title"
            return a[check].toLowerCase() > b[check].toLowerCase() ? 1 : -1;
        });
    } else {
        movie.sort((a, b) => {
            var check = a.hasOwnProperty(orderby) ? orderby : "title"
            return a[check].toLowerCase() < b[check].toLowerCase() ? 1 : -1;
        });
    }
    if (search) {
        let filmlist = [];
        movie.map((e) => {
            if (
                e.title.toLowerCase().includes(search.toLowerCase()) ||
                e.director.toLowerCase().includes(search.toLowerCase())
            ) {
                filmlist.push(e);
            }
        });
        return res.status(200).send(filmlist);
    }

    console.log("The list of films", search);
    return res.status(200).send(movie);
};

module.exports = { films };