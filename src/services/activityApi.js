import api from './api';

export async function getActivities(day, token) {
  const response = await api.get(`/activities?day=${day}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}
