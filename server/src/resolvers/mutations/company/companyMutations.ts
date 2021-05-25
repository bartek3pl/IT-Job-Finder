import { AuthenticationError } from 'apollo-server-express';

import {
  CreateCompanyInput,
  UpdateCompanyInput,
  CompanyResponse,
  Company as CompanyType,
  Scalars,
} from '../../../types/graphql';
import { Token } from '../../../types/shared';
import { timestampToDateTime } from '../../../utils/converters';
import { isNullish } from '../../../utils/checkers';
import C from './constants';
import globalC from '../../../constants';
import Company from '../../../models/company';

const databaseErrorResponse: CompanyResponse = {
  code: 500,
  success: false,
  message: 'Internal database query error.',
  company: null,
};

const companyMutations = {
  createCompany: async (
    _parent: unknown,
    {
      input: { name, address, employeesNumber, logo },
    }: { input: CreateCompanyInput },
    token: Token
  ): Promise<CompanyResponse> => {
    if (!token) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    const createdDateTime = timestampToDateTime(new Date());
    let company: CompanyType;

    try {
      company = await Company.create({
        name,
        address,
        employeesNumber,
        logo,
        createdDateTime,
        updatedDateTime: createdDateTime,
      });
    } catch (error) {
      console.error(error);
      return databaseErrorResponse;
    }

    return {
      code: 200,
      success: true,
      message: C.COMPANY_SUCCESSFULLY_CREATED,
      company,
    };
  },

  deleteCompany: async (
    _parent: unknown,
    { id }: { id: Scalars['ID'] },
    token: Token
  ): Promise<CompanyResponse> => {
    if (!token) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    let company: CompanyType;

    try {
      const isCompanyInDatabase = await Company.exists({ _id: id });

      if (!isCompanyInDatabase) {
        return {
          code: 404,
          success: false,
          message: C.COMPANY_NOT_EXISTS,
          company: null,
        };
      }

      company = await Company.findByIdAndDelete(id).lean();
    } catch (error) {
      console.error(error);
      return databaseErrorResponse;
    }

    return {
      code: 200,
      success: true,
      message: C.COMPANY_SUCCESSFULLY_DELETED,
      company,
    };
  },

  updateCompany: async (
    _parent: unknown,
    {
      id,
      input: { name, address, employeesNumber, logo },
    }: { id: Scalars['ID']; input: UpdateCompanyInput },
    token: Token
  ): Promise<CompanyResponse> => {
    if (!token) {
      throw new AuthenticationError(globalC.INVALID_AUTHENTICATION_TOKEN);
    }

    const updatedDateTime = timestampToDateTime(new Date());
    let company: CompanyType;

    try {
      const isCompanyInDatabase = await Company.exists({ _id: id });

      if (!isCompanyInDatabase) {
        return {
          code: 404,
          success: false,
          message: C.COMPANY_NOT_EXISTS,
          company: null,
        };
      }

      company = await Company.findById(id);

      let updatedName = name;
      let updatedAddress = address;
      let updatedEmployeesNumber = employeesNumber;
      let updatedLogo = logo;

      if (isNullish(updatedName)) {
        updatedName = company.name;
      }
      if (isNullish(updatedAddress)) {
        updatedAddress = company.address;
      }
      if (isNullish(updatedEmployeesNumber)) {
        updatedEmployeesNumber = company.employeesNumber;
      }
      if (isNullish(updatedLogo)) {
        updatedLogo = company.logo;
      }

      company = await Company.findByIdAndUpdate(
        id,
        {
          name: updatedName,
          address: updatedAddress,
          employeesNumber: updatedEmployeesNumber,
          logo: updatedLogo,
          updatedDateTime,
        },
        { new: true }
      ).lean();
    } catch (error) {
      console.error(error);
      return databaseErrorResponse;
    }

    return {
      code: 200,
      success: true,
      message: C.COMPANY_SUCCESSFULLY_UPDATED,
      company,
    };
  },
};

export default companyMutations;
