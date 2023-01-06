import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activityApi from '../../services/activityApi';

export default function useActivities() {
  const token = useToken();

  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: activitie
  } = useAsync((day) => activityApi.getActivities(day, token));

  return{
    activities,
    activitiesLoading,
    activitiesError,
    activitie
  };
}
