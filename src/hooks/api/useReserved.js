import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function usePaymentReserved() {
  const token = useToken();
  
  const {
    loading: paymentLoading,
    error: paymentError,
    act: pay
  } =  useAsync((body) => paymentApi.pay(body, token), false);
  
  return {
    paymentLoading,
    paymentError,
    pay,
  };
}
