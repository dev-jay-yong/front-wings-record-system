import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface TabLinkProps {
  path: string;
}

const Container = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: column;
  background-color: #78a34d;
  background-position: calc(50% + 205px) top;
  background-image: url('https://www.kovo.co.kr/images/common/bg_sub3.jpg');
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const SubTabBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const TabLink = styled(Link)<TabLinkProps>`
  color: ${({ path }) =>
    path === 'true' ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
  font-size: 14px;
  font-weight: bold;
  padding: 14px;
`;

const TeamBox = styled.div`
  display: flex;
  align-items: center;
  width: 960px;
  margin: 0 auto;
  height: 180px;
  font-size: 40px;
  font-weight: bold;
  color: #fff;

  @media (max-width: 1200px) {
    width: 100%;
    padding: 0 50px;
  }
  @media (max-width: 768px) {
    font-size: 28px;
    padding: 0 30px;
  }
`;

const SubNavgation = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const handleName = (router: string) => {
    switch (router) {
      case 'men':
        return '남자부';
      case 'women':
        return '여자부';
    }
  };
  return (
    <Container>
      <SubTabBox>
        <TabLink href={'/team/men'} path={`${id === 'men'}`}>
          남자부
        </TabLink>
        <TabLink href={'/team/women'} path={`${id === 'women'}`}>
          여자부
        </TabLink>
      </SubTabBox>
      <TeamBox>{handleName(id)}</TeamBox>
    </Container>
  );
};

export default SubNavgation;
