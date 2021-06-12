import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A DateTime string. */
  DateTime: any;
  /** An Email string. */
  Email: any;
  /** A Postal Code list (pair of country and postal code) representing postal code in specific country. */
  PostalCode: any;
  /** A Salary integer representing amount of money earned for a month. */
  Salary: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type AccessRefreshTokenResponse = Response & {
  __typename?: 'AccessRefreshTokenResponse';
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type AccessTokenResponse = Response & {
  __typename?: 'AccessTokenResponse';
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  accessToken?: Maybe<Scalars['String']>;
};

/** Full address details of user or company */
export type Address = {
  __typename?: 'Address';
  country?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['PostalCode']>;
  buildingNumber?: Maybe<Scalars['Int']>;
  apartmentNumber?: Maybe<Scalars['Int']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CompaniesResponse = Response & {
  __typename?: 'CompaniesResponse';
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  results?: Maybe<CompanyResults>;
};

/** Full details about company */
export type Company = {
  __typename?: 'Company';
  _id: Scalars['ID'];
  name: Scalars['String'];
  address: Address;
  employeesNumber?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  createdDateTime: Scalars['DateTime'];
  updatedDateTime: Scalars['DateTime'];
};

export type CompanyResponse = Response & {
  __typename?: 'CompanyResponse';
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  company?: Maybe<Company>;
};

export type CompanyResults = Page & {
  __typename?: 'CompanyResults';
  pageInfo: PageInfo;
  companies?: Maybe<Array<Maybe<Company>>>;
};

export type CompanySearch = {
  name?: Maybe<Scalars['String']>;
  address?: Maybe<SearchAddress>;
};

/** Employment contract for the employee */
export enum ContractType {
  Uop = 'UOP',
  B2B = 'B2B',
  Uz = 'UZ',
  Other = 'OTHER'
}

export type CreateCompanyInput = {
  name: Scalars['String'];
  address?: Maybe<UpdateAddressInput>;
  employeesNumber?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
};

export type CreateJobOfferInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  employer: UpdateCompanyInput;
  minSalary?: Maybe<Scalars['Salary']>;
  maxSalary?: Maybe<Scalars['Salary']>;
  skills: Array<Scalars['String']>;
  experienceYears?: Maybe<Scalars['Int']>;
  level?: Maybe<Level>;
  contractType?: Maybe<ContractType>;
};

export type CreateUserInput = {
  login: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['Email'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
  gender?: Maybe<Gender>;
  address?: Maybe<UpdateAddressInput>;
  skills?: Maybe<Array<Scalars['String']>>;
  experienceYears?: Maybe<Scalars['Int']>;
  level?: Maybe<Level>;
  minSalary?: Maybe<Scalars['Salary']>;
  maxSalary?: Maybe<Scalars['Salary']>;
  githubLink?: Maybe<Scalars['String']>;
  linkedinLink?: Maybe<Scalars['String']>;
  emailNotification?: Maybe<Scalars['Boolean']>;
};



/** File to be uploaded (e.g. image) */
export type File = {
  __typename?: 'File';
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
};

export type FileInput = {
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
};

/** Gender of registered user */
export enum Gender {
  Man = 'MAN',
  Woman = 'WOMAN',
  Other = 'OTHER'
}

/** Full details about posted job offer */
export type JobOffer = {
  __typename?: 'JobOffer';
  _id: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  employer: Company;
  minSalary?: Maybe<Scalars['Salary']>;
  maxSalary?: Maybe<Scalars['Salary']>;
  skills: Array<Scalars['String']>;
  experienceYears?: Maybe<Scalars['Int']>;
  level?: Maybe<Level>;
  contractType?: Maybe<ContractType>;
  createdDateTime: Scalars['DateTime'];
  updatedDateTime: Scalars['DateTime'];
};

export type JobOfferResponse = Response & {
  __typename?: 'JobOfferResponse';
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  jobOffer?: Maybe<JobOffer>;
};

export type JobOfferResults = Page & {
  __typename?: 'JobOfferResults';
  pageInfo: PageInfo;
  jobOffers?: Maybe<Array<Maybe<JobOffer>>>;
};

export type JobOfferSearch = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  employer?: Maybe<CompanySearch>;
  minSalary?: Maybe<Scalars['Salary']>;
  maxSalary?: Maybe<Scalars['Salary']>;
  skills?: Maybe<Array<Scalars['String']>>;
  experienceYears?: Maybe<Scalars['Int']>;
  level?: Maybe<Level>;
  contractType?: Maybe<ContractType>;
};

export type JobOffersResponse = Response & {
  __typename?: 'JobOffersResponse';
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  results?: Maybe<JobOfferResults>;
};

/** Expected experience of the employee */
export enum Level {
  Junior = 'JUNIOR',
  Mid = 'MID',
  Senior = 'SENIOR',
  Other = 'OTHER'
}

export type LoginUserInput = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates user with required login, password and email fields. */
  createUser?: Maybe<UserResponse>;
  /** Deletes user by ID. */
  deleteUser?: Maybe<UserResponse>;
  /** Updates user by ID. */
  updateUser?: Maybe<UserResponse>;
  /** Creates job offer with with required title and employer fields. */
  createJobOffer?: Maybe<JobOfferResponse>;
  /** Deletes job offer by ID. */
  deleteJobOffer?: Maybe<JobOfferResponse>;
  /** Updates job offer by ID. */
  updateJobOffer?: Maybe<JobOfferResponse>;
  /** Creates company with with required title and employer fields. */
  createCompany?: Maybe<CompanyResponse>;
  /** Deletes company by ID. */
  deleteCompany?: Maybe<CompanyResponse>;
  /** Updates company by ID. */
  updateCompany?: Maybe<CompanyResponse>;
  /** Adds chosen job offer to chosen user favourite job offers. */
  addJobOfferToUserFavourite?: Maybe<UserFavouriteJobOffersResponse>;
  /** Deletes chosen job offer from chosen user favourite job offers. */
  deleteJobOfferFromUserFavourite?: Maybe<UserFavouriteJobOffersResponse>;
  /** Logins and authorizes user with login and password. */
  login?: Maybe<UserTokenResponse>;
  /** Verifies access token validity. */
  verifyAccessToken?: Maybe<AccessTokenResponse>;
  /** Generates new access and refresh token by refresh token. */
  generateTokensByRefreshToken?: Maybe<AccessRefreshTokenResponse>;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input?: Maybe<UpdateUserInput>;
};


