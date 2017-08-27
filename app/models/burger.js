module.exports = (sequelize, DataTypes) => {
    var Burger = sequelize.define('Burger', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        burger_name: {type: DataTypes.STRING},
        devoured: {type: DataTypes.BOOLEAN, defaultValue: false},
        ingredients: {type: DataTypes.STRING},
        picUrl: {type: DataTypes.STRING}
        }
    );
    return Burger;
}