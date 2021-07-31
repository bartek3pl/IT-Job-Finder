class AuthenticationService {
  private ACCESS_TOKEN = 'accessToken';
  private REFRESH_TOKEN = 'refreshToken';
  private USER_ID = 'userId';

  getAccessToken = () => localStorage.getItem(this.ACCESS_TOKEN);

  private setAccessToken = (accessToken: string) =>
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);

  private deleteAccessToken = () => localStorage.removeItem(this.ACCESS_TOKEN);

  getRefreshToken = () => localStorage.getItem(this.REFRESH_TOKEN);

  private setRefreshToken = (refreshToken: string) =>
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);

  private deleteRefreshToken = () => localStorage.getItem(this.REFRESH_TOKEN);

  getUserId = () => localStorage.getItem(this.USER_ID);

  private setUserId = (userId: string) =>
    localStorage.setItem(this.USER_ID, userId);

  private deleteUserId = () => localStorage.removeItem(this.USER_ID);

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
