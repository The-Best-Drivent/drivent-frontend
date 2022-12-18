import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useHotel from '../../../hooks/api/useHotel';

export default function Hotel() {
  const { hotels } = useHotel();
  const [hotelsData, setHotelsData] = useState([]);

  useEffect(() => {
    if(hotels) {
      setHotelsData(hotels);
    }
  }, [hotels]);

  console.log('a===>', hotelsData);
  return (
    <Wrapper>
      <StyledTypography variant='h4'>Escolha de hotel e quarto</StyledTypography>
      <StyledTypography variant='h6'>Primeiro, escolha seu hotel</StyledTypography>
      
      <HotelsWrapper>
        {hotelsData.map( (hotel) => {
          return (
            <HotelButton>
              <HotelImg src={hotel.image} alt={hotel.name}/>
              <h1>{hotel.name}</h1>
            </HotelButton>
          );
        })}
      </HotelsWrapper>

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
  background-color: #EBEBEB;
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
