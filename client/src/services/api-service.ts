import axios from 'axios';
import { PayloadType } from '../types';

const API_BASE_URL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

const ApiService = {
  getPowerModuleState() {
    return apiClient.get('/power-module/state');
  },

  connectPayload(payloadType: PayloadType) {
    return apiClient.post(`/power-module/connect/${payloadType}`);
  },

  disconnectPayload(payloadType: PayloadType) {
    return apiClient.post(`/power-module/disconnect/${payloadType}`);
  },
};

export default ApiService;
