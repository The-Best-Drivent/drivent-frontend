import { useState } from 'react';
import styled from 'styled-components';

export default function ChoiceBox({ type, description, price, setTicketChoice, ticketChoice }) {
  const [selected, setSelected] = useState(false);

  function clickButton() {
    setSelected(!selected);
    if (!selected) {
      if (type === 'remote') {
        setTicketChoice({
          remote: description === 'Online' ? true : false,
          hotel: ticketChoice.hotel,
          price: ticketChoice.price += price,
        });
      }
      if (type === 'hotel') {
        setTicketChoice({
          remote: ticketChoice.remote,
          hotel: description === 'Com Hotel' ? true : false,
          price: ticketChoice.price += price,
        });
      }
    } else {
      setTicketChoice({
        remote: ticketChoice.remote,
        hotel: ticketChoice.hotel,
        price: ticketChoice.price -= price,
      });
    }
  }

  return (
    <Wrapper onClick={clickButton} selected={selected}>
      <p>{description}</p>
      <p>{type === 'hotel' ? `+ R$ ${price}` : `R$ ${price}`}</p>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${(props) => (props.selected ? 'none' : '1px solid #cecece')};
  border-radius: 20px;
  width: 145px;
  height: 145px;
  margin: 12px;

  background-color: ${(props) => (props.selected ? '#FFEED2' : '#FFFFFF')};

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #454545;

  p:nth-child(2) {
    color: #898989;
  }
`;
