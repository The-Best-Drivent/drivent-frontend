import styled from 'styled-components';
import { useEffect, useState } from 'react';
import usePaymentPaid from '../../../hooks/api/usePayment';
import Loader from 'react-loader-spinner';
import useActivities from '../../../hooks/api/useActivities';
import { IoEnterOutline } from 'react-icons/io5';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import useReserveActivities from '../../../hooks/api/useReserveActivities';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext';

export default function Activities() {
  const [ paymentData, setPaymentData ] = useState('');
  const [ activitiesData, setActivitiesData ] = useState([]);
  const [ days, setDays ] = useState('');
  const { paymentLoading, payment } = usePaymentPaid();
  const { activitiesLoading, activitie } = useActivities();
  const { reserveActivities } = useReserveActivities();
  const [ selected, setSelected ] = useState([]);
  const [ registered, setRegistered ] = useState([]);
  const navigate = useNavigate();
  const [ number, setNumber ] = useState(-1);
  const { userData: user } = useContext(UserContext);
  const userId = user.user.id;

  useEffect(() => {
    if (payment) {
      setPaymentData(payment);
    }
  }, [payment]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  async function getActivities({ day }) {
    try {
      const data = await activitie(day);
      const newData = data.sort((a, b) => Number(a.date.slice(11, 13)) - Number(b.date.slice(11, 13)));
      setActivitiesData(newData);
    } catch (error) {
      toast('Ocorreu um erro ao buscar as atividades!');
    }
  }

  function selectActivity(activity, registerVerify) {
    const hour = Number(activity.date.slice(11, 13));
    const duration = Number(activity.duration);
    let day = activity.day;
    let verifier = true;

    if (activity.seats - activity._count.Registration <= 0) {
      toast('Você não pode escolher uma atividade sem vagas');
    } else if (registerVerify) {
      toast('Você não pode escolher uma atividade que você já escolheu');
    } else if (selected.length === 0 && registered.length === 0) {
      setSelected([...selected, activity]);
    } else if (selected.includes(activity) || registered.includes(activity)) {
      setSelected(selected.filter(item => item !== activity));
    } else {
      console.log(selected);

      registered.map(activitie => {
        for (let i = 0; i < duration; i++) {
          for (let j = 0; j < activitie.duration; j++) {
            if (Number(activitie.date.slice(11, 13)) + j === hour + i && day === activitie.day && verifier) {
              verifier = false;
              toast('Você não pode escolher duas atividades em um mesmo horário.');
              j =  activitie.duration;
              i = duration;
            }
          }
        }
      });

      selected.map(activitie => {
        for (let i = 0; i < duration; i++) {
          for (let j = 0; j < activitie.duration; j++) {
            if (activitie.id === activity.id && day === activitie.day) {
              verifier = false;
              setSelected(selected.filter(item => item.id !== activity.id));
            } else if (Number(activitie.date.slice(11, 13)) + j === hour + i && day === activitie.day && verifier) {
              verifier = false;
              toast('Você não pode escolher duas atividades em um mesmo horário.');
              j =  activitie.duration;
              i = duration;
            }
          }
        }
      });

      if (verifier) {
        setSelected([...selected, activity]);
      }
    }
  }

  function postActivities(activities) {
    if (activities.length !== 0) {
      reserveActivities(activities);
      navigate(0);
    } else {
      toast('Você precisa escolher pelo menos uma atividade para se inscrever.');
    }
  }

  function findRegisters(activity, userId) {
    activity.Registration.map(register => {
      if (register.userId === userId && !registered.includes(activity)) {
        setRegistered([...registered, activity]);
      }
    });
  }

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
                setDays('2023-10-22');
                setNumber(1);
                getActivities({ day: '2023-10-22' });
              }}
            >
              Sexta, 22/10
            </DayButton>
            <DayButton
              number={number}
              onClick={() => {
                setDays('2023-10-23');
                setNumber(2);
                getActivities({ day: '2023-10-23' });
              }}
            >
              Sábado, 23/10
            </DayButton>
            <DayButton
              number={number}
              onClick={() => {
                setDays('2023-10-24');
                setNumber(3);
                getActivities({ day: '2023-10-24' });
              }}
            >
              Domingo, 24/10
            </DayButton>
          </div>
          <GridContainer days={days}>
            <div>
              <Title>Auditório Principal</Title>
              <ActivitiesContainer>
                {activitiesLoading ? (
                  <span>{<StyledLoader color="#000000" height={26} width={26}type="Oval"></StyledLoader>} Carregando</span>
                ) : activitiesData
                  .filter((item) => item.location === 'Auditório Principal')
                  .filter((item) => item.date.slice(0, 10) === days)
                  .map((item) => {
                    findRegisters(item, userId);
                    const registerVerify = registered.includes(item);
                    const selectVerify = selected.filter(activity => activity.id === item.id).length !== 0;
                    
                    return  <Activity
                      onClick={() => selectActivity(item, registerVerify)}
                      noVacancy={registerVerify ? true : item.seats - item._count.Registration}
                      duration={item.duration}
                      selected={registerVerify}
                      selecting={selectVerify}
                    >
                      <div>
                        <p>{item.name}</p>
                        <p>{item.date.slice(11, 16)} - {Number(item.date.slice(11, 13)) + Number(item.duration)}:00</p>
                      </div>
                      <div>
                        {registerVerify ? <>
                          <AiOutlineCheckCircle
                            size={35}
                          ></AiOutlineCheckCircle>
                          <span>Inscrito</span>
                        </> : selectVerify ? <>
                          <AiOutlineCheckCircle
                            size={35}
                          ></AiOutlineCheckCircle>
                          <span>Selecionada</span>
                        </> : (item.seats - item._count.Registration) > 0 ? <>
                          <IoEnterOutline 
                            size={35}
                          ></IoEnterOutline>
                          <span>{item.seats - item._count.Registration} vagas</span>
                        </> : <>
                          <AiOutlineCloseCircle 
                            size={35}
                          ></AiOutlineCloseCircle>
                          <span>Esgotado</span>
                        </>}
                      </div>
                    </Activity>;
                  })}
              </ActivitiesContainer>
            </div>
            <div>
              <Title>Auditório Secundário</Title>
              <ActivitiesContainer>
                {activitiesData
                  .filter((item) => item.location === 'Auditório Secundário')
                  .filter((item) => item.date.slice(0, 10) === days)
                  .map((item) => {
                    findRegisters(item, userId);
                    const registerVerify = registered.includes(item);
                    const selectVerify = selected.filter(activity => activity.id === item.id).length !== 0;

                    return  <Activity
                      onClick={() => selectActivity(item, registerVerify)}
                      noVacancy={registerVerify ? true : item.seats - item._count.Registration}
                      duration={item.duration}
                      selected={registerVerify}
                      selecting={selectVerify}
                    >
                      <div>
                        <p>{item.name}</p>
                        <p>{item.date.slice(11, 16)} - {Number(item.date.slice(11, 13)) + Number(item.duration)}:00</p>
                      </div>
                      <div>
                        {registerVerify ? <>
                          <AiOutlineCheckCircle
                            size={35}
                          ></AiOutlineCheckCircle>
                          <span>Inscrito</span>
                        </> : selectVerify ? <>
                          <AiOutlineCheckCircle
                            size={35}
                          ></AiOutlineCheckCircle>
                          <span>Selecionada</span>
                        </> : (item.seats - item._count.Registration) > 0 ? <>
                          <IoEnterOutline 
                            size={35}
                          ></IoEnterOutline>
                          <span>{item.seats - item._count.Registration} vagas</span>
                        </> : <>
                          <AiOutlineCloseCircle 
                            size={35}
                          ></AiOutlineCloseCircle>
                          <span>Esgotado</span>
                        </>}
                      </div>
                    </Activity>;
                  })}
              </ActivitiesContainer>
            </div>
            <div>
              <Title>Sala de Workshop</Title>
              <ActivitiesContainer>
                {activitiesData
                  .filter((item) => item.location === 'Sala de Workshop')
                  .filter((item) => item.date.slice(0, 10) === days)
                  .map((item) => {
                    findRegisters(item, userId);
                    const registerVerify = registered.includes(item);
                    const selectVerify = selected.filter(activity => activity.id === item.id).length !== 0;

                    return  <Activity
                      onClick={() => selectActivity(item, registerVerify)}
                      noVacancy={registerVerify ? true : item.seats - item._count.Registration}
                      duration={item.duration}
                      selected={registerVerify}
                      selecting={selectVerify}
                    >
                      <div>
                        <p>{item.name}</p>
                        <p>{item.date.slice(11, 16)} - {Number(item.date.slice(11, 13)) + Number(item.duration)}:00</p>
                      </div>
                      <div>
                        {registerVerify ? <>
                          <AiOutlineCheckCircle
                            size={35}
                          ></AiOutlineCheckCircle>
                          <span>Inscrito</span>
                        </> : selectVerify ? <>
                          <AiOutlineCheckCircle
                            size={35}
                          ></AiOutlineCheckCircle>
                          <span>Selecionada</span>
                        </> : (item.seats - item._count.Registration) > 0 ? <>
                          <IoEnterOutline 
                            size={35}
                          ></IoEnterOutline>
                          <span>{item.seats - item._count.Registration} vagas</span>
                        </> : <>
                          <AiOutlineCloseCircle 
                            size={35}
                          ></AiOutlineCloseCircle>
                          <span>Esgotado</span>
                        </>}
                      </div>
                    </Activity>;
                  })}
              </ActivitiesContainer>
            </div>
          </GridContainer>
          <EnrollButton
            onClick={() => postActivities(selected)}
          >Inscrever-se</EnrollButton>
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
  display: ${props => props.days === '' ? 'none' : 'flex'};
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

