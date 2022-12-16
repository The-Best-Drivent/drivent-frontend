import styled from 'styled-components';
import ChoiceBox from '../../../components/Payment/ChoiceBox';

export default function Payment() {
  return (
    <Wrapper>
      <h1>Ingresso e Pagamento</h1>
      <h4>Primeiro, escolha sua modalidade de ingresso</h4>
      <Choices>
        <ChoiceBox />
        <ChoiceBox />
      </Choices>
      <h4>Ótimo! Agora escolha sua modalidade de hospedagem</h4>
      <Choices>
        <ChoiceBox />
        <ChoiceBox />
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
