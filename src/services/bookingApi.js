import api from './api';

export async function getBookingWithHotel(token) {
  const response = await api.get('/booking/hotel', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
