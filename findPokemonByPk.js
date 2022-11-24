const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");
//findbypk est une prommesse qui retourne une reponse demander
module.exports = (app) => {
  app.get("/api/pokemons/:id", auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        const message = "Un pokémon a bien été trouvé.";
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        const message =
          "La liste des pokémons n'a pu etre récuperée. Réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
