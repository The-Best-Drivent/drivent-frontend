import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketApi from '../../services/ticketApi';

export default function useTicket(body) {
  const token = useToken();
  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: postTicket
  } = useAsync( () => ticketApi.createTicket(body, token));

  return{
    ticket,
    ticketLoading,
    ticketError,
    postTicket
  };
}
