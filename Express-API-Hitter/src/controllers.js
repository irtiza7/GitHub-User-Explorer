const axios = require('axios')
require('dotenv').config()
const { extractUserFields, extractFollowerFields, extractUserDetailsFields, extractRepoFields, mergeUserDetailsAndRepos } = require('./data-handling')
const CONSTANTS = require('../constants')

const headers = {
  /*
  Auth Token for GitHub API
  */
  Authorization: `token ${process.env.PERSONAL_AUTH_TOKEN_FOR_GITHUB_API}`
}

const handleGetGithubUsersRequest = async function (req, res) {
  try {
    const url = `${CONSTANTS.githubBaseURL}/search/users?q=${req.query.searchString}`
    const response = await axios.get(url, { headers })
    const formattedUsers = extractUserFields(response)

    /*
      response : [{id, login, avatar_url}]
    */
    res.json(formattedUsers)
  } catch (error) {
    console.error(`ERROR in handleGetGithubUsersRequest: ${error}`)
    res.json({
      msg: `${error}`
    })
  }
}

const handleGetGithubUserFollowersRequest = async function (req, res) {
  try {
    const { login } = req.query
    const url = `${CONSTANTS.githubBaseURL}/users/${login}/followers`
    const response = await axios.get(url, { headers })
    const formattedFollowers = extractFollowerFields(response)

    /*
      response : [{id, login, avatar_url}]
    */
    res.json(formattedFollowers)
  } catch (error) {
    console.error(`ERROR in handleGetGithubUserFollowersRequest: ${error}`)
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

    /*
      response : {
        id, login, avatar_url, html_url, name, company, location, email, bio, followers, following, 
        repos: [{ id, name, html_url, description }] 
        }
    */
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
  handleGetGithubUserFollowersRequest,
  handleGetGithubUsersDetailsRequest
}
