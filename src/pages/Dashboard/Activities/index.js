import styled from 'styled-components';

export default function Activities() {
  return (
    <Wrapper>
      <h1>Escolha de atividades</h1>
      <h4>Primeiro, filtre pelo dia do evento:</h4>
      <div>
        <DayButton>Sexta, 22/10</DayButton>
        <DayButton>Sexta, 22/10</DayButton>
        <DayButton>Sexta, 22/10</DayButton>
      </div>
      <GridContainer>
        <div>
          <Title>Auditório Principal</Title>
          <ActivitiesContainer>
            <OneHourActivity>
              <div>
                <p>Palestra X</p>
                <p>09:00 - 10:00</p>
              </div>
              <div>
                <ion-icon name="enter-outline"></ion-icon>
                <span>27 vagas</span>
              </div>
            </OneHourActivity>
            <OneHourActivity>
              <div>
                <p>Palestra X</p>
                <p>09:00 - 10:00</p>
              </div>
              <div>
                <ion-icon name="enter-outline"></ion-icon>
                <span>27 vagas</span>
              </div>
            </OneHourActivity>
            <OneHourActivity>
              <div>
                <p>Palestra X</p>
                <p>09:00 - 10:00</p>
              </div>
              <div>
                <ion-icon name="enter-outline"></ion-icon>
                <span>27 vagas</span>
              </div>
            </OneHourActivity>
            <TwoHourActivity>
              <div>
                <p>Palestra X</p>
                <p>09:00 - 10:00</p>
              </div>
              <div>
                <ion-icon name="enter-outline"></ion-icon>
                <span>27 vagas</span>
              </div>
            </TwoHourActivity>
          </ActivitiesContainer>
        </div>
        <div>
          <Title>Auditório Secundário</Title>
          <ActivitiesContainer>
            <TwoHourActivity>
              <div>
                <p>Palestra X</p>
                <p>09:00 - 10:00</p>
              </div>
              <div>
                <ion-icon name="enter-outline"></ion-icon>
                <span>27 vagas</span>
              </div>
            </TwoHourActivity>
            <OneHourActivity>
              <div>
                <p>Palestra X</p>
                <p>09:00 - 10:00</p>
              </div>
              <div>
                <ion-icon name="enter-outline"></ion-icon>
                <span>27 vagas</span>
              </div>
            </OneHourActivity>
            <TwoHourActivity>
              <div>
                <p>Palestra X</p>
                <p>09:00 - 10:00</p>
              </div>
              <div>
                <ion-icon name="enter-outline"></ion-icon>
                <span>27 vagas</span>
              </div>
            </TwoHourActivity>
            <TwoHourActivity>
              <div>
                <p>Palestra X</p>
                <p>09:00 - 10:00</p>
              </div>
              <div>
                <ion-icon name="enter-outline"></ion-icon>
                <span>27 vagas</span>
              </div>
            </TwoHourActivity>
          </ActivitiesContainer>
        </div>
        <div>
          <Title>Sala de Workshop I</Title>
          <ActivitiesContainer>
            <TwoHourActivity>
              <div>
                <p>Palestra X</p>
                <p>09:00 - 10:00</p>
              </div>
              <div>
                <ion-icon name="enter-outline"></ion-icon>
                <span>27 vagas</span>
              </div>
            </TwoHourActivity><TwoHourActivity>
              <div>
                <p>Palestra X</p>
                <p>09:00 - 10:00</p>
              </div>
              <div>
                <ion-icon name="enter-outline"></ion-icon>
                <span>27 vagas</span>
              </div>
            </TwoHourActivity>
            <OneHourActivity>
              <div>
                <p>Palestra X</p>
                <p>09:00 - 10:00</p>
              </div>
              <div>
                <ion-icon name="enter-outline"></ion-icon>
                <span>27 vagas</span>
              </div>
            </OneHourActivity>
            <OneHourActivity>
              <div>
                <p>Palestra X</p>
                <p>09:00 - 10:00</p>
              </div>
              <div>
                <ion-icon name="enter-outline"></ion-icon>
                <span>27 vagas</span>
              </div>
            </OneHourActivity>
          </ActivitiesContainer>
        </div>
      </GridContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto';
  font-weight: 400;
  width: 100%;
  height: 95%;

  h1 {
    font-size: 30px;
    line-height: 40px;
    color: #000000;
  }

  h4 {
    font-size: 18px;
    color: #8e8e8e;
    margin: 16px 0;
  }

  & > div:nth-of-type(1) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    margin: 10px 0;
  }
`;

const DayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 131px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
`;

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: none;
  height: 100%;
  margin: 15px 0;
  overflow-y: scroll;

  & > div {
    width: 100%;
    height: 100%;
}
`;

const Title = styled.div`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  text-align: center;
  color: #7b7b7b;
`;

const ActivitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border: 1px solid #d7d7d7;
  border-radius: 2px;
  min-height: 100%;
  margin: 15px 0;
  padding: 10px;
  gap: 10px;
`;

const OneHourActivity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f1f1f1;
  border-radius: 5px;
  border: none;
  width: 100%;
  min-height: 80px;
  padding: 10px;

  & > div {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  & > div:nth-of-type(1) {
    width: 70%;
    align-items: flex-start;
    gap: 5px;
    border-right: 1px solid #cfcfcf;
    padding: 5px;
  }

  & > div > p {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #343434;
  }

  & > div > p:nth-of-type(1) {
    font-weight: 700;
  }

  & > div:nth-of-type(2) {
    color: #078632;
    width: 30%;
    align-items: center;
    justify-content: center;
  }

  ion-icon {
    font-size: 26px;
  }

  span {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
  }
`;

const TwoHourActivity = styled(OneHourActivity)`
  min-height: 170px;
`;
