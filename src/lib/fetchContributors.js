import * as Promise from 'bluebird';
import { authorizedFetch } from './';

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
  return authorizedFetch(`${repo.contributorsUrl}?page=${page}`)
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
              noContributors: true
            }
          ]
    );
}