const Activity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.noVacancy === 0 ? '#FFF4F3' : props.selecting === true ? '#ffffe0' : props.selected === true ? '#D0FFDB' : '#f1f1f1'};
  border-radius: 5px;
  border: none;
  width: 100%;
  min-height: ${(props) => ((props.duration * 80) + 'px')};
  padding: 10px;

  & > div {
    display: flex;
    flex-direction: column;
  }

  & > div:nth-of-type(1) {
    width: 70%;
    align-items: flex-start;
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
    margin-bottom: 4px;
  }

  & > div:nth-of-type(2) {
    color: ${(props) => (!isNaN(props.noVacancy) && props.noVacancy === 0 ? '#CC6666' : props.selecting === true ? '#E6D600' : '#078632')};
    width: 30%;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #cfcfcf;

    span {
      font-size: 12px;
      margin-top: 4px;
    }
  }

  span {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
  }

  div {
    height: ${(props) => ((props.duration * 80) + 'px')};
  }
`;

const StyledLoader = styled(Loader)`
  position: relative;
  top: -4.5px;
`;

const EnrollButton = styled.button`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  margin-top: 20px;
  border: none;
  width: 162px;
  min-height: 37px;
  background: #e0e0e0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 4px;
  
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  &:active {
    transform: translateY(4px);
  }
`;
