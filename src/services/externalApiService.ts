import axios from 'axios';

const API_URL = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YOUR_API_KEY';

export const fetchExternalBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data.results.books;
};