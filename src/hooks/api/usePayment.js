import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';
import * as enrollmentApi from '../../services/enrollmentApi';

export default function usePaymentPaid() {
  const token = useToken();
  const {
    data: payment,
    loading: paymentLoading,
    error: paymentError,
    act: getPayment,
  } =  useAsync(() => ticketApi.getTickets(token));

  const {
    data: enrollment,
    loading: enrollmentLoading,
    error: enrollmentError,
    act: getEnrollment
  } = useAsync(() => enrollmentApi.getPersonalInformations(token));

  return {
    paymentLoading,
    paymentError,
    payment,
    enrollmentLoading,
    enrollmentError,
    enrollment,
    getEnrollment,
  };
}

