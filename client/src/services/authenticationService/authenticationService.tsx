import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER_ID,
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

  getBearerAccessToken = () => `Bearer ${this.getAccessToken()}`;

  login = (accessToken: string, refreshToken: string, userId: string) => {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
    this.setUserId(userId);
  };

  logout = () => {
    this.deleteAccessToken();
    this.deleteRefreshToken();
    this.deleteUserId();
  };
}

export default AuthenticationService;
