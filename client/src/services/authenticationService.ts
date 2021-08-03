import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER_ID,
  USER_LOGIN,
} from '@utils/constants/constants';

class AuthenticationService {
  getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

  private setAccessToken = (accessToken: string) =>
    localStorage.setItem(ACCESS_TOKEN, accessToken);

  private deleteAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);

  getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);

  private setRefreshToken = (refreshToken: string) =>
    localStorage.setItem(REFRESH_TOKEN, refreshToken);

  private deleteRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);

  getUserId = () => localStorage.getItem(USER_ID);

  private setUserId = (userId: string) => localStorage.setItem(USER_ID, userId);

  private deleteUserId = () => localStorage.removeItem(USER_ID);

  getUserLogin = () => localStorage.getItem(USER_LOGIN);

  private setUserLogin = (userLogin: string) =>
    localStorage.setItem(USER_LOGIN, userLogin);

  private deleteUserLogin = () => localStorage.removeItem(USER_LOGIN);

  getBearerAccessToken = () => `Bearer ${this.getAccessToken()}`;

  login = (
    accessToken: string,
    refreshToken: string,
    userId: string,
    userLogin: string
  ) => {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
    this.setUserId(userId);
    this.setUserLogin(userLogin);
  };

  logout = () => {
    this.deleteAccessToken();
    this.deleteRefreshToken();
    this.deleteUserId();
    this.deleteUserLogin();
  };
}

export default AuthenticationService;
