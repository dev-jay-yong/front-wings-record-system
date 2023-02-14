import styled from '@emotion/styled';
import { Header } from 'components';
import React from 'react';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 140px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Stat = () => {
  return (
    <Container>
      <Header />
      추후 오픈 예정
    </Container>
  );
};

export default Stat;
