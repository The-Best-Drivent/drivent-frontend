import api from './api';

export async function createTicketType(body, token) {
  const response = await api.post('/tickets/types', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}