export type MutationCreateJobOfferArgs = {
  input?: Maybe<CreateJobOfferInput>;
};


export type MutationDeleteJobOfferArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateJobOfferArgs = {
  id: Scalars['ID'];
  input?: Maybe<UpdateJobOfferInput>;
};


export type MutationCreateCompanyArgs = {
  input?: Maybe<CreateCompanyInput>;
};


export type MutationDeleteCompanyArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateCompanyArgs = {
  id: Scalars['ID'];
  input?: Maybe<UpdateCompanyInput>;
};


export type MutationAddJobOfferToUserFavouriteArgs = {
  userId?: Maybe<Scalars['ID']>;
  jobOfferId?: Maybe<Scalars['ID']>;
};


export type MutationDeleteJobOfferFromUserFavouriteArgs = {
  userId?: Maybe<Scalars['ID']>;
  jobOfferId?: Maybe<Scalars['ID']>;
};


export type MutationLoginArgs = {
  input?: Maybe<LoginUserInput>;
};


export type MutationVerifyAccessTokenArgs = {
  accessToken?: Maybe<Scalars['String']>;
};


export type MutationGenerateTokensByRefreshTokenArgs = {
  refreshToken?: Maybe<Scalars['String']>;
};

export type Page = {
  pageInfo: PageInfo;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  totalCount: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};


export type Query = {
  __typename?: 'Query';
  /** Gets all offset-based paginated users. */
  getAllUsers?: Maybe<UsersResponse>;
  /** Gets one user by user ID. */
  getUserById?: Maybe<UserResponse>;
  /** Gets all offset-based paginated job offers. */
  getAllJobOffers?: Maybe<JobOffersResponse>;
  /** Gets one job offer by job offer ID. */
  getJobOfferById?: Maybe<JobOfferResponse>;
  /** Gets all favourite job offers of chosen user. */
  getUserFavouriteJobOffers?: Maybe<JobOffersResponse>;
  /** Gets all offset-based paginated companies. */
  getAllCompanies?: Maybe<CompaniesResponse>;
  /** Gets one company by company ID. */
  getCompanyById?: Maybe<CompanyResponse>;
};


export type QueryGetAllUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sorting?: Maybe<Scalars['String']>;
  search?: Maybe<UserSearch>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetAllJobOffersArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sorting?: Maybe<Scalars['String']>;
  search?: Maybe<JobOfferSearch>;
};


