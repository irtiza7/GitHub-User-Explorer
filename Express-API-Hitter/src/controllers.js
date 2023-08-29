const axios = require('axios')
require('dotenv').config()
const { extractUserFields, extractUserDetailsFields, extractRepoFields, mergeUserDetailsAndRepos } = require('./data-handling')
const CONSTANTS = require('../constants')

const headers = {
  Authorization: `token ${process.env.PERSONAL_AUTH_TOKEN_FOR_GITHUB_API}`
}

const handleGetGithubUsersRequest = async function (req, res) {
  try {
    const url = `${CONSTANTS.githubBaseURL}/search/users?q=${req.query.searchString}`
    const response = await axios.get(url, { headers })
    const formattedUsers = extractUserFields(response)

    res.json(formattedUsers)
  } catch (error) {
    console.error(`ERROR in handleGetGithubUsersRequest: ${error}`)
    res.json({
      msg: `${error}`
    })
  }
}

const handleGetGithubUsersDetailsRequest = async function (req, res) {
  try {
    const { login } = req.query
    const userDetailsURL = `${CONSTANTS.githubBaseURL}/users/${login}`
    const userReposURL = `${CONSTANTS.githubBaseURL}/users/${login}/repos`

    const [userDetailsResponse, userReposResponse] = await Promise.all([axios.get(userDetailsURL, { headers }), axios.get(userReposURL, { headers })])

    const formattedUsersDetails = extractUserDetailsFields(userDetailsResponse)
    const formattedUserRepos = extractRepoFields(userReposResponse)
    const userDetailsAndRepos = mergeUserDetailsAndRepos(formattedUsersDetails, formattedUserRepos)

    res.json(userDetailsAndRepos)
  } catch (error) {
    console.error(`ERROR in handleGetGithubUsersDetailsRequest: ${error}`)
    res.json({
      msg: `${error}`
    })
  }
}

const handleGetGithubUserReposRequest = async function (req, res) {
  try {
    res.json({})
  } catch (error) {
    console.error(`ERROR in handleGetGithubUserReposRequest: ${error}`)
    res.json({
      msg: `${error}`
    })
  }
}

module.exports = {
  handleGetGithubUsersRequest,
  handleGetGithubUserReposRequest,
  handleGetGithubUsersDetailsRequest
}
