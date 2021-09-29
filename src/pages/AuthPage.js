import AuthForm from '../components/Auth/AuthForm';

const AuthPage = (props) => {
  return (
    <AuthForm
      status={props.status}
      title={props.title}
      message={props.message}
    />
  );
};

export default AuthPage;
