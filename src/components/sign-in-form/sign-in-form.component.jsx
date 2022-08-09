import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import {SignInContainer, Heading, ButtonGroup} from './sign-in-form.styles.jsx';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  // Set up state for the form
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // Reset fields function
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  // Handle change function
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // Handle submit function
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-passowrd':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('User not found');
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <SignInContainer>
      <Heading>Already have an account?</Heading>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" required name="email" value={email} onChange={handleChange} />
        <FormInput label="Password" type="password" required name="password" value={password} onChange={handleChange} />
        <ButtonGroup>
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </ButtonGroup>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
