import { NEWS_API_KEY } from './key';
import Axios from 'axios';

export default class NewsApi {
  constructor() {
    this.BASE_URL = 'https://newsapi.org/v2/';
    this.KEY = NEWS_API_KEY;
  }

  getTopHeadlines = async country => {
    return await Axios.get(`${this.BASE_URL}top-headlines`, {
      params: {
        country,
        apiKey: this.KEY
      }
    });
  };

  searchHeadlines = async query => {
    return await Axios.get(`${this.BASE_URL}everything`, {
      params: {
        q: query,
        apiKey: this.KEY
      }
    });
  };
}
