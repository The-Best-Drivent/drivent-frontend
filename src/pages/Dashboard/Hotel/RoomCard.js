import styled from 'styled-components';
import { IoPersonOutline, IoPerson } from 'react-icons/io5';

export default function RoomCard({ room, selectedRoom, setSelectedRoom, roomPreSelected }) {
  let color = 'white';
  let iconColor = '#454545';
  let available = new Array(room.capacity-room.Booking.length).fill(0);
  if(available.length===0)color='#E9E9E9';
  if(selectedRoom.id===room.id) {
    color='#FFEED2';
    iconColor='#FF4791';
  }
  function changeSelected() {
    if(available.length!==0) {
      available.push(0);
      selectedRoom.Booking?.pop();
      room.Booking.push(0);
      setSelectedRoom(room);
    }
  }

  return(
    <RoomCardWrapper onClick={() => changeSelected() } color={color}>
      <div>{room.name}</div>
      <IconWrapper iconColor={iconColor}>
        {
          available.map(() => {
            return(<IoPersonOutline />);
          })
        }
        {
          selectedRoom.id === room.id ? (
            room.Booking.map((index) => {
              if (index !== 0) {
                return(<IoPersonOutline />);
              }
              return(<IoPerson />);
            })
          ) : (
            room.Booking.map(() => {
              return(<IoPerson />);
            })
          )
        }
      </IconWrapper>
    </RoomCardWrapper>
  );
}

const IconWrapper = styled.div`
  color:${props => props.iconColor}
`;

const RoomCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  color: #454545;
  background-color: ${props => props.color};
  border: 1px solid #CECECE;
  margin-bottom:10px;
  border-radius: 12px;
  padding:10px;
  width:200px;
  height: 50px; 
  &:hover{
    cursor: ${props => props.color==='white'?'pointer':'default'};
    opacity: 0.9;
  }
  &:active{
    transform: ${props => props.color==='white'?'translateY(4px)':'none'};
  }
`;
