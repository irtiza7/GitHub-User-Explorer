const { DataTypes } = require('sequelize')
const sequelize = require('../../Config/db-connection')

const UserDetailsModel = sequelize.define(
  'user_details',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    html_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    followers: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    following: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    public_repos: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'UserDetails'
  }
)

module.exports = UserDetailsModel
