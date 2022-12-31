"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class doctorInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      doctorInfo.hasOne(models.schedules, {
        foreignKey: 'doctorid', targetKey: 'doctorid'
      })

     doctorInfo.belongsTo(models.allcodes, {
      foreignKey:'priceId', targetKey: 'keyMap', as: 'priceTypeData'
     })

     doctorInfo.belongsTo(models.allcodes, {
      foreignKey:'provinceId', targetKey: 'keyMap', as: 'provinceTypeData'
     })

     doctorInfo.belongsTo(models.allcodes, {
      foreignKey:'paymentId', targetKey: 'keyMap', as: 'paymentTypeData'
     })
    }
  }
  doctorInfo.init(
    {
      doctorId: DataTypes.INTEGER,
      priceId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
      doctorId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "doctorInfo",
    }
  );
  return doctorInfo;
};
