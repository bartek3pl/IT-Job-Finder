import { AuthenticationError } from 'apollo-server-express';

import {
  CompanyResponse,
  CompaniesResponse,
  Company as CompanyType,
  CompanySearch,
  Scalars,
} from '../../../types/graphql';
import { Token } from '../../../types/shared';
import C from './constants';
import globalC from '../../../constants';
import Company from '../../../models/company';
import config from '../../../config';
import { getPageInfo } from '../../../utils/pagination';

const databaseErrorCompaniesResponse: CompaniesResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  results: null,
};

const databaseErrorCompanyResponse: CompanyResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  company: null,
};

const companyQueries = {
  getAllCompanies: async (
    _parent: unknown,
    {
      first = config.PAGE_SIZE,
      offset = 0,
      sorting,
      search: { name, address } = {
        name: '',
        address: { country: '', city: '' },
      },
    }: {
      first: Scalars['Int'];
      offset: Scalars['Int'];
      sorting: Scalars['String'];
      search: CompanySearch;
    },
    { accessToken }: { accessToken: Token }
  ): Promise<CompaniesResponse> => {
    if (!accessToken) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    const query = {
      $and: [
        name ? { name: { $regex: name, $options: 'i' } } : {},
        address?.country
          ? {
              'address.country': {
                $regex: address?.country,
                $options: 'i',
              },
            }
          : {},
        address?.city
          ? { 'address.city': { $regex: address?.city, $options: 'i' } }
          : {},
      ],
    };
    const pageInfo = await getPageInfo(Company, query, first, offset);
    let companies: Array<CompanyType>;

    try {
      companies = await Company.find(query)
        .sort(sorting)
        .skip(offset)
        .limit(first)
        .lean();

      if (!companies?.length) {
        return {
          code: 404,
          success: true,
          message: C.NO_COMPANIES_IN_DATABASE,
          results: {
            pageInfo,
            companies,
          },
        };
      }
    } catch (error) {
      console.error(error);
      return databaseErrorCompaniesResponse;
    }

    return {
      code: 200,
      success: true,
      message: C.COMPANIES_SUCCESSFULLY_FETCHED,
      results: {
        pageInfo,
        companies,
      },
    };
  },

  getCompanyById: async (
    _parent: unknown,
    { id }: { id: Scalars['ID'] },
    { accessToken }: { accessToken: Token }
  ): Promise<CompanyResponse> => {
    if (!accessToken) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    let company: CompanyType;

    try {
      company = await Company.findById(id).lean();

      if (!company) {
        return {
          code: 404,
          success: false,
          message: C.COMPANY_NOT_EXISTS,
          company: null,
        };
      }
    } catch (error) {
      console.error(error);
      return databaseErrorCompanyResponse;
    }

    return {
      code: 200,
      success: true,
      message: C.COMPANY_SUCCESSFULLY_FETCHED,
      company,
    };
  },
};

export default companyQueries;
