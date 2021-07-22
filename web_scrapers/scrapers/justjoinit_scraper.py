from typing import Union, Tuple, List
from currency_converter import CurrencyConverter

from authentication import Authentication
from base_scraper import BaseScraper


class JustJoinItScraper(BaseScraper):
    def __init__(self):
        self.authentication = Authentication()
        (access_token, refresh_token) = self.authentication.fetch_tokens()
        self.access_token = access_token
        self.refresh_token = refresh_token

    def get_base_url(self):
        return "https://justjoin.it/api/offers"

    def _format_skills(self, skills: List[dict]) -> List[str]:
        return [skill["name"] for skill in skills]

    def _format_experience_level(self, experience_level: str) -> List[str]:
        return [experience_level.upper()] if experience_level.lower() in [
            'trainee', 'junior', 'mid', 'senior', 'expert'] else 'OTHER'

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

    def get_create_job_offer_query_input(self, job_offer: dict) -> dict:
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
        levels = self._format_experience_level(
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
            "levels": levels,
            "contractType": contract_type
        }

    def get_create_company_query_input(self, job_offer):
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

    def get_job_offers(self):
        return self._fetch_job_offers()


just_join_it_scraper = JustJoinItScraper()
just_join_it_scraper.create_all_job_offers_with_companies()
