import { ContractType, Level } from '@typings/graphql';
import c from './constants';
import initialState from './initialState';

export interface FiltersData {
  title: string;
  employer: {
    name: string;
    address: {
      country: string;
      city: string;
    };
  };
  minSalary: number;
  maxSalary: number;
  skills: Array<string>;
  levels: Array<Level>;
  contractTypes: Array<ContractType>;
}

export interface FilterReducers {
  filterReducers: FiltersData;
}

export default (state: FiltersData = initialState, action: any) => {
  switch (action.type) {
    case c.GET_FILTERS:
      return {
        ...state,
      };
    case c.SAVE_FILTERS:
      return {
        ...state,
        title: action.title,
        employer: action.employer,
        minSalary: action.minSalary,
        maxSalary: action.maxSalary,
        levels: action.levels,
        skills: action.skills,
        contractTypes: action.contractTypes,
      };
    case c.SAVE_TITLE:
      return {
        ...state,
        title: action.title,
      };

    default:
      return state;
  }
};