export type QueryGetJobOfferByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserFavouriteJobOffersArgs = {
  id: Scalars['ID'];
};


export type QueryGetAllCompaniesArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sorting?: Maybe<Scalars['String']>;
  search?: Maybe<CompanySearch>;
};


export type QueryGetCompanyByIdArgs = {
  id: Scalars['ID'];
};

export type Response = {
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
};


export type SearchAddress = {
  country?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
};

/** Full JWT token payload details. */
export type Token = {
  __typename?: 'Token';
  typ: Scalars['String'];
  exp: Scalars['Int'];
  sub: Scalars['Int'];
  iss: Scalars['String'];
  aud: Scalars['String'];
  iat: Scalars['String'];
};

export type UpdateAddressInput = {
  country?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['PostalCode']>;
  buildingNumber?: Maybe<Scalars['Int']>;
  apartmentNumber?: Maybe<Scalars['Int']>;
};

export type UpdateCompanyInput = {
  name?: Maybe<Scalars['String']>;
  address?: Maybe<UpdateAddressInput>;
  employeesNumber?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
};

export type UpdateJobOfferInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  employer?: Maybe<UpdateCompanyInput>;
  minSalary?: Maybe<Scalars['Salary']>;
  maxSalary?: Maybe<Scalars['Salary']>;
  skills?: Maybe<Array<Scalars['String']>>;
  experienceYears?: Maybe<Scalars['Int']>;
  level?: Maybe<Level>;
  contractType?: Maybe<ContractType>;
};

export type UpdateUserInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
  gender?: Maybe<Gender>;
  address?: Maybe<UpdateAddressInput>;
  skills?: Maybe<Array<Scalars['String']>>;
  experienceYears?: Maybe<Scalars['Int']>;
  level?: Maybe<Level>;
  minSalary?: Maybe<Scalars['Salary']>;
  maxSalary?: Maybe<Scalars['Salary']>;
  githubLink?: Maybe<Scalars['String']>;
  linkedinLink?: Maybe<Scalars['String']>;
  emailNotification?: Maybe<Scalars['Boolean']>;
};


/** Full details about registered user */
export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  login: Scalars['String'];
  password: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email: Scalars['Email'];
  age?: Maybe<Scalars['Int']>;
  gender?: Maybe<Gender>;
  address?: Maybe<Address>;
  skills?: Maybe<Array<Maybe<Scalars['String']>>>;
  experienceYears?: Maybe<Scalars['Int']>;
  level?: Maybe<Level>;
  minSalary?: Maybe<Scalars['Salary']>;
  maxSalary?: Maybe<Scalars['Salary']>;
  githubLink?: Maybe<Scalars['String']>;
  linkedinLink?: Maybe<Scalars['String']>;
  favouriteJobOffers?: Maybe<Array<Maybe<JobOffer>>>;
  emailNotification?: Maybe<Scalars['Boolean']>;
  createdDateTime: Scalars['DateTime'];
  updatedDateTime: Scalars['DateTime'];
};

export type UserFavouriteJobOffersResponse = Response & {
  __typename?: 'UserFavouriteJobOffersResponse';
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  user?: Maybe<User>;
  jobOffers?: Maybe<Array<Maybe<JobOffer>>>;
};

export type UserResponse = Response & {
  __typename?: 'UserResponse';
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  user?: Maybe<User>;
};

export type UserResults = Page & {
  __typename?: 'UserResults';
  pageInfo: PageInfo;
  users?: Maybe<Array<Maybe<User>>>;
};

export type UserSearch = {
  login?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['Email']>;
  age?: Maybe<Scalars['Int']>;
  gender?: Maybe<Gender>;
  address?: Maybe<SearchAddress>;
  skills?: Maybe<Array<Scalars['String']>>;
  experienceYears?: Maybe<Scalars['Int']>;
  level?: Maybe<Level>;
  minSalary?: Maybe<Scalars['Salary']>;
  maxSalary?: Maybe<Scalars['Salary']>;
};

