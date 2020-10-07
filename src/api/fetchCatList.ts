export const fetchCatList = () =>
  fetch("https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc")
    .then((response) => response.json())
    .catch((e) => {
      throw new Error(e);
    });
