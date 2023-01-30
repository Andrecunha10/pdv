const {DataTypes} = require('sequelize');
const db = require('../db.js');

const User = db.define('user', {
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
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    encryptedPassword: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'Restrict',
        onUpdate: 'Cascade',
        references: {
            model: 'roles',
            key: 'id',
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
});

module.exports = {User};