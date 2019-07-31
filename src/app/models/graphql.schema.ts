/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type UsersOrderingInputObjectType = {
  sort?: UsersOrderByFieldEnum | null,
  direction?: UsersOrderByDirectionEnum | null,
};

// List of available ordering fields.
export type UsersOrderByFieldEnum =
  "id" | // User id
  "name" | // User name
  "avatarUrl" | // User avatar url
  "email" | // User email
  "role" | // User role
  "rememberMe"; // Remember me login option


// List of available ordering directions.
export type UsersOrderByDirectionEnum =
  "ASC" | // Ascendent direction
  "DESC"; // Descendant direction


export type UserListQueryVariables = {
  limit?: number | null,
  offset?: number | null,
  orderBy?: Array< UsersOrderingInputObjectType | null > | null,
};

export type UserListQuery = {
  Users:  {
    // Total number of elements
    count: number | null,
    // Array of elements
    nodes:  Array< {
      // User id
      id: string,
      // User name
      name: string,
      // User email
      email: string,
    } | null > | null,
    // Page information
    pageInfo:  {
      hasNextPage: boolean,
      hasPreviousPage: boolean,
    } | null,
  } | null,
};
/* tslint:enable */
