const { DataTypes } = require('sequelize')
const sequelize = require('../../Config/db-connection')

const ReposModel = sequelize.define(
  'repos',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    html_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'Repos',
    timestamps: false
  }
)
