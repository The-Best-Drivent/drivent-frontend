import { useContext, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';
import AuthLayout from '../../layouts/Auth';
import { Row, Title, Label } from '../../components/Auth';
import { toast } from 'react-toastify';
import api from '../../services/api';

export default function Callback() {
  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  useEffect( () => 
    api.post('/oauth/github/login', { code }).then((res) => {
      localStorage.setItem('userData', JSON.stringify(res.data));
      setUserData(res.data);
      navigate('/dashboard');
    }).catch(() => {
      toast('Não foi possível fazer o login!');
      navigate('/enroll');
    }), []
  );

  return(
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt='Event Logo' width='60px' />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Carregando...</Label>
        <Loader /> 
      </Row>
    </AuthLayout>
  );
}
