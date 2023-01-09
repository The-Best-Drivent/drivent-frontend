import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activityApi from '../../services/activityApi';

export default function useReserveActivities() {
  const token = useToken();

  const {
    data: reservedActivities,
    loading: reserveActivitiesLoading,
    error: reserveActivitiesError,
    act: reserveActivities
  } = useAsync((activities) => activityApi.postActivities(activities, token));

  return{
    reservedActivities,
    reserveActivitiesLoading,
    reserveActivitiesError,
    reserveActivities
  };
}
