import styled from 'styled-components';

export default function HotelCard({ hotel }) {
  const roomTypesString = stringMaker(hotel);

  return(
    <HotelButton>
      <HotelImg src={hotel.image} alt={hotel.name}/>
      <h1>{hotel.name}</h1>
      <h2>Tipos de acomodação:</h2>
      <p>{roomTypesString}</p>
    </HotelButton>
  );
}

function stringMaker(hotel) {
  const roomTypes = { single: false, double: false, triple: false };

  hotel.Rooms.forEach((room) => {
    if(room.capacity===1) {
      roomTypes.single=true;
    }
    if(room.capacity===2) {
      roomTypes.double=true;
    }
    if(room.capacity>=3) {
      roomTypes.triple=true;
    }
  });

  if(roomTypes.single && !roomTypes.double && !roomTypes.triple) {
    return 'Single';
  }
  if(!roomTypes.single && roomTypes.double && !roomTypes.triple) {
    return 'Double';
  }
  if(!roomTypes.single && !roomTypes.double && roomTypes.triple) {
    return 'Triple';
  }
  if(roomTypes.single && roomTypes.double && !roomTypes.triple) {
    return 'Single e Double';
  }
  if(roomTypes.single && !roomTypes.double && roomTypes.triple) {
    return 'Single e Triple';
  }
  if(!roomTypes.single && roomTypes.double && roomTypes.triple) {
    return 'Double e Triple';
  }
  if(roomTypes.single && roomTypes.double && roomTypes.triple) {
    return 'Single, Double e Triple';
  }
  if(!roomTypes.single && !roomTypes.double && !roomTypes.triple) {
    return 'Sem quartos disponíveis!';
  }
}

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
    margin-bottom: 20px;
    color:#343434;
  }

  h2{
    width: 100%;
    font-size: 15px;
    color: #3C3C3C;
    font-weight: bold;
    margin-bottom: 5px;
  }

  p{
    width: 100%;
    font-size: 15px;
    color: #3C3C3C;
    margin-bottom: 10px;
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