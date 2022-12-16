import styled from 'styled-components';

export default function Payment() {
  return (
    <Wrapper>
      <h1>Ingresso e Pagamento</h1>
      <h4>Primeiro, escolha sua modalidade de ingresso</h4>
      <Choices>
        <ChoiceBox>
          <p>Presencial</p>
          <p>R$ 250</p>
        </ChoiceBox>
        <ChoiceBox>
          <p>Online</p>
          <p>R$ 100</p>
        </ChoiceBox>
      </Choices>
      <h4>Ótimo! Agora escolha sua modalidade de hospedagem</h4>
      <Choices>
        <ChoiceBox>
          <p>Sem Hotel</p>
          <p>+ R$ 0</p>
        </ChoiceBox>
        <ChoiceBox>
          <p>Com Hotel</p>
          <p>+ R$ 350</p>
        </ChoiceBox>
      </Choices>
      <div>
        <h4>
          Fechado! O total ficou em <strong>R$ 600</strong>. Agora é só confirmar:
        </h4>
        <ConfirmButton>RESERVAR INGRESSO</ConfirmButton>
      </div>
    </Wrapper>
  );
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
`;

const Choices = styled.div`
  display: flex;
`;

const ChoiceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #cecece;
  border-radius: 20px;
  width: 145px;
  height: 145px;
  margin: 12px;

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