export type UserTokenResponse = Response & {
  __typename?: 'UserTokenResponse';
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  user?: Maybe<User>;
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type UsersResponse = Response & {
  __typename?: 'UsersResponse';
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  results?: Maybe<UserResults>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccessRefreshTokenResponse: ResolverTypeWrapper<AccessRefreshTokenResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  AccessTokenResponse: ResolverTypeWrapper<AccessTokenResponse>;
  Address: ResolverTypeWrapper<Address>;
  CacheControlScope: CacheControlScope;
  CompaniesResponse: ResolverTypeWrapper<CompaniesResponse>;
  Company: ResolverTypeWrapper<Company>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  CompanyResponse: ResolverTypeWrapper<CompanyResponse>;
  CompanyResults: ResolverTypeWrapper<CompanyResults>;
  CompanySearch: CompanySearch;
  ContractType: ContractType;
  CreateCompanyInput: CreateCompanyInput;
  CreateJobOfferInput: CreateJobOfferInput;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Email: ResolverTypeWrapper<Scalars['Email']>;
  File: ResolverTypeWrapper<File>;
  FileInput: FileInput;
  Gender: Gender;
  JobOffer: ResolverTypeWrapper<JobOffer>;
  JobOfferResponse: ResolverTypeWrapper<JobOfferResponse>;
  JobOfferResults: ResolverTypeWrapper<JobOfferResults>;
  JobOfferSearch: JobOfferSearch;
  JobOffersResponse: ResolverTypeWrapper<JobOffersResponse>;
  Level: Level;
  LoginUserInput: LoginUserInput;
  Mutation: ResolverTypeWrapper<{}>;
  Page: ResolversTypes['CompanyResults'] | ResolversTypes['JobOfferResults'] | ResolversTypes['UserResults'];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolversTypes['AccessRefreshTokenResponse'] | ResolversTypes['AccessTokenResponse'] | ResolversTypes['CompaniesResponse'] | ResolversTypes['CompanyResponse'] | ResolversTypes['JobOfferResponse'] | ResolversTypes['JobOffersResponse'] | ResolversTypes['UserFavouriteJobOffersResponse'] | ResolversTypes['UserResponse'] | ResolversTypes['UserTokenResponse'] | ResolversTypes['UsersResponse'];
  Salary: ResolverTypeWrapper<Scalars['Salary']>;
  SearchAddress: SearchAddress;
  Token: ResolverTypeWrapper<Token>;
  UpdateAddressInput: UpdateAddressInput;
  UpdateCompanyInput: UpdateCompanyInput;
  UpdateJobOfferInput: UpdateJobOfferInput;
  UpdateUserInput: UpdateUserInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserFavouriteJobOffersResponse: ResolverTypeWrapper<UserFavouriteJobOffersResponse>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  UserResults: ResolverTypeWrapper<UserResults>;
  UserSearch: UserSearch;
  UserTokenResponse: ResolverTypeWrapper<UserTokenResponse>;
  UsersResponse: ResolverTypeWrapper<UsersResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccessRefreshTokenResponse: AccessRefreshTokenResponse;
  Int: Scalars['Int'];
  Boolean: Scalars['Boolean'];
  String: Scalars['String'];
  AccessTokenResponse: AccessTokenResponse;
  Address: Address;
  CompaniesResponse: CompaniesResponse;
  Company: Company;
  ID: Scalars['ID'];
  CompanyResponse: CompanyResponse;
  CompanyResults: CompanyResults;
  CompanySearch: CompanySearch;
  CreateCompanyInput: CreateCompanyInput;
  CreateJobOfferInput: CreateJobOfferInput;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime'];
  Email: Scalars['Email'];
  File: File;
  FileInput: FileInput;
  JobOffer: JobOffer;
  JobOfferResponse: JobOfferResponse;
  JobOfferResults: JobOfferResults;
  JobOfferSearch: JobOfferSearch;
  JobOffersResponse: JobOffersResponse;
  LoginUserInput: LoginUserInput;
  Mutation: {};
  Page: ResolversParentTypes['CompanyResults'] | ResolversParentTypes['JobOfferResults'] | ResolversParentTypes['UserResults'];
  PageInfo: PageInfo;
  PostalCode: Scalars['PostalCode'];
  Query: {};
  Response: ResolversParentTypes['AccessRefreshTokenResponse'] | ResolversParentTypes['AccessTokenResponse'] | ResolversParentTypes['CompaniesResponse'] | ResolversParentTypes['CompanyResponse'] | ResolversParentTypes['JobOfferResponse'] | ResolversParentTypes['JobOffersResponse'] | ResolversParentTypes['UserFavouriteJobOffersResponse'] | ResolversParentTypes['UserResponse'] | ResolversParentTypes['UserTokenResponse'] | ResolversParentTypes['UsersResponse'];
  Salary: Scalars['Salary'];
  SearchAddress: SearchAddress;
  Token: Token;
  UpdateAddressInput: UpdateAddressInput;
  UpdateCompanyInput: UpdateCompanyInput;
  UpdateJobOfferInput: UpdateJobOfferInput;
  UpdateUserInput: UpdateUserInput;
  Upload: Scalars['Upload'];
  User: User;
  UserFavouriteJobOffersResponse: UserFavouriteJobOffersResponse;
  UserResponse: UserResponse;
  UserResults: UserResults;
  UserSearch: UserSearch;
  UserTokenResponse: UserTokenResponse;
  UsersResponse: UsersResponse;
};

export type CacheControlDirectiveArgs = {   maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>; };

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccessRefreshTokenResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccessRefreshTokenResponse'] = ResolversParentTypes['AccessRefreshTokenResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccessTokenResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccessTokenResponse'] = ResolversParentTypes['AccessTokenResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['PostalCode']>, ParentType, ContextType>;
  buildingNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  apartmentNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompaniesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompaniesResponse'] = ResolversParentTypes['CompaniesResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  results?: Resolver<Maybe<ResolversTypes['CompanyResults']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  employeesNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdDateTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedDateTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyResponse'] = ResolversParentTypes['CompanyResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyResults'] = ResolversParentTypes['CompanyResults']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  companies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Company']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Email'], any> {
  name: 'Email';
}

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobOfferResolvers<ContextType = any, ParentType extends ResolversParentTypes['JobOffer'] = ResolversParentTypes['JobOffer']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employer?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  minSalary?: Resolver<Maybe<ResolversTypes['Salary']>, ParentType, ContextType>;
  maxSalary?: Resolver<Maybe<ResolversTypes['Salary']>, ParentType, ContextType>;
  skills?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  experienceYears?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Level']>, ParentType, ContextType>;
  contractType?: Resolver<Maybe<ResolversTypes['ContractType']>, ParentType, ContextType>;
  createdDateTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedDateTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobOfferResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['JobOfferResponse'] = ResolversParentTypes['JobOfferResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  jobOffer?: Resolver<Maybe<ResolversTypes['JobOffer']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobOfferResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['JobOfferResults'] = ResolversParentTypes['JobOfferResults']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  jobOffers?: Resolver<Maybe<Array<Maybe<ResolversTypes['JobOffer']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobOffersResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['JobOffersResponse'] = ResolversParentTypes['JobOffersResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  results?: Resolver<Maybe<ResolversTypes['JobOfferResults']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, never>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>;
  createJobOffer?: Resolver<Maybe<ResolversTypes['JobOfferResponse']>, ParentType, ContextType, RequireFields<MutationCreateJobOfferArgs, never>>;
  deleteJobOffer?: Resolver<Maybe<ResolversTypes['JobOfferResponse']>, ParentType, ContextType, RequireFields<MutationDeleteJobOfferArgs, 'id'>>;
  updateJobOffer?: Resolver<Maybe<ResolversTypes['JobOfferResponse']>, ParentType, ContextType, RequireFields<MutationUpdateJobOfferArgs, 'id'>>;
  createCompany?: Resolver<Maybe<ResolversTypes['CompanyResponse']>, ParentType, ContextType, RequireFields<MutationCreateCompanyArgs, never>>;
  deleteCompany?: Resolver<Maybe<ResolversTypes['CompanyResponse']>, ParentType, ContextType, RequireFields<MutationDeleteCompanyArgs, 'id'>>;
  updateCompany?: Resolver<Maybe<ResolversTypes['CompanyResponse']>, ParentType, ContextType, RequireFields<MutationUpdateCompanyArgs, 'id'>>;
  addJobOfferToUserFavourite?: Resolver<Maybe<ResolversTypes['UserFavouriteJobOffersResponse']>, ParentType, ContextType, RequireFields<MutationAddJobOfferToUserFavouriteArgs, never>>;
  deleteJobOfferFromUserFavourite?: Resolver<Maybe<ResolversTypes['UserFavouriteJobOffersResponse']>, ParentType, ContextType, RequireFields<MutationDeleteJobOfferFromUserFavouriteArgs, never>>;
  login?: Resolver<Maybe<ResolversTypes['UserTokenResponse']>, ParentType, ContextType, RequireFields<MutationLoginArgs, never>>;
  verifyAccessToken?: Resolver<Maybe<ResolversTypes['AccessTokenResponse']>, ParentType, ContextType, RequireFields<MutationVerifyAccessTokenArgs, never>>;
  generateTokensByRefreshToken?: Resolver<Maybe<ResolversTypes['AccessRefreshTokenResponse']>, ParentType, ContextType, RequireFields<MutationGenerateTokensByRefreshTokenArgs, never>>;
};

