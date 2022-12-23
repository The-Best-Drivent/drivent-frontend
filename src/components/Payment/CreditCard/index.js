import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import usePaymentReserved from '../../../hooks/api/useReserved';
import { useNavigate } from 'react-router-dom';

const CreditCard = ({ ticketId }) => {
  const [number, SetNumber] = useState('');
  const [name, SetName] = useState('');
  const [date, SetDate] = useState('');
  const [cvc, SetCvc] = useState('');
  const [focus, SetFocus] = useState('');
  const { pay } = usePaymentReserved();
  const navigate = useNavigate();

  async function sendPay() {
    const body = {
      ticketId: ticketId,
      cardData: {
        issuer: 'visa',
        number: number,
        name: name,
        expirationDate: date,
        cvc: cvc
      }
    };
    if (body.cardData.cvc === '' || 
      body.cardData.expirationDate === '' || 
      body.cardData.name === '' || 
      body.cardData.number === '' || 
      isNaN(Number(body.cardData.cvc)) !== false || 
      body.cardData.cvc.length !== 3 || 
      body.cardData.expirationDate.length <= 3 ||
      body.cardData.expirationDate.length >= 6 || 
      isNaN(Number(body.cardData.expirationDate.replace('/', ''))) !== false ||
      body.cardData.number.length <= 12 ||
      body.cardData.number.length >= 17 || 
      isNaN(Number(body.cardData.number.replace('.', '').replace('-', ''))) !== false
    ) {
      toast('Coloque dados validos para realizar o pagamento!');
    } else {
      try {
        await pay(body);
        navigate(0);
      } catch (error) {
        toast('Não foi possível fazer o pagamento!');
      }
    }
  }

  return (
    <>
      <Container>
        <div clasName="rccs__card rccs__card--unknown">
          <Cards
            number={number}
            name={name}
            expiry={date}
            cvc={cvc}
            focused={focus}
          />
        </div>

        <br />
        <form>
          <div className="row">
            <div className="col-sm-11">
              <input
                type="text"
                className="form-control"
                placeholder='Card Number'
                value={number}
                name="number"
                onChange={(e) => {
                  SetNumber(e.target.value);
                }}
                onFocus={(e) => SetFocus(e.target.name)}
              ></input>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-11">
              <input
                type="text"
                className="form-control"
                placeholder='Card Name'
                value={name}
                name="name"
                onChange={(e) => {
                  SetName(e.target.value);
                }}
                onFocus={(e) => SetFocus(e.target.name)}
              ></input>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-6">
              <input
                type="text"
                name="expiry"
                className="form-control"
                placeholder='Expiration Date'
                value={date}
                onChange={(e) => {
                  SetDate(e.target.value);
                }}
                onFocus={(e) => SetFocus(e.target.name)}
              ></input>
            </div>
            <div className="col-sm-5">
              <input
                type="tel"
                name="cvc"
                className="card"
                placeholder='CVV'
                value={cvc}
                onChange={(e) => {
                  SetCvc(e.target.value);
                }}
                onFocus={(e) => SetFocus(e.target.name)}
              ></input>
            </div>
          </div>
        </form>
      </Container>
      <ConfirmButton onClick={sendPay} type = {'pagamento'}>FINALIZAR PAGAMENTO</ConfirmButton>
    </>
  );
};
export default CreditCard;

const Container = styled.div`
    display: flex;
    padding-bottom: 30px;

    form{
      padding-left: 80px;
      textarea:focus, input:focus {
        box-shadow: 10 0 0 0;
        outline: 0;
      }
    }

    .row{
      display: flex;
      width: 350px;
      
      .col-sm-11{
        width: 100%;
        
        input{
          width: 100%;
          height: 6vh;
          border: solid 1px gray;
          border-radius: 5px;
          padding-left: 10px
        }
      }
      .col-sm-5{
        width: 35%;
        padding-left: 10px;
        
        input{
          width: 100%;
          height: 6vh;
          border: solid 1px gray;
          border-radius: 5px;
          padding-left: 10px
        }
      }
      .col-sm-6{
        width: 65%;
        
        input{
          width: 100%;
          height: 6vh;
          border: solid 1px gray;
          border-radius: 5px;
          padding-left: 10px
        }
      }
    }
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
