import styled from 'styled-components';
import { useEffect, useState } from 'react';
import usePaymentPaid from '../../../hooks/api/usePayment';
import Loader from 'react-loader-spinner';
import useActivities from '../../../hooks/api/useActivities';

export default function Activities() {
  const [paymentData, setPaymentData] = useState('');
  const [activitiesData, setActivitiesData] = useState([]);
  const [day, setDay] = useState('');
  const { paymentLoading, payment } = usePaymentPaid();
  const { activities } = useActivities();
  const [number, setNumber] = useState(-1);

  useEffect(() => {
    if (payment) {
      setPaymentData(payment);
    }
  }, [payment]);

  useEffect(() => {
    if (activities) {
      setActivitiesData(activities);
    }
  }, [activities]);

  return (
    <Wrapper>
      <h1>Escolha de atividades</h1>
      {paymentLoading ? (
        <span>{<StyledLoader color="#000000" height={26} width={26} type="Oval"></StyledLoader>} Carregando</span>
      ) : paymentData === '' || (paymentData !== '' && paymentData.status === 'RESERVED') ? (
        <span>
          <h5>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</h5>
        </span>
      ) : paymentData !== '' && paymentData.TicketType.isRemote ? (
        <span>
          <h5>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</h5>
        </span>
      ) : (
        <>
          <h4>Primeiro, filtre pelo dia do evento:</h4>
          <div>
            <DayButton
              number={number}
              onClick={() => {
                setDay('2023-10-22');
                setNumber(1);
              }}
            >
              Sexta, 22/10
            </DayButton>
            <DayButton
              number={number}
              onClick={() => {
                setDay('2023-10-23');
                setNumber(2);
              }}
            >
              Sábado, 23/10
            </DayButton>
            <DayButton
              number={number}
              onClick={() => {
                setDay('2023-10-24');
                setNumber(3);
              }}
            >
              Domingo, 24/10
            </DayButton>
          </div>
          <GridContainer>
            <div>
              <Title>Auditório Principal</Title>
              <ActivitiesContainer>
                {activitiesData
                  .filter((item) => item.location === 'Auditório Principal')
                  .filter((item) => item.date.slice(0, 10) === day)
                  .map((item) =>
                    item.duration === 1 ? (
                      <OneHourActivity>
                        <div>
                          <p>{item.name}</p>
                          <p>09:00 - 10:00</p>
                        </div>
                        <div>
                          <ion-icon name="enter-outline"></ion-icon>
                          <span>{item.seats} vagas</span>
                        </div>
                      </OneHourActivity>
                    ) : (
                      <TwoHourActivity>
                        <div>
                          <p>{item.name}</p>
                          <p>09:00 - 11:00</p>
                        </div>
                        <div>
                          <ion-icon name="enter-outline"></ion-icon>
                          <span>{item.seats} vagas</span>
                        </div>
                      </TwoHourActivity>
                    )
                  )}
              </ActivitiesContainer>
            </div>
            <div>
              <Title>Auditório Secundário</Title>
              <ActivitiesContainer>
                {activitiesData
                  .filter((item) => item.location === 'Auditório Secundário')
                  .filter((item) => item.date.slice(0, 10) === day)
                  .map((item) =>
                    item.duration === 1 ? (
                      <OneHourActivity>
                        <div>
                          <p>{item.name}</p>
                          <p>09:00 - 10:00</p>
                        </div>
                        <div>
                          <ion-icon name="enter-outline"></ion-icon>
                          <span>{item.seats} vagas</span>
                        </div>
                      </OneHourActivity>
                    ) : (
                      <TwoHourActivity>
                        <div>
                          <p>{item.name}</p>
                          <p>09:00 - 11:00</p>
                        </div>
                        <div>
                          <ion-icon name="enter-outline"></ion-icon>
                          <span>{item.seats} vagas</span>
                        </div>
                      </TwoHourActivity>
                    )
                  )}
              </ActivitiesContainer>
            </div>
            <div>
              <Title>Sala de Workshop</Title>
              <ActivitiesContainer>
                {activitiesData
                  .filter((item) => item.location === 'Sala de Workshop')
                  .filter((item) => item.date.slice(0, 10) === day)
                  .map((item) =>
                    item.duration === 1 ? (
                      <OneHourActivity>
                        <div>
                          <p>{item.name}</p>
                          <p>09:00 - 10:00</p>
                        </div>
                        <div>
                          <ion-icon name="enter-outline"></ion-icon>
                          <span>{item.seats} vagas</span>
                        </div>
                      </OneHourActivity>
                    ) : (
                      <TwoHourActivity>
                        <div>
                          <p>{item.name}</p>
                          <p>09:00 - 11:00</p>
                        </div>
                        <div>
                          <ion-icon name="enter-outline"></ion-icon>
                          <span>{item.seats} vagas</span>
                        </div>
                      </TwoHourActivity>
                    )
                  )}
              </ActivitiesContainer>
            </div>
          </GridContainer>
        </>
      )}
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

  span {
    display: flex;
    justify-content: center;
    margin-top: 25%;
  }

  h5 {
    width: 50%;
    font-size: 18px;
    line-height: 23px;
    color: #8e8e8e;
    text-align: center;
    margin: 16px 0;
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

  &:nth-of-type(${(props) => props.number}) {
    background-color: #ffd37d;
  }
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

const StyledLoader = styled(Loader)`
  position: relative;
  top: -4.5px;
`;

const TwoHourActivity = styled(OneHourActivity)`
  min-height: 170px;
`;
