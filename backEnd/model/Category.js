const {DataTypes} = require('sequelize');
const db = require('../db.js');

const Category = db.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'Restrict',
        onUpdate: 'Cascade',
        references: {
            model: 'stores',
            key: 'id',
        }
    }
});

module.exports = {Category};