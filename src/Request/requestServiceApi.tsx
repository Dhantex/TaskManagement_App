export function fetchDataGenericTask() {
  const API_URL = "https://localhost:7227/api/v1/GenericTask/details/all";

  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => data);
}