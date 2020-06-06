import { gql, useMutation } from "@apollo/client";
import { TextUtil } from "../../../../shared/utils/TextUtil";
import { toast } from "react-toastify";
import { useLogin } from "./login";

const CREATE_USER = gql`
  mutation CreateUser ($email: String!, $username: String!, $password: String!) {
    userCreate (email: $email, username: $username, password: $password) {
      ... on User {
        username
      }
      ... on Error {
        message
      }
    }
  }
`

const isFormValid = (
  email: string, 
  username: string, 
  password: string,
  onEmailInvalid: Function,
  onUsernameInvalid: Function,
  onPasswordInvalid: Function
) => {
  
  if (email === "" || email === undefined || !TextUtil.validateEmail(email)) {
    onEmailInvalid();
    return false;
  }

  if (!!username === false) {
    onUsernameInvalid();
    return false;
  }

  if (!!password === false || TextUtil.atLeast(password, 6)) {
    onPasswordInvalid();
    return false;
  }
  
  return true;
}

const createUser = async (
  variables: {
    email: string, 
    username: string, 
    password: string
  },
  mutate: any,
  afterSuccess: Function, 
  afterFailure: Function
) => {
  const valid = isFormValid(variables.email, variables.username, variables.password, 
    () => {
      toast.error("Yeahhhhh, Want to try that again with a valid email? 🤠", {
        autoClose: 3000
      })
    }, 
    () => {
      toast.error("Yeahhhhh, you forgot your username. 🤠", {
        autoClose: 3000
      })
    }, 
    () => {
      toast.error("Yeahhhhh, your password should be at least 6 chars 🤠", {
        autoClose: 3000
      })
    }
  )

  if (valid) {
    try {
      await mutate({ variables })
      afterSuccess();
    } catch (err) {
      // TODO: Process errors properly.
      afterFailure(err.toString())
    }
  }
}

export function useCreateUser () {
  const { login } = useLogin();
  const [mutate, { loading }] = useMutation(CREATE_USER);

  return {
    createUserLoading: loading,
    createUser: (email: string, username: string, password: string) => {
      return createUser({ email, username, password }, mutate, 
        () => {
          toast.success(`You're all signed up! Logging you in. 🤠`, {
            autoClose: 3000
          });
          login(username, password);
      }, 
      (errorMessage: string) => {
        // TODO: Write tests for all of this
        // const error: string = currentProps.users.error;
        return toast.error(`Yeahhhhh, ${errorMessage} 🤠`, {
          autoClose: 3000
        })
      })
    }
  }
}