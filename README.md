# GitHub Portfolio

## Getting started

### Prerequisites

* You will need [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/) to run this project.

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
