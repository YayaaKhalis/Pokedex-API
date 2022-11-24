const { Pokemon } = require("../db/sequelize");
// on importe le medele pokemon fournit par sequelize
// on a la route et le traitment associees
const { Op } = require("sequelize"); // on importe les operateur que lon veut utliser
const auth = require("../auth/auth");

module.exports = (app) => {
  // on exporte une fonction qui prend
  //en parametre application expresse entiere
  app.get("/api/pokemons", auth, (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5; //on extrait name de url avec express

      if (name.length < 2) {
        const message = `Le terme de recherche doit contenir au moins 2 caracteres.`;
        return res.status(400).json({ message });
      }

      return Pokemon.findAndCountAll({
        //on recupere le nombre de resultat et les resultat demander
        where: {
          name: {
            //name est la propriete du modele pokemon
            [Op.like]: `%${name}%`, //name est le critere de la recherche
          },
        },
        order: ["name"],
        limit: limit,
      }).then(({ count, rows }) => {
        const message = `Il y a ${count} pokemons qui correspondent au terme de recherche ${name}. `;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({ order: ["name"] })
        .then((pokemons) => {
          //findall retourne une promesse
          //avec tout les pokemon de notre BD
          const message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons }); //on retourne notre reponse fournit par express
        })
        .catch((error) => {
          const message =
            "La liste des pokémons n'a pu etre récuperée. Réessayer dans quelques instants.";
          res.status(500).json({ message, data: error });
        });
    }
  });
};
