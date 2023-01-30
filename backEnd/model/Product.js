const {DataTypes} = require('sequelize');
const db = require('../db.js');

const Product = db.define('product', {
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
    ean: {
        type: DataTypes.STRING(13),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
    },
    promo_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        ondDelete: 'Restrict',
        onUpdate: 'Cascade',
        references: {
            model: 'categories',
            key: 'id',
        },
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

module.exports = {Product};