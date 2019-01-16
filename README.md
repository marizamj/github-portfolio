# GitHub Portfolio [![CircleCI](https://circleci.com/gh/marizamj/github-portfolio.svg?style=svg)](https://circleci.com/gh/marizamj/github-portfolio)

## Getting started

### Prerequisites

* You will need [Node.js](https://nodejs.org/en/) v8 of higher and [Yarn](https://yarnpkg.com/en/) to run this project.

### Installing

* Clone this project

  ```bash
  git clone https://github.com/marizamj/github-portfolio.git
  
  cd github-portfolio
  ```

* Install dependencies

  ```bash
  yarn
  ```
  
* Set your GitHub OAuth token into `.env.local` file. [How to create a personal access token.](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) 

  ```bash
  touch .env.local
  
  echo REACT_APP_GITHUB_AUTHORIZATION_TOKEN={your token} > .env.local
  ```
  
    You will need this because there is a rate limit for unauthenticated requests to GitHub API that allows up to 60 requests per hour. For API requests using Basic Authentication or OAuth, you can make up to 5000 requests per hour.

## Running the dev server

```
yarn start
```
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running the tests

```
yarn test
```
Launches the test runner in the interactive watch mode.

## Built with

* [Create React App](https://github.com/facebook/create-react-app)
* [React Router](https://github.com/ReactTraining/react-router)
