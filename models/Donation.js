import Sequelize from 'sequelize';
import connection from '../config/db.js';
import Institute from './Institute.js';
import User from '../models/User.js';

const Donation = connection.define(
    'donations',
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
        cnpj: {
            type: Sequelize.INTEGER,
            allowNull: false,
            // references: {
            //     model: 'institutes',
            //     key: 'cnpj'
            // }
        },
        item: {
            type: Sequelize.STRING,
            allowNull: false
        },
        qtde: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    }
);

// Donation.belongsTo(Institute, {
//     foreignKey: 'cnpj'
//   });
Donation.belongsTo(User, {
    foreignKey: 'idUser'
  });

export default Donation;