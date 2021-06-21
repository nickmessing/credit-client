import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AuthenticationResult = {
  __typename?: 'AuthenticationResult';
  user: User;
  token: Scalars['String'];
};


export type Mutation = {
  __typename?: 'Mutation';
  authenticate: AuthenticationResult;
  seed: Scalars['Int'];
  createUser: User;
};


export type MutationAuthenticateArgs = {
  user: UserCredentials;
};


export type MutationCreateUserArgs = {
  user: UserCredentials;
};

export type Query = {
  __typename?: 'Query';
  usersCount: Scalars['Int'];
  users: Array<User>;
  me?: Maybe<User>;
};


export type QueryUsersArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserCredentials = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type AuthenticateMutationVariables = Exact<{
  user: UserCredentials;
}>;


export type AuthenticateMutation = (
  { __typename?: 'Mutation' }
  & { authenticate: (
    { __typename?: 'AuthenticationResult' }
    & Pick<AuthenticationResult, 'token'>
  ) }
);

export type CreateUserMutationVariables = Exact<{
  user: UserCredentials;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )> }
);

export type SeedMutationVariables = Exact<{ [key: string]: never; }>;


export type SeedMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'seed'>
);

export type UsersListQueryVariables = Exact<{
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type UsersListQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'usersCount'>
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);


export const AuthenticateDocument = gql`
    mutation authenticate($user: UserCredentials!) {
  authenticate(user: $user) {
    token
  }
}
    `;

/**
 * __useAuthenticateMutation__
 *
 * To run a mutation, you first call `useAuthenticateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAuthenticateMutation({
 *   variables: {
 *     user: // value for 'user'
 *   },
 * });
 */
export function useAuthenticateMutation(options: VueApolloComposable.UseMutationOptions<AuthenticateMutation, AuthenticateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<AuthenticateMutation, AuthenticateMutationVariables>>) {
  return VueApolloComposable.useMutation<AuthenticateMutation, AuthenticateMutationVariables>(AuthenticateDocument, options);
}
export type AuthenticateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<AuthenticateMutation, AuthenticateMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($user: UserCredentials!) {
  createUser(user: $user) {
    id
  }
}
    `;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateUserMutation({
 *   variables: {
 *     user: // value for 'user'
 *   },
 * });
 */
export function useCreateUserMutation(options: VueApolloComposable.UseMutationOptions<CreateUserMutation, CreateUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateUserMutation, CreateUserMutationVariables>>) {
  return VueApolloComposable.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
}
export type CreateUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateUserMutation, CreateUserMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a Vue component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeQuery();
 */
export function useMeQuery(options: VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options);
}
export type MeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<MeQuery, MeQueryVariables>;
export const SeedDocument = gql`
    mutation seed {
  seed
}
    `;

/**
 * __useSeedMutation__
 *
 * To run a mutation, you first call `useSeedMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSeedMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSeedMutation();
 */
export function useSeedMutation(options: VueApolloComposable.UseMutationOptions<SeedMutation, SeedMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SeedMutation, SeedMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<SeedMutation, SeedMutationVariables>(SeedDocument, options);
}
export type SeedMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SeedMutation, SeedMutationVariables>;
export const UsersListDocument = gql`
    query usersList($offset: Int!, $limit: Int!) {
  usersCount
  users(offset: $offset, limit: $limit) {
    id
    username
  }
}
    `;

/**
 * __useUsersListQuery__
 *
 * To run a query within a Vue component, call `useUsersListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUsersListQuery({
 *   offset: // value for 'offset'
 *   limit: // value for 'limit'
 * });
 */
export function useUsersListQuery(variables: UsersListQueryVariables | VueCompositionApi.Ref<UsersListQueryVariables> | ReactiveFunction<UsersListQueryVariables>, options: VueApolloComposable.UseQueryOptions<UsersListQuery, UsersListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UsersListQuery, UsersListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UsersListQuery, UsersListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<UsersListQuery, UsersListQueryVariables>(UsersListDocument, variables, options);
}
export type UsersListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UsersListQuery, UsersListQueryVariables>;