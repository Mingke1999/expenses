import { gql } from '@apollo/client';

export const GET_AUTH_USER = gql`
  query GetAuthUser {
    authUser {
      _id
      username
      name
      profilePicture
    }
  }
`;

export const GET_USER_TRANSACTIONS = gql`
  query GetUserTransactions($userId:ID!){
    user(userId:$userId){
      _id
      name
      username
      transactions{
        description
            paymentType
            category
            amount
            location
            date
      }
    }
  }
`