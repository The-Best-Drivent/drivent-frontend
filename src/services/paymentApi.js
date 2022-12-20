import api from './api';

export async function pay(body, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  console.log(body);
  const response = await api.post('/payments/process', body, config);

  return response.data;
}
