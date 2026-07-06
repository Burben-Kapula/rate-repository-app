// Axios client for the REST API (GraphQL is handled by Apollo Client).
import axios from 'axios';

import { apiUri } from '../utils/config';

const httpClient = axios.create({
  baseURL: apiUri,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default httpClient;
