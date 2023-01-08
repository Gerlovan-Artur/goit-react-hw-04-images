import axios from 'axios';

export async function getCards(query, page) {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}`,
    {
      params: {
        key: '30769279-74f6e10d7a53d72b1cf9ddb63',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 12,
      },
    }
  );
  return response;
}