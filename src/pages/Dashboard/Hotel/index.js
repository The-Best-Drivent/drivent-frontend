import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useHotel from '../../../hooks/api/useHotel';
import HotelCard from './HotelCard';

export default function Hotel() {
  const { hotels } = useHotel();
  const [hotelsData, setHotelsData] = useState([]);

  useEffect(() => {
    if(hotels) {
      setHotelsData(hotels);
    }
  }, [hotels]);

  return (
    <Wrapper>
      <StyledTypography variant='h4'>Escolha de hotel e quarto</StyledTypography>
      <StyledTypography variant='h6'>Primeiro, escolha seu hotel</StyledTypography>
      
      <HotelsWrapper>
        {hotelsData.map( (hotel) => {
          return (
            <HotelCard hotel={hotel} key={hotel.id}/>
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

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
