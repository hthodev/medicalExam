"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      markdown.belongsTo(models.user, {foreignKey: 'id'})
    }
  }
  markdown.init(
    {
      contentHTML: DataTypes.TEXT("long"),
      contentMarkdown: DataTypes.TEXT("long"),
      introduction: DataTypes.TEXT("long"),
      doctorId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "markdown",
    }
  );
  return markdown;
};
