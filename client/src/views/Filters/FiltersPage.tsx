import React, { FC, FormEvent, ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { ContractType, Level } from '@typings/graphql';
import JobOfferFormattingService from '@services/jobOfferFormattingService';
import colors from '@styles/colors';
import { SKILLS } from '@utils/constants/constants';
import Subheader from '@components/ui/Subheader/Subheader';
import Text from '@components/ui/Text/Text';
import TextField from '@components/ui/TextField/TextField';
import TextButton from '@components/ui/TextButtons/TextButton';
import SelectTextButton from '@components/ui/TextButtons/SelectTextButton';
import Slider from '@components/ui/Slider/Slider';
import CloseButton from '@components/ui/SideButtons/CloseButton';
import { FilterReducers, FiltersData } from '../../store/filter/reducers';

interface FilterPageProps {
  closeModal?: () => void;
  applyFilters: (filtersData: any) => void;
}

const StyledFiltersPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  margin-top: 30px;
`;

const SubheaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const InputLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const LocationWrapper = styled.div`
  display: flex;
  gap: 40px;
`;

const SelectTextButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 30px;
`;

const SalaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const SliderWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const ApplyFiltersWrapper = styled.div`
  margin-top: 30px;
`;

const jobOfferFormattingService = new JobOfferFormattingService();

const FiltersPage: FC<FilterPageProps> = ({ closeModal, applyFilters }) => {
  const filtersData = useSelector<FilterReducers, FiltersData>(
    (state) => state.filterReducers
  );

  const sliderMinSalary = filtersData.minSalary / 1000;
  const sliderMaxSalary = filtersData.maxSalary / 1000;

  const [company, setCompany] = useState(filtersData.employer.name);
  const [country, setCountry] = useState(filtersData.employer.address.country);
  const [city, setCity] = useState(filtersData.employer.address.city);
  const [salary, setSalary] = useState([sliderMinSalary, sliderMaxSalary]);
  const [skills, setSkills] = useState<Array<string>>(filtersData.skills);
  const [levels, setLevels] = useState<Array<Level>>(filtersData.levels);
  const [contractTypes, setContractTypes] = useState<Array<ContractType>>(
    filtersData.contractTypes
  );

  const handleCompany = (event: FormEvent<HTMLInputElement>) => {
    setCompany(event.currentTarget.value);
  };

  const handleCountry = (event: FormEvent<HTMLInputElement>) => {
    setCountry(event.currentTarget.value);
  };

  const handleCity = (event: FormEvent<HTMLInputElement>) => {
    setCity(event.currentTarget.value);
  };

  const handleSalary = (_event: ChangeEvent<{}>, value: number | number[]) => {
    if (typeof value === 'object' && value.length === 2) {
      setSalary(value);
    }
  };

  const addSkill = (skill: string) => {
    setSkills([...skills, skill]);
  };

  const deleteSkill = (skill: string) => {
    setSkills([...skills.filter((s) => s !== skill)]);
  };

  const handleSkill = (skill: string) => {
    if (isSkillChecked(skill)) {
      deleteSkill(skill);
    } else {
      addSkill(skill);
    }
  };

  const isSkillChecked = (skill: string) => {
    return !!skills.includes(skill);
  };

  const addLevel = (level: Level) => {
    setLevels([...levels, level]);
  };

  const deleteLevel = (level: Level) => {
    setLevels([...levels.filter((lvl) => lvl !== level)]);
  };

  const isLevelChecked = (level: Level) => {
    return !!levels.includes(level);
  };

  const handleLevel = (level: Level) => {
    if (isLevelChecked(level)) {
      deleteLevel(level);
    } else {
      addLevel(level);
    }
  };

  const addContractType = (contractType: ContractType) => {
    setContractTypes([...contractTypes, contractType]);
  };

  const deleteContractType = (contractType: ContractType) => {
    setContractTypes([
      ...contractTypes.filter((conType) => conType !== contractType),
    ]);
  };

  const isContractTypeChecked = (contractType: ContractType) => {
    return !!contractTypes.includes(contractType);
  };

  const handleContractType = (contractType: ContractType) => {
    if (isContractTypeChecked(contractType)) {
      deleteContractType(contractType);
    } else {
      addContractType(contractType);
    }
  };

  const getSkillsTextButtons = () => {
    return SKILLS.map((skill) => (
      <SelectTextButton
        size={30}
        verticalPadding={25}
        horizontalPadding={45}
        borderRadius={35}
        border
        handleClick={() => handleSkill(skill)}
        checked={isSkillChecked(skill)}
        key={skill}
      >
        {skill}
      </SelectTextButton>
    ));
  };

  const getLevelsTextButtons = () => {
    const levels = Object.values(Level);
    return levels.map((level) => (
      <SelectTextButton
        size={30}
        verticalPadding={25}
        horizontalPadding={45}
        borderRadius={35}
        border
        handleClick={() => handleLevel(level)}
        checked={isLevelChecked(level)}
        key={level}
      >
        {jobOfferFormattingService.lowerAndCapitalizeFirstLetter(level)}
      </SelectTextButton>
    ));
  };

  const getContractTypesTextButtons = () => {
    const contractTypes = Object.values(ContractType);
    return contractTypes.map((contractType) => (
      <SelectTextButton
        size={30}
        verticalPadding={25}
        horizontalPadding={45}
        borderRadius={35}
        border
        handleClick={() => handleContractType(contractType)}
        checked={isContractTypeChecked(contractType)}
        key={contractType}
      >
        {contractType === ContractType.Other
          ? jobOfferFormattingService.lowerAndCapitalizeFirstLetter(
              contractType
            )
          : contractType}
      </SelectTextButton>
    ));
  };

  const getCurrentFiltersData = () => {
    const [minSalary, maxSalary] = salary;
    return {
      employer: { name: company, address: { country, city } },
      minSalary: minSalary * 1000,
      maxSalary: maxSalary * 1000,
      skills,
      levels,
      contractTypes,
    };
  };

  const skillsTextButtons = getSkillsTextButtons();

  const levelsTextButtons = getLevelsTextButtons();

  const contractTypesTextButtons = getContractTypesTextButtons();

  const currentFiltersData = getCurrentFiltersData();

  return (
    <StyledFiltersPage>
      <CloseButton handleClick={closeModal} />

      <SubheaderWrapper>
        <Subheader>Set Filters</Subheader>
      </SubheaderWrapper>
      <InputLabelWrapper>
        <Text size={35} weight={600}>
          Company
        </Text>
        <TextField
          type="text"
          alt="company"
          name="company"
          placeholder="Type company..."
          value={company}
          border
          handleChange={handleCompany}
        />
      </InputLabelWrapper>
      <LocationWrapper>
        <InputLabelWrapper>
          <Text size={35} weight={600}>
            Country
          </Text>
          <TextField
            type="text"
            alt="country"
            name="country"
            placeholder="Type country..."
            value={country}
            border
            handleChange={handleCountry}
          />
        </InputLabelWrapper>
        <InputLabelWrapper>
          <Text size={35} weight={600}>
            City
          </Text>
          <TextField
            type="text"
            alt="city"
            name="city"
            placeholder="Type city..."
            value={city}
            border
            handleChange={handleCity}
          />
        </InputLabelWrapper>
      </LocationWrapper>

      <InputLabelWrapper>
        <SalaryWrapper>
          <Text size={30} weight={600} color={colors.secondary}>
            Min. Salary
          </Text>
          <Text size={30} weight={600} color={colors.secondary}>
            Max. Salary
          </Text>
        </SalaryWrapper>
        <SliderWrapper>
          <Slider value={salary} min={0} max={50} handleChange={handleSalary} />
        </SliderWrapper>
      </InputLabelWrapper>

      <InputLabelWrapper>
        <Text size={35} weight={600}>
          Skills
        </Text>
        <SelectTextButtonWrapper>{skillsTextButtons}</SelectTextButtonWrapper>
      </InputLabelWrapper>

      <InputLabelWrapper>
        <Text size={35} weight={600}>
          Levels
        </Text>
        <SelectTextButtonWrapper>{levelsTextButtons}</SelectTextButtonWrapper>
      </InputLabelWrapper>

      <InputLabelWrapper>
        <Text size={35} weight={600}>
          Contract Types
        </Text>
        <SelectTextButtonWrapper>
          {contractTypesTextButtons}
        </SelectTextButtonWrapper>
      </InputLabelWrapper>

      <ApplyFiltersWrapper>
        <TextButton
          fullWidth
          flat
          handleClick={() => applyFilters(currentFiltersData)}
        >
          Apply filters
        </TextButton>
      </ApplyFiltersWrapper>
    </StyledFiltersPage>
  );
};

FiltersPage.defaultProps = {
  closeModal: () => {},
  applyFilters: () => {},
};

export default FiltersPage;
