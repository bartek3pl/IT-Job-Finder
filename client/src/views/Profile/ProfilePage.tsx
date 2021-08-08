import React, { FC, ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';

import JobOfferFormattingService from '@services/jobOfferFormattingService';
import AuthenticationService from '@services/authenticationService';
import { GET_USER_BY_ID } from '@api/user/queries';
import { UPDATE_USER } from '@api/user/mutations';
import {
  GLOBAL_PADDING,
  MAX_SALARY,
  MIN_SALARY,
  SKILLS,
} from '@utils/constants/constants';
import colors from '@styles/colors';
import BackButton from '@components/ui/SideButtons/BackButton';
import Subheader from '@components/ui/Subheader/Subheader';
import Text from '@components/ui/Text/Text';
import TextField from '@components/ui/TextField/TextField';
import TextButton from '@components/ui/TextButtons/TextButton';
import Slider from '@components/ui/Slider/Slider';
import SelectTextButton from '@components/ui/TextButtons/SelectTextButton';
import { Level, ContractType } from '@typings/graphql';

const StyledProfilePage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: ${GLOBAL_PADDING};
  padding-top: 96px;
  padding-bottom: 96px;
  background-color: ${colors.lightBackground};
  min-height: 100%;
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

const InputsWrapper = styled.div`
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

const SaveSettingsWrapper = styled.div`
  margin-top: 30px;
`;

const jobOfferFormattingService = new JobOfferFormattingService();
const authenticationService = new AuthenticationService();
const user = authenticationService.getUser();

const ProfilePage: FC = () => {
  const { data } = useQuery(GET_USER_BY_ID, {
    variables: {
      id: user._id,
    },
  });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState<number | string>('');
  const [githubLink, setGithubLink] = useState('');
  const [linkedinLink, setLinkedinLink] = useState('');
  const [salary, setSalary] = useState([MIN_SALARY / 1000, MAX_SALARY / 1000]);
  const [skills, setSkills] = useState<Array<string>>([]);
  const [levels, setLevels] = useState<Array<Level>>([]);
  const [contractTypes, setContractTypes] = useState<Array<ContractType>>([]);

  const [updateUser] = useMutation(UPDATE_USER);

  const updateUserData = () => {
    const userData = data?.getUserById?.user;
    if (userData) {
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
      setEmail(userData.email || '');
      setCountry(userData.address.country || '');
      setCity(userData.address.city || '');
      setGender(userData.gender || '');
      setAge(userData.age || '');
      setSalary([
        (userData.minSalary || MIN_SALARY) / 1000,
        (userData.maxSalary || MAX_SALARY) / 1000,
      ]);
      setSkills(userData.skills || []);
      setLevels(userData.levels || []);
      setContractTypes(userData.contractTypes || []);
      setLinkedinLink(userData.linkedinLink || '');
      setGithubLink(userData.githubLink || '');
    }
  };

  useEffect(() => {
    updateUserData();
  }, [data]);

  const handleFirstName = (event: FormEvent<HTMLInputElement>) => {
    setFirstName(event.currentTarget.value);
  };

  const handleLastName = (event: FormEvent<HTMLInputElement>) => {
    setLastName(event.currentTarget.value);
  };

  const handleEmail = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handleCountry = (event: FormEvent<HTMLInputElement>) => {
    setCountry(event.currentTarget.value);
  };

  const handleCity = (event: FormEvent<HTMLInputElement>) => {
    setCity(event.currentTarget.value);
  };

  const handleGender = (event: FormEvent<HTMLInputElement>) => {
    setGender(event.currentTarget.value);
  };

  const handleAge = (event: FormEvent<HTMLInputElement>) => {
    const numValue = parseInt(event.currentTarget.value, 10);
    setAge(numValue);
  };

  const handleLinkedinLink = (event: FormEvent<HTMLInputElement>) => {
    setLinkedinLink(event.currentTarget.value);
  };

  const handleGithubLink = (event: FormEvent<HTMLInputElement>) => {
    setGithubLink(event.currentTarget.value);
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

  const getCurrentSettingsData = () => {
    const [minSalary, maxSalary] = salary;
    return {
      firstName,
      lastName,
      gender: gender ? gender : 'OTHER',
      age: age ? age : null,
      email,
      address: { country, city },
      minSalary: minSalary * 1000,
      maxSalary: maxSalary * 1000,
      skills,
      levels,
      contractTypes,
      linkedinLink,
      githubLink,
    };
  };

  const handleSaveSettings = async () => {
    const userId = user._id;
    const settingsData = getCurrentSettingsData();
    try {
      await updateUser({
        variables: { id: userId, input: settingsData },
      });
    } catch (error) {
      console.error(error);
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

  const skillsTextButtons = getSkillsTextButtons();

  const levelsTextButtons = getLevelsTextButtons();

  const contractTypesTextButtons = getContractTypesTextButtons();

  return (
    <StyledProfilePage>
      <BackButton />
      <SubheaderWrapper>
        <Subheader>Profile</Subheader>
      </SubheaderWrapper>

      <InputsWrapper>
        <InputLabelWrapper>
          <Text size={35} weight={600}>
            First Name
          </Text>
          <TextField
            type="text"
            alt="first name"
            name="first name"
            placeholder="Type first name..."
            border
            value={firstName}
            handleChange={handleFirstName}
          />
        </InputLabelWrapper>
        <InputLabelWrapper>
          <Text size={35} weight={600}>
            Last name
          </Text>
          <TextField
            type="text"
            alt="last name"
            name="last name"
            placeholder="Type last name..."
            border
            value={lastName}
            handleChange={handleLastName}
          />
        </InputLabelWrapper>
      </InputsWrapper>
      <InputLabelWrapper>
        <Text size={35} weight={600}>
          Email Address
        </Text>
        <TextField
          type="text"
          alt="email"
          name="email"
          placeholder="Type email address..."
          border
          value={email}
          handleChange={handleEmail}
        />
      </InputLabelWrapper>
      <InputsWrapper>
        <InputLabelWrapper>
          <Text size={35} weight={600}>
            Country
          </Text>
          <TextField
            type="text"
            alt="country"
            name="country"
            placeholder="Type country..."
            border
            value={country}
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
            border
            value={city}
            handleChange={handleCity}
          />
        </InputLabelWrapper>
      </InputsWrapper>

      <InputsWrapper>
        <InputLabelWrapper>
          <Text size={35} weight={600}>
            Gender
          </Text>
          <TextField
            type="text"
            alt="gender"
            name="gender"
            placeholder="Type gender..."
            border
            value={gender}
            handleChange={handleGender}
          />
        </InputLabelWrapper>
        <InputLabelWrapper>
          <Text size={35} weight={600}>
            Age
          </Text>
          <TextField
            type="number"
            alt="age"
            name="age"
            placeholder="Type age..."
            border
            value={age}
            handleChange={handleAge}
          />
        </InputLabelWrapper>
      </InputsWrapper>

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

      <InputLabelWrapper>
        <Text size={35} weight={600}>
          Linkedin link
        </Text>
        <TextField
          type="text"
          alt="linkedin link"
          name="linkedin link"
          placeholder="Type linkedin link..."
          border
          value={linkedinLink}
          handleChange={handleLinkedinLink}
        />
      </InputLabelWrapper>
      <InputLabelWrapper>
        <Text size={35} weight={600}>
          Github link
        </Text>
        <TextField
          type="text"
          alt="github link"
          name="github link"
          placeholder="Type github link..."
          border
          value={githubLink}
          handleChange={handleGithubLink}
        />
      </InputLabelWrapper>

      <SaveSettingsWrapper>
        <TextButton fullWidth flat handleClick={handleSaveSettings}>
          Save settings
        </TextButton>
      </SaveSettingsWrapper>
    </StyledProfilePage>
  );
};

export default ProfilePage;
