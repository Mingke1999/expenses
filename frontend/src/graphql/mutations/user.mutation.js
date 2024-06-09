import { gql } from "@apollo/client";

export const SIGN_UP = gql`
    mutation SignUp($input:SignUpInput!){
        signup(input:$input){
            _id
            name
            username
        }
    }
`
export const LOGIN = gql`
 mutation login($input:LoginInput!){
        login(input:$input){
            _id
            name
            username
        }
    }
`


export const LOGOUT = gql`
    mutation logout{
        logout{
            message
        }
    }
`