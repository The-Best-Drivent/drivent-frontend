import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useHotel from '../../../hooks/api/useHotel';
import useBooking from '../../../hooks/api/useBooking';
import usePaymentPaid from '../../../hooks/api/usePayment';
import Loader from 'react-loader-spinner';
import HotelCard from './HotelCard';
import RoomCard from './RoomCard';
import useToken from '../../../hooks/useToken';
import * as bookingApi from '../../../services/bookingApi';

export default function Hotel() {
  const token = useToken();
  const { hotels, hotelsLoading } = useHotel();
  const { bookings, bookingLoading } = useBooking();
  const [hotelsData, setHotelsData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState({});
  const [selectedRoom, setSelectedRoom] = useState({});
  const [bookingData, setBookingData] = useState({});
  const [paymentData, setPaymentData] = useState('');
  const { paymentLoading, payment, enrollmentLoading, enrollment } = usePaymentPaid();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(hotels);
    if (hotels) {
      setHotelsData(hotels);
    }
  }, [hotels]);

  useEffect(() => {
    if (bookings) {
      setBookingData(bookings);
    }
  }, [bookings]);

  useEffect(() => {
    if (payment) {
      setPaymentData(payment);
    }
  }, [payment]);

  async function createBooking() {
    const body = { roomId: selectedRoom.id };
    try {
      const booking = await bookingApi.postBooking({ token, body });
      setBookingData(booking);
      toast('Quarto reservado com sucesso!');
      navigate('/dashboard/activities');
    } catch (err) {
      console.log(err);
      toast('Não foi possível reservar o quarto!');
    }
  }

  return (
    <Wrapper>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {paymentData !== '' && paymentData.status === 'RESERVED' ? (
        <NotDisplayable><StyledTypography variant="h6">
          Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem
        </StyledTypography></NotDisplayable>
      ) : paymentData !== '' && paymentData.TicketType.includesHotel === false ? (
        <NotDisplayable><StyledTypography variant="h6">
          Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades
        </StyledTypography></NotDisplayable>
      ) : hotelsLoading || bookingLoading ? (
        <span>{<StyledLoader color="#000000" height={26} width={26} type="Oval" />} Carregando</span>
      ) : bookingData.booking && hotelsData !== [] ? (
        <>
          <StyledTypography variant="h6">Você já escolheu seu quarto:</StyledTypography>

          <HotelsWrapper>
            <HotelButton key={bookingData.booking.Room.Hotel.name} booking={true}>
              <HotelImg src={bookingData.booking.Room.Hotel.image} alt={bookingData.booking.Room.Hotel.name} />
              <h1>{bookingData.booking.Room.Hotel.name}</h1>

              <h4>{'Quarto Reservado'}</h4>
              <h2>
                {bookingData.booking.Room.name + (bookingData.booking.Room.capacity === 1 ? ' (Single)' : ' (Double)')}
              </h2>

              <h4>{'Pessoas no seu quarto'}</h4>
              <h2>{bookingData._count === 1 ? 'Somente você' : 'Você e mais ' + bookingData._count}</h2>
            </HotelButton>
          </HotelsWrapper>
          <ConfirmButton onClick={() => console.log('aqui')}>TROCAR DE QUARTO</ConfirmButton>
        </>
      ) : (
        <>
          <StyledTypography variant="h6">Primeiro, escolha seu hotel</StyledTypography>

          <HotelsWrapper>
            {hotelsData.map((hotel) => {
              return (
                <HotelCard
                  setSelectedHotel={setSelectedHotel}
                  selectedId={selectedHotel.id}
                  hotel={hotel}
                  key={hotel.id}
                />
              );
            })}
          </HotelsWrapper>
          {selectedHotel.id ? (
            <>
              <StyledTypography variant="h6">Ótima pedida! Agora escolha seu quarto:</StyledTypography>
              <RoomsWrapper>
                {selectedHotel.Rooms.map((room) => {
                  return (
                    <RoomCard room={room} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} key={room.id} />
                  );
                })}
              </RoomsWrapper>
            </>
          ) : (
            <></>
          )}
          {selectedRoom.id ? <ConfirmButton onClick={() => createBooking()}>RESERVAR QUARTO</ConfirmButton> : <></>}
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  h6 {
    color: #8e8e8e;
    font-weight: 400;
  }
`;

const RoomsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin-right: 20px;
  }
`;

const HotelsWrapper = styled.div`
  display: flex;
  font-family: 'Roboto';
  margin-bottom: 10px;
`;

const HotelButton = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  background-color: ${(props) => (props.booking ? '#FFEED2' : '#EBEBEB')};
  width: 200px;
  height: 300px;
  margin-right: 20px;
  border-radius: 12px;

  h3 {
    font-size: 18px;
    line-height: 23px;
    color: #8e8e8e;
    margin: 16px 0;
  }

  h2 {
    font-size: 12px;
    color: #8e8e8e;
    margin: 16px 0;
  }

  span {
    margin-top: 25%;
    display: flex;
    justify-content: center;
  }

  span * {
    max-width: 400px;
    text-align: center;
    margin-right: 8px;
  }

  h4,
  h1 {
    width: 100%;
    font-size: 20px;
  }

  h4 {
    font-size: 12px;
    font-weight: 12px;
    margin-top: 18px;
  }

  h2 {
    margin: 6px 0;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  &:active {
    transform: translateY(4px);
  }
`;

const HotelImg = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 10px;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const NotDisplayable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 150px;
  text-align: center;
`;

const StyledLoader = styled(Loader)`
  position: relative;
  top: -4.5px;
`;

const ConfirmButton = styled.button`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  margin-top: 20px;
  border: none;
  width: 162px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  &:active {
    transform: translateY(4px);
  }
`;
