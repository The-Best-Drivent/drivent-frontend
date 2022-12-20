import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function usePaymentReserved() {
  const token = useToken();
  
  const {
    loading: paymentLoading,
    error: paymentError,
    act: pay
  } =  useAsync(() => paymentApi.pay(token));

  return {
    paymentLoading,
    paymentError,
    pay,
  };
}
