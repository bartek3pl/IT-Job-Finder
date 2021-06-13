import requests
import sys
import logging
import requests
from typing import Union, Tuple, List
from decouple import config
from currency_converter import CurrencyConverter
from requests.models import Response
from authentication import Authentication

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s | %(name)s | %(levelname)s | %(message)s')


class JustJoinItScraper:

    def __init__(self):
        self.authentication = Authentication()
        (access_token, refresh_token) = self.authentication.fetch_tokens()
        self.access_token = access_token
        self.refresh_token = refresh_token

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

    def _format_skills(self, skills: List[dict]) -> List[str]:
        return [skill["name"] for skill in skills]

    def _format_experience_level(self, experience_level: str) -> str:
        return experience_level.upper() if experience_level in ['junior', 'mid', 'senior'] else 'OTHER'

    def _format_contract_type(self, contract_type: str) -> str:
        return {
            'b2b': 'B2B',
            'permanent': 'UOP',
            'mandate_contract': 'UZ'
        }.get(contract_type, 'OTHER')

    def _convert_salary(self, salary: Union[dict, None]) -> Union[Tuple[int, int], Tuple[None, None]]:
        if salary:
            currency_converter = CurrencyConverter()
            currency = salary["currency"].upper()
            min_salary = int(currency_converter.convert(
                salary["from"], currency, 'PLN'))
            max_salary = int(currency_converter.convert(
                salary["to"], currency, 'PLN'))

            return (min_salary, max_salary)
        return (None, None)

    def _format_address(self, address: str) -> str:
        return address.split(", ")[1]

    def _get_create_job_offer_query_input(self, job_offer: dict) -> dict:
        title = job_offer["title"]
        employer_name = job_offer["company_name"]
        employees_number = job_offer["company_size"]
        logo = job_offer["company_logo_url"]
        country = job_offer["country_code"]
        city = self._format_address(job_offer["address_text"])
        street = job_offer["street"]
        (min_salary, max_salary) = self._convert_salary(
            job_offer["employment_types"][0]["salary"])
        skills = self._format_skills(job_offer["skills"])
        experience_level = self._format_experience_level(
            job_offer["experience_level"])
        contract_type = self._format_contract_type(
            job_offer["employment_types"][0]["type"])

        return {
            "title": title,
            "employer": {
                "name": employer_name,
                "address": {
                    "country": country,
                    "city": city,
                    "street": street
                },
                "employeesNumber": employees_number,
                "logo": logo
            },
            "minSalary": min_salary,
            "maxSalary": max_salary,
            "skills": skills,
            "level": experience_level,
            "contractType": contract_type
        }

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
        BASE_URL = config("DATABASE_URL")
        headers = {
            "accessToken": self.access_token
        }

        query_input = self._get_create_job_offer_query_input(job_offer)

        response = requests.post(BASE_URL, json={
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

    def _get_create_company_query_input(self, job_offer):
        employer_name = job_offer["company_name"]
        employees_number = job_offer["company_size"]
        logo = job_offer["company_logo_url"]
        country = job_offer["country_code"]
        city = self._format_address(job_offer["address_text"])
        street = job_offer["street"]

        return {
            "name": employer_name,
            "address": {
                "country": country,
                "city": city,
                "street": street
            },
            "employeesNumber": employees_number,
            "logo": logo
        }

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
        BASE_URL = config("DATABASE_URL")
        headers = {
            "accessToken": self.access_token
        }

        query_input = self._get_create_company_query_input(job_offer)

        response = requests.post(BASE_URL, json={
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
        BASE_URL = "https://justjoin.it/api/offers"
        headers = {
            "content-type": "application/json, text/plain",
        }

        try:
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

    def create_all_job_offers_with_companies(self) -> None:
        job_offers = self._fetch_job_offers()

        for job_offer in job_offers:
            self._create_job_offer(job_offer)
            self._create_company(job_offer)
        else:
            logging.info(
                f"All job offers and companies from justjoinit has been successfully fetched.")


just_join_it_scraper = JustJoinItScraper()
just_join_it_scraper.create_all_job_offers_with_companies()
