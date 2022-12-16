import { useState } from 'react';
import styled from 'styled-components';
import ChoiceBox from '../../../components/Payment/ChoiceBox';

export default function Payment() {
  const buttonChoices = [
    {
      type: 'remote',
      description: 'Presencial',
      price: 250,
    },
    {
      type: 'remote',
      description: 'Online',
      price: 100,
    },
    {
      type: 'hotel',
      description: 'Sem Hotel',
      price: 0,
    },
    {
      type: 'hotel',
      description: 'Com Hotel',
      price: 350,
    },
  ];

  const [ticketChoice, setTicketChoice] = useState({
    remote: false,
    hotel: false,
    price: 0,
  });

  //eslint-disable-next-line no-console
  console.log(ticketChoice);

  return (
    <Wrapper>
      <h1>Ingresso e Pagamento</h1>
      <h4>Primeiro, escolha sua modalidade de ingresso</h4>
      <Choices>
        {buttonChoices
          .filter((item) => item.type === 'remote')
          .map((item) => (
            <ChoiceBox
              description={item.description}
              price={Number(item.price)}
              type={item.type}
              setTicketChoice={setTicketChoice}
              ticketChoice={ticketChoice}
            />
          ))}
      </Choices>
      <SecondStep price={ticketChoice.price} remote={ticketChoice.remote}>
        <h4>Ótimo! Agora escolha sua modalidade de hospedagem</h4>
        <Choices>
          {buttonChoices
            .filter((item) => item.type === 'hotel')
            .map((item) => (
              <ChoiceBox
                description={item.description}
                price={item.price}
                type={item.type}
                setTicketChoice={setTicketChoice}
                ticketChoice={ticketChoice}
              />
            ))}
        </Choices>
      </SecondStep>
      <ThirdStep price={ticketChoice.price}>
        <h4>
          Fechado! O total ficou em <strong>{ticketChoice.price}</strong>. Agora é só confirmar:
        </h4>
        <ConfirmButton>RESERVAR INGRESSO</ConfirmButton>
      </ThirdStep>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto';
  font-weight: 400;
  width: 100%;

  h1 {
    font-size: 30px;
    line-height: 40px;
    color: #000000;
  }

  h4 {
    font-size: 18px;
    line-height: 23px;
    color: #8e8e8e;
    margin: 16px 0;
  }
`;

const Choices = styled.div`
  display: flex;
`;

const ConfirmButton = styled.button`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;

  border: none;
  width: 162px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 4px;
`;

const SecondStep = styled.div`
  display: ${props => props.price === 0 || props.remote === true ? 'none' : 'flex'};
  flex-direction: column;
`;

const ThirdStep = styled.div`
  display: ${props => props.price === 0 ? 'none' : 'flex'};
  flex-direction: column;
`;
