/* eslint-disable @next/next/no-img-element */
import styled from '@emotion/styled';
import React from 'react';
import { TeamIntroductionProps } from '../TeamDetails';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CoachWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0 30px 10px;
  border-bottom: 1px solid #d1d5e0;
  gap: 35px;
  @media (max-width: 768px) {
    gap: 20px;
    padding: 20px 0 20px 10px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #0e76bc;
  padding-bottom: 10px;
  border-bottom: 2px solid #1a2b64;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const CoachNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 12px;
  }

  span {
    font-size: 14px;
    font-weight: 700;
    color: #1a2b64;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
  p {
    font-size: 14px;
    margin: 0;
    font-weight: 700;
    color: #767676;
    line-height: 20px;

    @media (max-width: 768px) {
      font-size: 12px;
      line-height: 18px;
    }
  }
`;

const CoachImage = styled.img`
  width: 180px;
  height: 200px;
  border: 1px solid #e0e0e0;
  @media (max-width: 768px) {
    width: 140px;
    height: 160px;
  }
`;

const TeamCoach = ({ coach }: TeamIntroductionProps) => {
  return (
    <Container>
      <Title>감독</Title>
      <CoachWrapper>
        <CoachImage src={coach && coach.profile_image} alt={'프로필사진'} />
        <CoachNameWrapper>
          <span>{coach?.name}</span>
          <p>
            생년월일 : {coach?.birth} <br /> 포지션 : {coach?.position_name}
          </p>
        </CoachNameWrapper>
      </CoachWrapper>
    </Container>
  );
};

export default TeamCoach;
