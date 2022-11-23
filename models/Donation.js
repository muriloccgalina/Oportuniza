import Sequelize from 'sequelize';
import connection from '../config/db.js';
import Institute from './Institute.js';
import User from '../models/User.js';

const Donation = connection.define(
    'donation',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true    
        },
        idUser: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        cpnj: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'institutes',
                key: 'cnpj'
            }
        },
        item: {
            type: Sequelize.STRING,
            allowNull: false
        },
        qtde: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        dateDonation: {
            type: Sequelize.DATE,
            allowNull: false,
        }
    }
);

Donation.belongsTo(Institute, {
    foreignKey: 'cpnj'
  });
Donation.belongsTo(User, {
    foreignKey: 'idUser'
  });

export default Donation;