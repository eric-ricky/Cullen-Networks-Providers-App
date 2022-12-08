declare module '@heroicons/*';

export interface IAlert {
  message: string;
  severity: string;
}

export interface IUser {
  uid: string;
  displayName: string;
  email: string | null;
  photoURL: string;
  phone: string;
  location: string;
  createdAt: string | undefined;
}

export interface IRequest {
  requestId: string;
  facilityId: string;
  createdAt: string;
  itemInfo: {
    itemName: string;
    quantity: string;
    unit: string;
    tempratureRange: string;
  };
  facilityInfo: {
    featuredPhoto: string;
    location: {
      geohash: string;
      lat: string;
      lng: string;
    };
    operatorInfo: {
      displayName: string;
      email: string;
      phone: string;
    };
  };
}
