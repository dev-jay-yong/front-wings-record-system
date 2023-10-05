/* eslint-disable @next/next/no-img-element */
import styled from '@emotion/styled';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 140px;
  background-color: #fff;
  gap: 100px;

  @media (max-width: 768px) {
    gap: 50px;
    height: 100px;
  }
`;

const NavContent = styled(Link)`
  color: #000000;
  font-size: 18px;
  font-weight: 600;
`;

const Header = () => {
  return (
    <Container>
      <NavContent href={'/team/men'}>TEAM</NavContent>
      <img
        src='https://i.imgur.com/wvWtFFi.png'
        alt={'로고'}
        width={90}
        height={90}
      />
      <NavContent href={'/stat'}>STATS</NavContent>
    </Container>
  );
};

export default Header;
