import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useBooking() {
  const token = useToken();
  
  const {
    data: bookings,
    loading: bookingLoading,
    error: bookingError,
  } =  useAsync(() => bookingApi.getBooking(token));

  return {
    bookingLoading,
    bookingError,
    bookings,
  };
}
