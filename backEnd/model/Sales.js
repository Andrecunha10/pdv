const {DataTypes} = require('sequelize');
const db = require('../db.js');

const SaleItem = db.define('sale_item', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    promo_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    sale_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'Restrict',
        onUpdate: 'Cascade',
        references: {
            model: 'seles',
            key: 'id',
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'Restrict',
        onUpdate: 'Cascade',
        references: {
            model: 'products',
            key: 'id',
        }
    },
});

const Seles = db.define('seles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    total:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
    }, 
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00,
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'Restrict',
        onUpdate: 'Cascade',
        references: {
            model: 'users',
            key: 'id',
        }
    },
});

module.exports = {SaleItem, Seles};