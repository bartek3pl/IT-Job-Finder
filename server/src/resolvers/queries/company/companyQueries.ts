import { AuthenticationError } from 'apollo-server-express';

import {
  CompanyResponse,
  CompaniesResponse,
  Company as CompanyType,
  Scalars,
} from '../../../types/graphql';
import { Token } from '../../../types/shared';
import C from './constants';
import globalC from '../../../constants';
import Company from '../../../models/company';

const databaseErrorCompaniesResponse: CompaniesResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  companies: null,
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
    _args: unknown,
    token: Token
  ): Promise<CompaniesResponse> => {
    if (!token) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    let companies: Array<CompanyType>;

    try {
      companies = await Company.find({}).lean();

      if (!companies?.length) {
        return {
          code: 404,
          success: true,
          message: C.NO_COMPANIES_IN_DATABASE,
          companies,
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
      companies,
    };
  },

  getCompanyById: async (
    _parent: unknown,
    { id }: { id: Scalars['ID'] },
    token: Token
  ): Promise<CompanyResponse> => {
    if (!token) {
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
