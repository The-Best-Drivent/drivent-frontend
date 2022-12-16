import { useState } from 'react';
import styled from 'styled-components';

export default function ChoiceBox() {
  const [selected, setSelected] = useState(false);

  return (
    <Wrapper onClick={() => setSelected(!selected)} selected={selected}>
      <p>Presencial</p>
      <p>R$ 250</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
