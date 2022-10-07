"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class doctorClinicSpecialties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  doctorClinicSpecialties.init(
    {
      doctorid: DataTypes.INTEGER,
      clinicid: DataTypes.INTEGER,
      specialtyid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "doctorClinicSpecialties",
    }
  );
  return doctorClinicSpecialties;
};
