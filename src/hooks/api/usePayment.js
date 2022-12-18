import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function usePaymentPaid() {
  const token = useToken();
  
  const {
    loading: paymentLoading,
    error: paymentError,
    act: payment
  } =  useAsync(() => ticketApi.getTickets(token));

  return {
    paymentLoading,
    paymentError,
    payment,
  };
}
