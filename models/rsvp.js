'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rsvp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rsvp.belongsTo(models.User);
      Rsvp.belongsTo(models.Post); 
    }
  };
  Rsvp.init({
    attend: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rsvp',
  });
  return Rsvp;
};