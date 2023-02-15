import styled from '@emotion/styled';
import { Login } from 'components/index';
import Head from 'next/head';

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

type LoginInput = {
  id: string;
  password: string;
};

const Home = () => {
  const LoginonSubmit = (form: LoginInput) => {
    form;
  };

  return (
    <>
      <Head>
        <title>윙즈 경기 기록 사이트</title>
      </Head>
      <Container>
        <Login onSubmit={LoginonSubmit} />
      </Container>
    </>
  );
};

export default Home;
