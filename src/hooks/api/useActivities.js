import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activityApi from '../../services/activityApi';

export default function useActivities() {
  const token = useToken();
  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: getActivities
  } = useAsync(() => activityApi.getActivities(token));

  return{
    activities,
    activitiesLoading,
    activitiesError,
    getActivities
  };
}
