import { useMutation, gql } from "@apollo/client";
import { toast } from 'react-toastify';

const LOGIN = gql`
  mutation Login ($username: String!, $password: String!) {
    userLogin (username: $username, password: $password) {
      ...on UserLoginSuccess {
        accessToken
        refreshToken
      }
      ... on Error {
        message
      }
  }
}
`

const isFormValid = (
  username: string, 
  password: string,
  onUsernameFailed: Function,
  onPasswordFailed: Function,
) => {

  if (!!username === false) {
    onUsernameFailed();
    return false;
  }

  if (!!password === false) {
    onPasswordFailed();
    return false;
  }

  return true;
}

export function useLogin () {
  const [mutate, { loading, error }] = useMutation(LOGIN);
  return {
    loginLoading: loading, 
    loginError: error,
    login: async (username: string, password: string) => {
      const valid = isFormValid (username, password, 
        () => {
          toast.error("Yeahhhhh, you forgot to include username. 🤠", {
            autoClose: 3000
          })
        }, () => {
          toast.error("Yeahhhhh, you forgot to include your password 🤠", {
            autoClose: 3000
          })
      });
    
      if (valid) {
        await mutate({ variables: { username, password } });
      }
    } 
  }
}
