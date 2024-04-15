import { useGetAllHeightRecords } from './firebase/firestore/useGetAllHeightRecords';
import { useGetAllWaterRecords } from './firebase/firestore/useGetAllWaterRecords';
import { useGetAllWeightRecord } from './firebase/firestore/useGetAllWeightRecord';
import { useGetUserBody } from './firebase/firestore/useGetUserBody';
import { useGetUserFace } from './firebase/firestore/useGetUserFace';
import { useGetUserMeals } from './firebase/firestore/useGetUserMeals';

export function useInitData() {
  const { get: getWater } = useGetAllWaterRecords();
  const { get: getWeights } = useGetAllWeightRecord();
  const { get: getHeights } = useGetAllHeightRecords();
  const { get: getFaces } = useGetUserFace();
  const { get: getBodies } = useGetUserBody();
  const { get: getMeals } = useGetUserMeals();

  async function init() {
    await getWater();
    await getWeights();
    await getHeights();
    await getFaces();
    await getBodies();
    await getMeals();
  }

  return init;
}
