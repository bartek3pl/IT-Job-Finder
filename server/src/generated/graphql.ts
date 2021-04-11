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
  /** A DateTime string in 24-hr `HH:mm[:ss[.SSS]]` format. */
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

/** Full details about company */
export type Company = {
  __typename?: 'Company';
  name: Scalars['String'];
  address?: Maybe<Address>;
  employeesNumber?: Maybe<Scalars['Int']>;
  logo?: Maybe<File>;
};

/** Employment contract for the employee */
export enum ContractType {
  Uop = 'UOP',
  B2B = 'B2B',
  Other = 'OTHER'
}



/** File to be uploaded (e.g. image) */
export type File = {
  __typename?: 'File';
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
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  employer: Company;
  salary?: Maybe<Scalars['Salary']>;
  skills: Array<Scalars['String']>;
  experienceYears?: Maybe<Scalars['Int']>;
  level?: Maybe<Level>;
  contractType?: Maybe<ContractType>;
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
};

/** Expected experience of the employee */
export enum Level {
  Junior = 'JUNIOR',
  Mid = 'MID',
  Senior = 'SENIOR',
  Other = 'OTHER'
}

export type Mutation = {
  __typename?: 'Mutation';
  empty?: Maybe<Scalars['String']>;
  /** Create user with login, password and email. */
  createUser?: Maybe<UserMutationResponse>;
};


export type MutationCreateUserArgs = {
  input?: Maybe<UserInput>;
};

export type MutationResponse = {
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
};


export type Query = {
  __typename?: 'Query';
  empty?: Maybe<Scalars['String']>;
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
  skills?: Maybe<Array<Scalars['String']>>;
  experienceYears?: Maybe<Scalars['Int']>;
  level?: Maybe<Level>;
  salary?: Maybe<Scalars['Salary']>;
  githubLink?: Maybe<Scalars['String']>;
  linkedinLink?: Maybe<Scalars['String']>;
  favouriteJobOffers?: Maybe<Array<JobOffer>>;
  emailNotification?: Maybe<Scalars['Boolean']>;
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
};

export type UserInput = {
  login: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['Email'];
};

export type UserMutationResponse = MutationResponse & {
  __typename?: 'UserMutationResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  user?: Maybe<User>;
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
  Address: ResolverTypeWrapper<Address>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CacheControlScope: CacheControlScope;
  Company: ResolverTypeWrapper<Company>;
  ContractType: ContractType;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Email: ResolverTypeWrapper<Scalars['Email']>;
  File: ResolverTypeWrapper<File>;
  Gender: Gender;
  JobOffer: ResolverTypeWrapper<JobOffer>;
  Level: Level;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolversTypes['UserMutationResponse'];
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>;
  Query: ResolverTypeWrapper<{}>;
  Salary: ResolverTypeWrapper<Scalars['Salary']>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  UserInput: UserInput;
  UserMutationResponse: ResolverTypeWrapper<UserMutationResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  String: Scalars['String'];
  Int: Scalars['Int'];
  Company: Company;
  DateTime: Scalars['DateTime'];
  Email: Scalars['Email'];
  File: File;
  JobOffer: JobOffer;
  Mutation: {};
  MutationResponse: ResolversParentTypes['UserMutationResponse'];
  Boolean: Scalars['Boolean'];
  PostalCode: Scalars['PostalCode'];
  Query: {};
  Salary: Scalars['Salary'];
  Upload: Scalars['Upload'];
  User: User;
  ID: Scalars['ID'];
  UserInput: UserInput;
  UserMutationResponse: UserMutationResponse;
};

export type CacheControlDirectiveArgs = {   maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>; };

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['PostalCode']>, ParentType, ContextType>;
  buildingNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  apartmentNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  employeesNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType>;
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
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employer?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  salary?: Resolver<Maybe<ResolversTypes['Salary']>, ParentType, ContextType>;
  skills?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  experienceYears?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Level']>, ParentType, ContextType>;
  contractType?: Resolver<Maybe<ResolversTypes['ContractType']>, ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createUser?: Resolver<Maybe<ResolversTypes['UserMutationResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, never>>;
};

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'UserMutationResponse', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export interface SalaryScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Salary'], any> {
  name: 'Salary';
}

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
  skills?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  experienceYears?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Level']>, ParentType, ContextType>;
  salary?: Resolver<Maybe<ResolversTypes['Salary']>, ParentType, ContextType>;
  githubLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedinLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favouriteJobOffers?: Resolver<Maybe<Array<ResolversTypes['JobOffer']>>, ParentType, ContextType>;
  emailNotification?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserMutationResponse'] = ResolversParentTypes['UserMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Email?: GraphQLScalarType;
  File?: FileResolvers<ContextType>;
  JobOffer?: JobOfferResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  PostalCode?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Salary?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserMutationResponse?: UserMutationResponseResolvers<ContextType>;
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