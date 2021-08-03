import pycountry

from typing import Union, Tuple, List
from currency_converter import CurrencyConverter

from authentication import Authentication
from base_scraper import BaseScraper


class NoFluffJobsScraper(BaseScraper):
    def __init__(self):
        self.authentication = Authentication()
        (access_token, refresh_token) = self.authentication.fetch_tokens()
        self.access_token = access_token
        self.refresh_token = refresh_token

    def get_base_url(self):
        return "https://nofluffjobs.com/api/search/posting"

    def _format_skills(self, skill: str) -> List[str]:
        return [skill]

    def _format_experience_level(self, experience_levels: List[str]) -> List[str]:
        return [experience_level.upper()
                if experience_level.lower() in ['trainee', 'junior', 'mid', 'senior', 'expert'] else 'OTHER'
                for experience_level in experience_levels]

    def _format_contract_type(self, contract_type: str) -> str:
        return {
            'b2b': 'B2B',
            'permanent': 'UOP',
            'zlecenie': 'UZ'
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

    def get_create_job_offer_query_input(self, job_offer: dict) -> dict:
        title = None
        employer_name = None
        logo = None
        country = None
        city = None
        street = None
        min_salary = None
        max_salary = None
        skills = []
        levels = []
        contract_type = None

        try:
            title = job_offer["title"]
        except KeyError:
            pass

        try:
            employer_name = job_offer["name"]
        except KeyError:
            pass

        try:
            logo = job_offer["logo"]["original"]
        except KeyError:
            pass

        try:
            country = job_offer["location"]["places"][0]["country"]["code"]
            country = pycountry.countries.get(alpha_3=country)
            country = country.alpha_2
        except KeyError:
            pass

        try:
            city = job_offer["location"]["places"][0]["city"]
        except KeyError:
            pass

        try:
            street = job_offer["location"]["places"][0]["street"]
        except KeyError:
            pass

        try:
            (min_salary, max_salary) = self._convert_salary(
                job_offer["salary"])
        except KeyError:
            pass

        try:
            skills = self._format_skills(job_offer["technology"])
        except KeyError:
            pass

        try:
            levels = self._format_experience_level(job_offer["seniority"])
        except KeyError:
            pass

        try:
            contract_type = self._format_contract_type(
                job_offer["salary"]["type"])
        except KeyError:
            pass

        return {
            "title": title,
            "employer": {
                "name": employer_name,
                "address": {
                    "country": country,
                    "city": city,
                    "street": street
                },
                "logo": logo
            },
            "minSalary": min_salary,
            "maxSalary": max_salary,
            "skills": skills,
            "levels": levels,
            "contractType": contract_type
        }

    def get_create_company_query_input(self, job_offer):
        employer_name = None
        logo = None
        country = None
        city = None
        street = None

        try:
            employer_name = job_offer["name"]
        except KeyError:
            pass

        try:
            logo = job_offer["logo"]["original"]
        except KeyError:
            pass

        try:
            country = job_offer["location"]["places"][0]["country"]["code"]
        except KeyError:
            pass

        try:
            city = job_offer["location"]["places"][0]["city"]
        except KeyError:
            pass

        try:
            street = job_offer["location"]["places"][0]["street"]
        except KeyError:
            pass

        return {
            "name": employer_name,
            "address": {
                "country": country,
                "city": city,
                "street": street
            },
            "logo": logo
        }

    def get_job_offers(self):
        return self._fetch_job_offers()["postings"]


no_fluff_jobs_scraper = NoFluffJobsScraper()
no_fluff_jobs_scraper.create_all_job_offers_with_companies()
