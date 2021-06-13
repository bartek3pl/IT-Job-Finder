import requests
import sys
import logging
from typing import Union, Tuple
from decouple import config
from requests.models import Response

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s | %(name)s | %(levelname)s | %(message)s')


class Authentication():

    def __init__(self):
        self.USER_LOGIN = config('USER_LOGIN')
        self.USER_PASSWORD = config('USER_PASSWORD')
        self.URL = config("DATABASE_URL")

    def _handle_error(self, response: Response, status_code: int) -> None:
        try:
            error_message = response.json()["errors"][0]["message"]
        except ValueError as e:
            logging.error(str(e))
            sys.exit(1)
        logging.error(
            f"Can not fetch access token, because server returned status code {status_code} with message: {error_message}")

        if error_message == "Invalid authentication token.":
            (access_token, refresh_token) = self.authentication.generate_tokens_by_refresh_token()
            self.access_token = access_token
            self.refresh_token = refresh_token

    def fetch_tokens(self) -> Union[Tuple[str, str], None]:
        login_query = """
          mutation login($input: LoginUserInput) {
            login (input: $input) {
              code,
              message,
              success,
              accessToken,
              refreshToken
            }
          }
        """

        response = requests.post(self.URL, json={
            'query': login_query,
            'variables': {
                "input": {
                    "login": self.USER_LOGIN,
                    "password": self.USER_PASSWORD
                }}},
        )
        status_code = response.status_code
        if status_code == 200:
            try:
                data = response.json()["data"]["login"]
            except ValueError as e:
                logging.error(str(e))
                sys.exit(1)
            except KeyError as e:
                logging.error(f"There is no such field as {str(e)}")
                sys.exit(1)

            if data["success"]:
                access_token = data["accessToken"]
                refresh_token = data["refreshToken"]
                return (f"Bearer {access_token}", f"Bearer {refresh_token}")
            else:
                message = data["message"]
                status_code = data["code"]
                logging.error(
                    f"status code: {status_code} | message: {message}")
                sys.exit(1)
        else:
            self._handle_error(response, status_code)

    def generate_tokens_by_refresh_token(self, refresh_token: str):
        generate_tokens_by_refresh_token_query = """
          mutation generateTokensByRefreshToken($refreshToken: String) {
            generateTokensByRefreshToken(refreshToken: $refreshToken) {
              code,
              message,
              success,
              accessToken,
              refreshToken
            }
          }
        """

        response = requests.post(self.URL, json={
            'query': generate_tokens_by_refresh_token_query,
            'variables': {
                "refreshToken": refresh_token
            }},
        )
        status_code = response.status_code
        if status_code == 200:
            try:
                data = response.json()["data"]["generateTokensByRefreshToken"]
            except ValueError as e:
                logging.error(str(e))
                sys.exit(1)
            except KeyError as e:
                logging.error(f"There is no such field as {str(e)}")
                sys.exit(1)

            if data["success"]:
                access_token = data["accessToken"]
                refresh_token = data["refreshToken"]
                return (f"Bearer {access_token}", f"Bearer {refresh_token}")
            else:
                message = data["message"]
                status_code = data["code"]
                logging.error(
                    f"status code: {status_code} | message: {message}")
                sys.exit(1)
        else:
            self._handle_error(response, status_code)
