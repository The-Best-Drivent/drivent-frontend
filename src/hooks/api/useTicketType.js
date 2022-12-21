import useAsync from '../useAsync';

import * as ticketTypeApi from '../../services/ticketTypeApi';

export default function useTicketType() {
  const {
    data: ticketType,
    loading: ticketTypeLoading,
    error: ticketTypeError,
    act: postTicketType,
  } = useAsync(ticketTypeApi.createTicketType, false);

  return {
    ticketTypeLoading,
    ticketTypeError,
    ticketType,
    postTicketType,
  };
}
