const { DataTypes, Model } = require('sequelize')
const sequelize = require('./db-connection')

const UsersModel = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    following: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followers: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    repos_url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'Users',
    timestamps: false
  }
)

const ReposModel = sequelize.define(
  'Repo',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'Repos',
    timestamps: false
  }
)

UsersModel.hasMany(ReposModel, {
  foreignKey: 'id'
})
ReposModel.belongsTo(UsersModel)

authenticateConnection()
  .then(() => {
    syncSequelize()
  })
  .catch((error) => {
    console.log(`ERROR WHILE APPLYING DATA OPERATIONS: ${error}`)
  })

async function authenticateConnection() {
  try {
    await sequelize.authenticate()
  } catch (error) {
    console.error(`ERROR WHILE AUTHENTICATING DB CONNCETION: ${error}`)
  }
}

async function syncSequelize() {
  try {
    await sequelize.sync({ alter: true, force: false })
  } catch (error) {
    console.error(`ERROR WHILE SYNCING SEQUELIZE: ${error}`)
  }
}

module.exports = {
  UsersModel,
  ReposModel,
  sequelize
}
