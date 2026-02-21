import Cookies from 'js-cookie';

export const setToken = (token: string) => {
  Cookies.set("token", token, {
    expires: 30 ,
    path: '/',     
  });
};

export const getToken = (): string | undefined => {
  const token = Cookies.get("token");
  if(token){
    setToken(token)
  }
  return token ;
};

export const removeToken = () => {
  Cookies.remove("token", { path: '/' });
};
