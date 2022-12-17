import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import usePaymentPaid from '../../../hooks/api/usePayment';
import { useEffect, useState } from 'react';
import ChoiceBox from '../../../components/Payment/ChoiceBox';

export default function Payment() {
  const { paymentLoading, payment } = usePaymentPaid();
  const [ paymentDone, setPaymentDone] = useState('');

  try {
    useEffect(async() => {
      const result = await payment();
      setPaymentDone(result);
      console.log(result);
    }, []);
   
    return (
      <Wrapper>
        <h1>Ingresso e Pagamento</h1>
        {paymentLoading ? <span>
          {paymentLoading && <StyledLoader color="#000000" height={26} width={26} type="Oval" />} Carregando
        </span> :
          <>
            {paymentDone != '' ? <>
              <h4>Ingresso escolhido</h4>
              <Choices>
                <ChoiceBox
                  description={'paymentDone.TicketType.isRemote'}
                  price={Number(paymentDone.TicketType.price)}
                />
              </Choices>
            </> : 'payment.data.status'}
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

  h1 {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 30px;
    line-height: 40px;
    color: #000000;
  }

  h4 {
    font-family: 'Roboto';
    font-weight: 400;
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
  height: 37px;
  background: #e0e0e0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 4px;
`;

const StyledLoader = styled(Loader)`
  position: relative;
  top: -4.5px;
`;
