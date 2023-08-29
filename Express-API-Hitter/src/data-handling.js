// const { UsersModel, ReposModel, sequelize } = require('./models')

const extractUserFields = function (response) {
  const users = response.data.items
  const usersDataList = users.map(({ id, login, avatar_url }) => {
    return { id, login, avatar_url }
  })
  return usersDataList
}

const extractUserDetailsFields = function (response) {
  const userDetails = response.data
  const { id, login, avatar_url, html_url, name, company, location, email, bio, followers, following, public_repos } = userDetails
  return { id, login, avatar_url, html_url, name, company, location, email, bio, followers, following, public_repos }
}

const extractRepoFields = function (response) {
  const userRepos = response.data
  const repos = userRepos.map(({ id, name, html_url, description }) => {
    return { id, name, html_url, description }
  })
  return repos
}

const mergeUserDetailsAndRepos = function (userDetails, userRepos) {
  return { ...userDetails, repos: userRepos }
}

const saveUsersInDB = async function (users) {
  try {
    await UsersModel.bulkCreate(users)
  } catch (error) {
    console.error(`ERROR in saveUsersInDB: ${error}`)
  }
}

const saveReposInDB = async function (repos) {
  try {
    await ReposModel.bulkCreate(repos)
  } catch (error) {
    console.error(`ERROR in saveReposInDB: ${error}`)
  }
}

module.exports = {
  extractUserFields,
  extractRepoFields,
  extractUserDetailsFields,
  mergeUserDetailsAndRepos,
  saveUsersInDB,
  saveReposInDB
}
