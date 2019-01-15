import * as Promise from 'bluebird';

export function fetchContributorsForAll(repos) {
  return Promise.map(
    repos,
    repo => {
      return repo.contributors || fetchContributors(repo);
    },
    { concurrency: 3 }
  ).then(contributorsList =>
    contributorsList.reduce((acc, el) => {
      acc[el[0].repoName] = el;
      return acc;
    }, {})
  );
}

export function fetchContributors(repo, page = 1) {
  return fetch(`${repo.contributors_url}?page=${page}`, {
    headers: {
      Authorization: 'token df3c59ad01a2fb5ab33f365b7d14d86af3fb4cdc'
    }
  })
    .then(res => res.json())
    .then(res =>
      res.length > 0
        ? res.map(({ id, login, contributions }) => ({
            id,
            repoName: repo.repoName,
            userName: login,
            contributions
          }))
        : [
            {
              repoName: repo.repoName,
              userName: 'no contributors',
              contributions: 0
            }
          ]
    );
}
