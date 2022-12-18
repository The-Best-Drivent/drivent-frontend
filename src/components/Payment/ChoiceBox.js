import styled from 'styled-components';

export default function ChoiceBox({
  description,
  price,
  selectState,
  selector,
  disable,
}) {
  function clickButton() {
    if (!disable && !selectState && selector) {
      if (description === 'Presencial' || description === 'Sem Hotel') {
        selector(!selectState);
      } else {
        selector(selectState);
      }
    }
  }

  return (
    <Wrapper onClick={clickButton} selected={selectState} disable={disable}>
      <p>{description}</p>
      <p>{'R$ '+price}</p>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${(props) => (props.selected && props.disable ? 'none' : '1px solid #cecece')};
  border-radius: 20px;
  width: ${(props) => (props.disable ? '285px' : '145px')};
  height: 145px;
  margin: 12px;

  background-color: ${(props) => (props.selected || props.disable ? '#FFEED2' : '#FFFFFF')};

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #454545;

  p:nth-child(2) {
    margin-top: 8px;
    color: #898989;
  }
`;
