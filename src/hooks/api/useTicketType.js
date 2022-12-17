import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useTicketType() {
  const token = useToken();

  const {
    loading: ticketTypeLoading,
    error: ticketTypeError,
    act: ticketType,
  } = useAsync(() => ticketApi.getTicketTypes(token));

  return {
    ticketTypeLoading,
    ticketTypeError,
    ticketType
  };
}
