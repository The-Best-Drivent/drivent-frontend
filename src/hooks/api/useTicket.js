import useAsync from '../useAsync';
import * as ticketApi from '../../services/ticketApi';

export default function useTicket() {
  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: postTicket
  } = useAsync(ticketApi.createTicket, false);

  return{
    ticket,
    ticketLoading,
    ticketError,
    postTicket
  };
}
