import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import usePaymentPaid from '../../../hooks/api/usePayment';
import { useEffect, useState } from 'react';
import ChoiceBox from '../../../components/Payment/ChoiceBox';
import CreditCard from '../../../components/Payment/CreditCard';
import useTicketType from '../../../hooks/api/useTicketType';
import useTicket from '../../../hooks/api/useTicket';

export default function Payment() {
  const { paymentLoading, payment, enrollmentLoading, enrollment } = usePaymentPaid();
  const { getTicketType } = useTicketType();
  const { postTicket } = useTicket();
  const [enrollmentData, setEnrollmentData] = useState('');
  const [paymentData, setPaymentData] = useState('');
  const [typeSelector, setTypeSelector] = useState('');
  const [hotelSelector, setHotelSelector] = useState('');
  const [typePrice, setTypePrice] = useState(0);
  const [hotelPrice, setHotelPrice] = useState(0);
  const [ticket, setTicket] = useState({
    isRemote: false,
    includesHotel: false,
    price: 0,
  });
  const [reserve, setReserve] = useState(false);
  const ticketId = 3;

  try {
    useEffect(() => {
      if (payment) {
        setPaymentData(payment);
      }
    }, [payment]);

    useEffect(() => {
      if (enrollment) {
        setEnrollmentData(enrollment);
      }
    }, [enrollment]);

    useEffect(async() => {
      const ticketTypes = await getTicketType();
      const type = ticketTypes.filter(
        (item) => item.isRemote === ticket.isRemote && item.includesHotel === ticket.includesHotel
      );
      submitTicket(type);
    }, [ticket]);

    function submitTicket(type) {
      if(type) {
        const id = type[0].id;
        postTicket({ id: id });
      }
    }

    return (
      <Wrapper>
        <h1>Ingresso e Pagamento</h1>
        {paymentLoading || enrollmentLoading ? (
          <span>{<StyledLoader color="#000000" height={26} width={26} type="Oval" />} Carregando</span>
        ) : enrollmentData !== '' ? (
          <>
            {paymentData !== '' && paymentData.status === 'PAID' ? (
              <>
                <h4>Ingresso escolhido</h4>
                <Choices>
                  <ChoiceBox
                    description={
                      (paymentData.TicketType.isRemote ? 'Remoto' : 'Presencial') +
                      (paymentData.TicketType.includesHotel ? ' + Com Hotel' : ' + Sem Hotel')
                    }
                    price={Number(paymentData.TicketType.price)}
                    selectState={true}
                    disable={true}
                  />
                </Choices>
                <h4>Pagamento</h4>
                <>
                  <h3>Pagamento confirmado!</h3>
                  <h2>Prossiga para a escolha de hospedagem e atividades</h2>
                </>
              </>
            ) : paymentData !== '' && paymentData.status === 'RESERVED' ? (
              <>
                <Choices>
                  <ChoiceBox
                    description={'Presencial' + ' + Com Hotel'}
                    price={500}
                    selectState={true}
                    disable={true}
                  />
                </Choices>
                <CreditCard ticketId={ticketId} />
              </>
            ) : (
              <>
                <h4>Primeiro, escolha sua modalidade de ingresso</h4>
                <Choices>
                  <ChoiceBox
                    description={'Presencial'}
                    price={250}
                    selectState={typeSelector === '' ? false : typeSelector}
                    selector={setTypeSelector}
                    setPrice={setTypePrice}
                  />
                  <ChoiceBox
                    description={'Remoto'}
                    price={100}
                    selectState={typeSelector === '' ? false : !typeSelector}
                    selector={setTypeSelector}
                    setPrice={setTypePrice}
                  />
                </Choices>
                <SecondStep remote={!typeSelector}>
                  <h4>Ótimo! Agora escolha sua modalidade de hospedagem</h4>
                  <Choices>
                    <ChoiceBox
                      description={'Sem Hotel'}
                      price={0}
                      selectState={hotelSelector === '' ? false : hotelSelector}
                      selector={setHotelSelector}
                      setPrice={setHotelPrice}
                    />
                    <ChoiceBox
                      description={'Com Hotel'}
                      price={350}
                      selectState={hotelSelector === '' ? false : !hotelSelector}
                      selector={setHotelSelector}
                      setPrice={setHotelPrice}
                    />
                  </Choices>
                </SecondStep>
                <ThirdStep hide={(typeSelector === true && hotelSelector === '') || typeSelector === '' ? true : false}>
                  <h4>
                    Fechado! O total ficou em{' '}
                    <strong>{!typeSelector ? Number(typePrice) : Number(typePrice) + Number(hotelPrice)}</strong>. Agora
                    é só confirmar:
                  </h4>
                  <ConfirmButton
                    onClick={() => {setTicket({
                      isRemote: !typeSelector,
                      includesHotel: hotelSelector === '' || !typeSelector === true ? false : !hotelSelector,
                      price: typePrice === 100 ? Number(typePrice) : Number(typePrice) + Number(hotelPrice),
                    }); submitTicket();}}
                  >
                    RESERVAR INGRESSO
                  </ConfirmButton>
                </ThirdStep>
              </>
            )}
          </>
        ) : (
          <span>
            <h4>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</h4>
          </span>
        )}
      </Wrapper>
    );
  } catch (error) {}
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
    color: #a9a9a9;
  }

  h3 {
    font-size: 16px;
    font-weight: bold;
    color: #4f4f4f;
  }

  h4 {
    font-size: 18px;
    line-height: 23px;
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

const StyledLoader = styled(Loader)`
  position: relative;
  top: -4.5px;
`;

const SecondStep = styled.div`
  display: ${(props) => (props.price === 0 || props.remote === true ? 'none' : 'flex')};
  flex-direction: column;
`;

const ThirdStep = styled.div`
  display: ${(props) => (props.hide ? 'none' : 'flex')};
  flex-direction: column;
`;
