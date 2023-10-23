module.exports = (sequelize, dataTypes) => {
  let Gender = sequelize.define(
    "Gender",
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      Gender: {
        type: dataTypes.STRING(45),
        allowNull: false,
      },
    },
    { tableName: "genders", timestamps: false, }
  );
  Gender.associate = function (models) {
    Gender.hasMany(models.Product, {
      as: "genders",
      foreignKey: "Gender_id",
    });
  };
  return Gender;
};