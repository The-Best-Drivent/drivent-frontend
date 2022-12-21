import api from './api';

export async function getBookingWithHotel(token) {
  const response = await api.get('/booking/hotel', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function postBooking({ token, body }) {
  const response = await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