export type PageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Page'] = ResolversParentTypes['Page']> = {
  __resolveType: TypeResolveFn<'CompanyResults' | 'JobOfferResults' | 'UserResults', ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllUsers?: Resolver<Maybe<ResolversTypes['UsersResponse']>, ParentType, ContextType, RequireFields<QueryGetAllUsersArgs, never>>;
  getUserById?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  getAllJobOffers?: Resolver<Maybe<ResolversTypes['JobOffersResponse']>, ParentType, ContextType, RequireFields<QueryGetAllJobOffersArgs, never>>;
  getJobOfferById?: Resolver<Maybe<ResolversTypes['JobOfferResponse']>, ParentType, ContextType, RequireFields<QueryGetJobOfferByIdArgs, 'id'>>;
  getUserFavouriteJobOffers?: Resolver<Maybe<ResolversTypes['JobOffersResponse']>, ParentType, ContextType, RequireFields<QueryGetUserFavouriteJobOffersArgs, 'id'>>;
  getAllCompanies?: Resolver<Maybe<ResolversTypes['CompaniesResponse']>, ParentType, ContextType, RequireFields<QueryGetAllCompaniesArgs, never>>;
  getCompanyById?: Resolver<Maybe<ResolversTypes['CompanyResponse']>, ParentType, ContextType, RequireFields<QueryGetCompanyByIdArgs, 'id'>>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  __resolveType: TypeResolveFn<'AccessRefreshTokenResponse' | 'AccessTokenResponse' | 'CompaniesResponse' | 'CompanyResponse' | 'JobOfferResponse' | 'JobOffersResponse' | 'UserFavouriteJobOffersResponse' | 'UserResponse' | 'UserTokenResponse' | 'UsersResponse', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export interface SalaryScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Salary'], any> {
  name: 'Salary';
}

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  typ?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sub?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  iss?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  aud?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  iat?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  login?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['Email'], ParentType, ContextType>;
  age?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  skills?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  experienceYears?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Level']>, ParentType, ContextType>;
  minSalary?: Resolver<Maybe<ResolversTypes['Salary']>, ParentType, ContextType>;
  maxSalary?: Resolver<Maybe<ResolversTypes['Salary']>, ParentType, ContextType>;
  githubLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedinLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favouriteJobOffers?: Resolver<Maybe<Array<Maybe<ResolversTypes['JobOffer']>>>, ParentType, ContextType>;
  emailNotification?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdDateTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedDateTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserFavouriteJobOffersResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserFavouriteJobOffersResponse'] = ResolversParentTypes['UserFavouriteJobOffersResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  jobOffers?: Resolver<Maybe<Array<Maybe<ResolversTypes['JobOffer']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResults'] = ResolversParentTypes['UserResults']> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserTokenResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserTokenResponse'] = ResolversParentTypes['UserTokenResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersResponse'] = ResolversParentTypes['UsersResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  results?: Resolver<Maybe<ResolversTypes['UserResults']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AccessRefreshTokenResponse?: AccessRefreshTokenResponseResolvers<ContextType>;
  AccessTokenResponse?: AccessTokenResponseResolvers<ContextType>;
  Address?: AddressResolvers<ContextType>;
  CompaniesResponse?: CompaniesResponseResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  CompanyResponse?: CompanyResponseResolvers<ContextType>;
  CompanyResults?: CompanyResultsResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Email?: GraphQLScalarType;
  File?: FileResolvers<ContextType>;
  JobOffer?: JobOfferResolvers<ContextType>;
  JobOfferResponse?: JobOfferResponseResolvers<ContextType>;
  JobOfferResults?: JobOfferResultsResolvers<ContextType>;
  JobOffersResponse?: JobOffersResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Page?: PageResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PostalCode?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  Salary?: GraphQLScalarType;
  Token?: TokenResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserFavouriteJobOffersResponse?: UserFavouriteJobOffersResponseResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
  UserResults?: UserResultsResolvers<ContextType>;
  UserTokenResponse?: UserTokenResponseResolvers<ContextType>;
  UsersResponse?: UsersResponseResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;