import {
  CollectionReference,
  DocumentData,
  endAt,
  orderBy,
  query,
  startAt,
} from 'firebase/firestore';
import { geohashQueryBounds } from 'geofire-common';

const getQueryPromises = (
  lat: string,
  lng: string,
  facilitiesRef: CollectionReference<DocumentData>
) => {
  const radiusInM = 50 * 1000;

  const bounds = geohashQueryBounds([+lat, +lng], radiusInM);

  let promises = [];

  for (const b of bounds) {
    const q = query(
      facilitiesRef,
      orderBy('geohash'),
      startAt(b[0]),
      endAt(b[1])
    );
    promises.push(q);
  }

  return promises;
};

export default getQueryPromises;
