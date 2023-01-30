const {DataTypes} = require('sequelize');
const db = require('../db.js');

const Client = db.define('client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
    },
});

const ClientStore = db.define('client_store', {
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: 'Restrict',
        onUpdate: 'Cascade',
        references: {
            model: 'clients',
            key: 'id',
        }
    },
    store_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: 'Restrict',
        onUpdate: 'Cascade',
        references: {
            model: 'stores',
            key: 'id',
        }
    }
});

module.exports = {Client, ClientStore};