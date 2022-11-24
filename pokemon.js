const validTypes = [
  "Plante",
  "Poisson",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  // connexion a la bd pour
  //sequelise avec on peut definir un nouveau modele
  //datatypes permer de definir les type de donne de chaque
  //propriete de notre modele exemple integer=des entiers
  // la prorpite define prend 3 parametre pour mettre en place un
  //nouveau modele SQLZ se sert des modele pour definir
  //les donne dans laBD
  return sequelize.define(
    "Pokemon", //SQz cree va cree la table pokemonS
    // on decrit ensuite les propriete de notre modele
    //qui vont etre traduite en colonne dans notre BD
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // indique que ID et tres inportant
        autoIncrement: true,
        //la date de creation/modifi et defnit automatiquement par la bd
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom est déjà pris.",
        },
        validate: {
          notEmpty: { msg: "le nom ne peut pas etre vide." },
          notNull: { msg: "Le nom est une propriété requise." },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de vie.",
          },
          min: {
            args: [0],
            msg: "Les points de vie doivent etre superieurs ou égales à 0.",
          },
          max: {
            args: [999],
            msg: "Les points de vie doivent etre inférieurs ou égales à 999.",
          },

          notNull: { msg: "les poins de vie sont une propriété requise." },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de dégats.",
          },
          min: {
            args: [0],
            msg: "Les points de dégats doivent etre superieurs ou égales à 0",
          },
          max: {
            args: [99],
            msg: "Les points de vie dégats etre inférieurs ou égales à 99",
          },
          notNull: { msg: "les poins de dégats sont une propriété requise" },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "Utilisez uniquement une URL.",
          },
          notNull: { msg: "lL'image est une propriété requise" },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          //valeur contenu dans notre BD plante,Poison exp
          return this.getDataValue("types").split(",");
        },

        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error("Un pokemon doit au moins avoir un type.");
            }
            if (value.split(",").length > 3) {
              throw new Error(
                "Un pokémon ne peux pas avoir plus de trois types."
              );
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                // throw new Error(
                //   `Le type d'un pokemon doit appartenir à la liste suivante : `
                // );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true, //indique que nous souhaitons modifier le comportement par defaut de SQZ
      createdAt: "created", //date de creation
      updatedAt: false, //date de modfiicaation
    }
  );
};
