import requests
import sys
import logging
import requests
from typing import Union
from decouple import config
from requests.models import Response

from authentication import Authentication

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s | %(name)s | %(levelname)s | %(message)s')

DATABASE_URL = config('DATABASE_URL')


def find_nth(haystack, needle, n):
    start = haystack.find(needle)
    while start >= 0 and n > 1:
        start = haystack.find(needle, start + len(needle))
        n -= 1
    return start


class BaseScraper:
    def __init__(self):
        self.authentication = Authentication()
        (access_token, refresh_token) = self.authentication.fetch_tokens()
        self.access_token = access_token
        self.refresh_token = refresh_token

    def get_website_name(self):
        base_url = self.get_base_url()
        start_substring = '://'
        end_substring = '/'
        slash_occurence_number = 3
        start = base_url.index(start_substring) + len(start_substring)
        end = find_nth(base_url, end_substring, slash_occurence_number)
        return base_url[start:end]

    def get_base_url(self):
        raise NotImplementedError

    def get_create_job_offer_query_input(self):
        raise NotImplementedError

    def get_create_company_query_input(self):
        raise NotImplementedError

    def _handle_error(self, response: Response, status_code: int) -> None:
        try:
            error_message = response.json()["errors"][0]["message"]
        except ValueError as e:
            logging.error(str(e))
            return
        logging.error(
            f"Can not create job offer, because server returned status code {status_code} with message: {error_message}")

        if error_message == "Invalid authentication token.":
            (access_token, refresh_token) = self.authentication.generate_tokens_by_refresh_token(
                self.refresh_token)
            self.access_token = access_token
            self.refresh_token = refresh_token

    def _create_job_offer(self, job_offer: dict) -> Union[dict, None]:
        create_job_offer_query = """
          mutation createJobOffer($input: CreateJobOfferInput) {
            createJobOffer(input: $input) {
              code,
              message,
              success,
              jobOffer {
                title
              }
            }
          }
        """
        headers = {
            "accessToken": self.access_token
        }
        query_input = self.get_create_job_offer_query_input(job_offer)
        response = requests.post(DATABASE_URL, json={
            'query': create_job_offer_query,
            'variables': {
                "input": query_input
            }},
            headers=headers
        )
        status_code = response.status_code

        if status_code == 200:
            try:
                data = response.json()["data"]["createJobOffer"]
            except ValueError as e:
                logging.error(str(e))
                return
            except KeyError as e:
                logging.error(f"There is no such field as {str(e)}")
                return

            if data:
                success = data["success"]
                message = data["message"]
                status_code = data["code"]
                logging.info(
                    f"status code: {status_code} | message: {message}")

                if success:
                    job_offer = data["jobOffer"]
                    return job_offer
            else:
                self._handle_error(response, status_code)
        else:
            self._handle_error(response, status_code)

    def _create_company(self, job_offer: dict) -> Union[dict, None]:
        create_company_query = """
          mutation createCompany($input: CreateCompanyInput) {
            createCompany(input: $input) {
              code,
              message,
              success,
              company {
                name
              }
            }
          }
        """
        headers = {
            "accessToken": self.access_token
        }
        query_input = self.get_create_company_query_input(job_offer)
        response = requests.post(DATABASE_URL, json={
            'query': create_company_query,
            'variables': {
                "input": query_input
            }},
            headers=headers
        )
        status_code = response.status_code

        if status_code == 200:
            try:
                data = response.json()["data"]["createCompany"]
            except ValueError as e:
                logging.error(str(e))
                return
            except KeyError as e:
                logging.error(f"There is no such field as {str(e)}")
                return

            if data:
                success = data["success"]
                message = data["message"]
                status_code = data["code"]
                logging.info(
                    f"status code: {status_code} | message: {message}")

                if success:
                    company = data["company"]
                    return company
            else:
                self._handle_errore(response, status_code)
        else:
            self._handle_error(response, status_code)

    def _fetch_job_offers(self) -> dict:
        headers = {
            "content-type": "application/json, text/plain",
        }
        try:
            BASE_URL = self.get_base_url()
            response = requests.get(BASE_URL, headers=headers)
        except requests.exceptions.RequestException as e:
            logging.exception(e)
            sys.exit(1)

        status_code = response.status_code
        if status_code != 200:
            logging.warn(f"Fetched website returned status code {status_code}")

        try:
            job_offers = response.json()
        except ValueError as e:
            logging.error(str(e))
            sys.exit(1)

        return job_offers

    def get_job_offers(self):
        raise NotImplementedError

    def create_all_job_offers_with_companies(self) -> None:
        job_offers = self.get_job_offers()

        for job_offer in job_offers:
            self._create_job_offer(job_offer)
            self._create_company(job_offer)
        else:
            website_name = self.get_website_name()
            logging.info(
                f"All job offers and companies from {website_name} has been successfully fetched.")
