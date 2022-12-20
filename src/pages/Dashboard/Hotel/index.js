import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useHotel from '../../../hooks/api/useHotel';
import useBooking from '../../../hooks/api/useBooking';
import Loader from 'react-loader-spinner';
import HotelCard from './HotelCard';

export default function Hotel() {
  const { hotels, hotelsLoading } = useHotel();
  const { bookings, bookingLoading } = useBooking();
  const [ hotelsData, setHotelsData ] = useState([]);
  const [ bookingData, setBookingData ] = useState({});
  const [ bookingHotelData, setBookingHotelData ] = useState({});

  useEffect(() => {
    if(hotels) {
      setHotelsData(hotels);
    }
  }, [hotels]);

  useEffect(() => {
    if(bookings) {
      setBookingData(bookings);
    }
  }, [bookings]);

  useEffect(() => {
    if(bookings && hotels) {
      setBookingHotelData(hotelsData.find(hotel => hotel.id = bookingData.Room.hotelId));
      console.log(bookingHotelData);
    }
  }, [hotels, bookings]);

  return (
    <Wrapper>
      <StyledTypography variant='h4'>Escolha de hotel e quarto</StyledTypography>
      {hotelsLoading || bookingLoading ? <span>
        {<StyledLoader color="#000000" height={26} width={26} type="Oval" />} Carregando
      </span> : bookingData !== {} && hotelsData !== [] && bookingHotelData !== {} ? <>
        <h3>Você já escolheu seu quarto:</h3>
      
      <HotelsWrapper>
        {hotelsData.map( (hotel) => {
          return (
            <HotelCard hotel={hotel} key={hotel.id}/>
          );
        })}
      </HotelsWrapper>

              <h2>{bookingData.name}</h2>
            </HotelButton> : <></>
          }
        </HotelsWrapper>
      </> : <>
        <StyledTypography variant='h6'>Primeiro, escolha seu hotel</StyledTypography>
        
        <HotelsWrapper>
          {
            hotelsData.map( (hotel) => {
              return (
                <HotelButton key={hotel.name}>
                  <HotelImg src={hotel.image} alt={hotel.name}/>
                  <h1>{hotel.name}</h1>
                </HotelButton>
              );
            })}
        </HotelsWrapper>
      </>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  h6{
    color: #8E8E8E;
    font-weight: 400;
  }

  h3 {
    font-size: 18px;
    line-height: 23px;
    color: #8e8e8e;
    margin: 16px 0;
  }

  h2 {
    font-size: 8px;
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
`;

const HotelsWrapper = styled.div`
  display: flex;
  font-family: 'Roboto';
`;

const HotelButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding:10px;
  background-color: ${props => props.booking ? '#EBEBEB' : '#EBEBEB'};
  width:200px;
  height:300px;
  margin-right:20px;
  border-radius: 12px;
  h1{
    width: 100%;
    font-size: 20px;
  }
  &:hover{
    cursor: pointer;
    opacity: 0.9;
  }
  &:active{
    transform: translateY(4px);
  }
`;

const HotelImg = styled.img`
  width:100%;
  height:100px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom:10px;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const StyledLoader = styled(Loader)`
  position: relative;
  top: -4.5px;
`;
