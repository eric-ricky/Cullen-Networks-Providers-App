import Cookies from 'js-cookie';

export interface IData {}

export const setUserLocal = (data: IData) =>
  Cookies.set('user', JSON.stringify(data));

export const getUserLocal = () => {
  const userCookie = Cookies.get('user');
  if (!userCookie) return;
  return JSON.parse(userCookie);
};

export const unsetUserLocal = () => Cookies.remove('user');
