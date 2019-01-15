export default function fetchRepos(userName, page = 1) {
  return userName
    ? fetch(
        `https://api.github.com/users/${userName}/repos?sort=created&page=${page}`,
        {
          headers: {
            Authorization: 'token df3c59ad01a2fb5ab33f365b7d14d86af3fb4cdc'
          }
        }
      )
        .then(res => res.json())
        .then(res =>
          res.map(({ id, name, url, contributors_url }) => ({
            id,
            url,
            repoName: name,
            contributors_url
          }))
        )
    : Promise.resolve([]);
}
