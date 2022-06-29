import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type ExchangeRate = {
  __typename?: 'ExchangeRate';
  currency?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  rate?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  rates?: Maybe<Array<Maybe<ExchangeRate>>>;
};


export type QueryRatesArgs = {
  currency: Scalars['String'];
};

export type GetExchangeRatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExchangeRatesQuery = { __typename?: 'Query', rates?: Array<{ __typename?: 'ExchangeRate', currency?: string | null, rate?: string | null, name?: string | null } | null> | null };


export const GetExchangeRatesDocument = gql`
    query GetExchangeRates {
  rates(currency: "USD") {
    currency
    rate
    name
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetExchangeRates(variables?: GetExchangeRatesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetExchangeRatesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetExchangeRatesQuery>(GetExchangeRatesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetExchangeRates', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;