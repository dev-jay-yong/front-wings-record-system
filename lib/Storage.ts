import Cookies from 'js-cookie';

export const getToken = () => {
  return Cookies.get('token');
};

export const TestToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibmphc3MyMSJ9.dKMIkqJf8-HYRxJHWGh5P7FyaWFiiQjiZlnjhNDyUFY';
