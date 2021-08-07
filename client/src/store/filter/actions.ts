import c from './constants';
import { FiltersData } from './reducers';

export const getFilters = () => (dispatch: Function) => {
  dispatch({ type: c.GET_FILTERS });
};

export const saveFilters = (filters: FiltersData) => (dispatch: Function) => {
  const {
    title,
    employer,
    minSalary,
    maxSalary,
    levels,
    skills,
    contractTypes,
  } = filters;
  dispatch({
    type: c.SAVE_FILTERS,
    title,
    employer,
    minSalary,
    maxSalary,
    levels,
    skills,
    contractTypes,
  });
};

export const saveTitle = (title: string) => (dispatch: Function) => {
  dispatch({ type: c.SAVE_TITLE, title });
};
