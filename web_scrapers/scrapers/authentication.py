import requests
import sys
import logging
from typing import Union
from decouple import config

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s | %(name)s | %(levelname)s | %(message)s')


def fetch_access_token() -> Union[str, None]:
    login_query = """
      mutation login($input: LoginUserInput) {
        login (input: $input) {
          code,
          message,
          success,
          accessToken
        }
      }
    """
    USER_LOGIN = config('USER_LOGIN')
    USER_PASSWORD = config('USER_PASSWORD')
    URL = config("DATABASE_URL")

    response = requests.post(URL, json={
        'query': login_query,
        'variables': {
            "input": {
                "login": USER_LOGIN,
                "password": USER_PASSWORD
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
            return f"Bearer {access_token}"
        else:
            message = data["message"]
            status_code = data["code"]
            logging.error(f"status code: {status_code} | message: {message}")
            sys.exit(1)
    else:
        try:
            error_message = response.json()["errors"][0]["message"]
        except ValueError as e:
            logging.error(str(e))
            sys.exit(1)
        logging.error(
            f"Can not fetch access token, because server returned status code {status_code} with message: {error_message}")
