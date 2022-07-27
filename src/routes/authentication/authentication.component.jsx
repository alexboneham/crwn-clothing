import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';


const Authentication = () => {
  return (
    <div>
      <h1>Sign In Page</h1>
      <div>
        <SignInForm />
        <SignUpForm />
      </div>
    </div>
  );
};

export default Authentication;
