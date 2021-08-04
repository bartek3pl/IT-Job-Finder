import { ACCESS_TOKEN, REFRESH_TOKEN, USER } from '@utils/constants/constants';
import { User as UserType } from '@typings/graphql';

class AuthenticationService {
  getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

  private setAccessToken = (accessToken: string) =>
    localStorage.setItem(ACCESS_TOKEN, accessToken);

  private deleteAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);

  getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);

  private setRefreshToken = (refreshToken: string) =>
    localStorage.setItem(REFRESH_TOKEN, refreshToken);

  private deleteRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);

  getUser = (): UserType => JSON.parse(localStorage.getItem(USER) || '{}');

  private setUser = (user: UserType) =>
    localStorage.setItem(USER, JSON.stringify(user));

  private deleteUser = () => localStorage.removeItem(USER);

  getBearerAccessToken = () => `Bearer ${this.getAccessToken()}`;

  login = (accessToken: string, refreshToken: string, user: UserType) => {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
    this.setUser(user);
  };

  logout = () => {
    this.deleteAccessToken();
    this.deleteRefreshToken();
    this.deleteUser();
  };
}

export default AuthenticationService;
