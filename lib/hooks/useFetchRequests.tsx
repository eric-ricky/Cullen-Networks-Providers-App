import { useEffect, useState } from 'react';
import { IRequest } from '../../types';
import { useAuthContext } from '../context/auth-context';
import { getFirebaseClient } from '../firebase/config';

const useFetchRequests = () => {
  const userCtx = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [requestsData, setRequestsData] = useState<IRequest[] | []>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (!userCtx?.user) return;

        setLoading(true);
        setError(false);

        // ==== dynamically importing the firbase needed
        const firebaseClient = await getFirebaseClient();
        const { db, collection, getDocs } = firebaseClient;

        const colRef = collection(db, 'users', userCtx.user.uid, 'requests');
        const snapshots = await getDocs(colRef);

        let data: IRequest[] = [];
        snapshots.forEach((snapshot) => {
          const payload: IRequest = {
            requestId: snapshot.data().requestId,
            facilityId: snapshot.data().facilityId,
            createdAt: snapshot.data().createdAt,
            itemInfo: {
              itemName: snapshot.data().itemInfo.itemName,
              quantity: snapshot.data().itemInfo.quantity,
              unit: snapshot.data().itemInfo.unit,
              tempratureRange: snapshot.data().itemInfo.tempratureRange,
            },
            facilityInfo: {
              featuredPhoto: snapshot.data().facilityInfo.featuredPhoto,
              location: {
                geohash: snapshot.data().facilityInfo.location.geohash,
                lat: snapshot.data().facilityInfo.location.lat,
                lng: snapshot.data().facilityInfo.location.lng,
              },
              operatorInfo: {
                displayName:
                  snapshot.data().facilityInfo.operatorInfo.displayName,
                email: snapshot.data().facilityInfo.operatorInfo.email,
                phone: snapshot.data().facilityInfo.operatorInfo.phone,
              },
            },
          };

          data.push(payload);
        });

        setRequestsData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userCtx?.user]);

  return { loading, error, requestsData };
};

export default useFetchRequests;
