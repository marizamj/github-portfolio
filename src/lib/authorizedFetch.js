const headers = {
  Authorization: `token ${process.env.REACT_APP_GITHUB_AUTHORIZATION_TOKEN}`
};

export default function authorizedFetch(url) {
  return fetch(url, { headers });
}
