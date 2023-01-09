import api from './api';

export async function getActivities(day, token) {
  const response = await api.get(`/activities?day=${day}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}

export async function postActivities(activities, token) {
  const body = { activitiesIds: activities.map((activity) => activity.id) };

  const response = await api.post('/activities', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}
