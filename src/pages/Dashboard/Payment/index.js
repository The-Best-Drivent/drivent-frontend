import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import usePaymentPaid from '../../../hooks/api/usePayment';
import { useEffect, useState } from 'react';
import ChoiceBox from '../../../components/Payment/ChoiceBox';
import CreditCard from '../../../components/Payment/CreditCard';

export default function Payment() {
  const { paymentLoading, payment } = usePaymentPaid();
  const [ paymentDone, setPaymentDone] = useState('');
  const [ typeSelector, setTypeSelector ] = useState(true);
  const [ hotelSelector, setHotelSelector ] = useState(true);
  const [ totalPrice, setTotalPrice ] = useState(0);
  const [reserve, setReserve] = useState(false);
  const ticketId = 3;

  try {
    useEffect(async() => {
      const result = await payment();
      setPaymentDone(result);
    }, []);
    return (
      <Wrapper>
        <h1>Ingresso e Pagamento</h1>
        {paymentLoading ? <span>
          {paymentLoading && <StyledLoader color="#000000" height={26} width={26} type="Oval" />} Carregando
        </span> :
          <>
            {paymentDone !== '' ? <>
              <h4>Ingresso escolhido</h4>
              <Choices>
                <ChoiceBox
                  description={(paymentDone.TicketType.isRemote ? 'Remoto' : 'Presencial')+(paymentDone.TicketType.includesHotel ? ' + Com Hotel' : ' + Sem Hotel')}
                  price={Number(paymentDone.TicketType.price)}
                  selectState={true}
                  disable={true}
                />
              </Choices>
              <h4>Pagamento</h4>
              <>
                <h3>Pagamento confirmado!</h3>
                <h2>Prossiga para a escolha de hospedagem e atividades</h2>
              </>
            </> : reserve === false ? <>
              <h4>Primeiro, escolha sua modalidade de ingresso</h4>
              <Choices>
                <ChoiceBox
                  description={'Presencial'}
                  price={'R$'+500}
                  selectState={typeSelector}
                  selector={setTypeSelector}
                  setPrice={setTotalPrice}
                  totalPrice={totalPrice}
                />
                <ChoiceBox
                  description={'Remoto'}
                  price={'R$'+400}
                  selectState={!typeSelector}
                  selector={setTypeSelector}
                  setPrice={setTotalPrice}
                  totalPrice={totalPrice}
                />
              </Choices>
              <SecondStep remote={!typeSelector}>
                <h4>Ótimo! Agora escolha sua modalidade de hospedagem</h4>
                <Choices>
                  <ChoiceBox
                    description={'Sem Hotel'}
                    price={'+ R$'+0}
                    selectState={hotelSelector}
                    selector={setHotelSelector}
                    setPrice={setTotalPrice}
                    totalPrice={totalPrice}
                  />
                  <ChoiceBox
                    description={'Com Hotel'}
                    price={'+ R$'+400}
                    selectState={!hotelSelector}
                    selector={setHotelSelector}
                    setPrice={setTotalPrice}
                    totalPrice={totalPrice}
                  />
                </Choices>
              </SecondStep>
              <h4>
                Fechado! O total ficou em <strong>{totalPrice}</strong>. Agora é só confirmar:
              </h4>
              <ConfirmButton onClick={() => setReserve(true)}>RESERVAR INGRESSO</ConfirmButton>
            </> : <>
              <Choices>
                <ChoiceBox
                  description= {'Presencial'+' + Com Hotel'}
                  price={500}
                  selectState={true}
                  disable={true}
                />
              </Choices>
              <h4>Pagamento</h4>
              <CreditCard ticketId = {ticketId}/>
            </>}
          </>
        }
      </Wrapper>
    );
  } catch (error) {

  }
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

  h2 {
    margin-top: 6px;
    font-size: 16px;
    color: #A9A9A9;
  }

  h3 {
    font-size: 16px;
    font-weight: bold;
    color: #4F4F4F;
  }

  h4 {
    font-size: 18px;
    line-height: 23px;
    color: #8e8e8e;
    margin: 16px 0;
  }

  span {
    margin-top: 30%;
    display: flex;
    justify-content: center;
  }

  span * {
   
    margin-right: 8px;
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
  width: ${props => props.type === 'pagamento' ? '200px' : '162px'};
  height: 37px;
  background: #e0e0e0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 4px;
`;

const StyledLoader = styled(Loader)`
  position: relative;
  top: -4.5px;
`;

const SecondStep = styled.div`
  display: ${props => props.price === 0 || props.remote === true ? 'none' : 'flex'};
  flex-direction: column;
`;

const ThirdStep = styled.div`
  display: ${props => props.price === 0 ? 'none' : 'flex'};
  flex-direction: column;
`;
