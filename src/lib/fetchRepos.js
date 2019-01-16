import { authorizedFetch } from './';

export default function fetchRepos(userName, page = 1) {
  return userName
    ? authorizedFetch(
        `https://api.github.com/users/${userName}/repos?sort=created&page=${page}`
      )
        .then(res => res.json())
        .then(res => {
          if (!Array.isArray(res)) {
            throw res;
          }

          return res.map(({ id, name, url, contributors_url, full_name }) => ({
            id,
            url,
            repoName: name,
            contributorsUrl: contributors_url,
            fullName: full_name
          }));
        })
    : Promise.resolve([]);
}
