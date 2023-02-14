/* eslint-disable @next/next/no-img-element */
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
import { TeamIntroductionProps } from '../TeamDetails';

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
`;

const CoachWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0 30px 10px;
  border-bottom: 1px solid #d1d5e0;
  gap: 35px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  margin-top: 50px;
  font-size: 16px;
  color: #0e76bc;
  padding-bottom: 10px;
  border-bottom: 2px solid #1a2b64;

  &:first-of-type {
    margin-top: 0px;
  }
  @media (max-width: 768px) {
    margin-top: 30px;
    font-size: 14px;
  }
`;

const PlayerNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-content: center;

  p {
    font-size: 14px;
    margin: 0;
    font-weight: 700;
    color: #767676;
    margin-top: 10px;
    text-align: center;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const PlayerPosTab = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 35px;
  @media (max-width: 768px) {
    gap: 25px;
  }
`;

interface PositionProps {
  isPosition: boolean;
}

const PlayerPosition = styled.div<PositionProps>`
  font-size: 15px;
  font-weight: ${({ isPosition }) => (isPosition ? 'bold' : 'medium')};
  color: ${({ isPosition }) => (isPosition ? '#0e76bc' : '#767676')};
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const PlayerImg = styled.img`
  width: 180px;
  height: 200px;
  border: 1px solid #e0e0e0;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 120px;
    height: 130px;
  }
`;
const TeamPlayers = ({ player, team }: TeamIntroductionProps) => {
  const router = useRouter();
  const queryId = router.query.id as string;
  const [position, setPosition] = useState<string>('전체');
  const PosHeaderList = [
    '전체',
    '아웃사이드 히터',
    '아포짓 스파이커',
    '미들 블로커',
    '세터',
    '리베로',
  ];
  const PosList = [
    '아웃사이드 히터',
    '아포짓 스파이커',
    '미들 블로커',
    '세터',
    '리베로',
  ];

  return (
    <Container>
      <PlayerPosTab>
        {PosHeaderList.map((pos, idx) => (
          <PlayerPosition
            key={idx}
            onClick={() => setPosition(pos)}
            isPosition={pos === position}
          >
            {pos}
          </PlayerPosition>
        ))}
      </PlayerPosTab>
      {position !== '전체'
        ? PosList.filter((data) => data === position).map((pos, idx) => (
            <Fragment key={idx}>
              <Title>{pos}</Title>
              <CoachWrapper>
                {player
                  ?.filter((player) => player.position_name === pos)
                  .map((player) => (
                    <PlayerNameWrapper key={player.id}>
                      <PlayerImg
                        src={player.profile_image}
                        alt={'프로필사진'}
                        onClick={() =>
                          router.push({
                            pathname: `/team/${queryId}/playerInfo`,
                            query: {
                              team_id: team && team.id,
                              player: player && player.id,
                            },
                          })
                        }
                      />
                      <p>
                        NO.{player.number} {player.name}({player.position_code})
                      </p>
                    </PlayerNameWrapper>
                  ))}
              </CoachWrapper>
            </Fragment>
          ))
        : PosList.map((pos, idx) => (
            <Fragment key={idx}>
              <Title>{pos}</Title>
              <CoachWrapper>
                {player
                  ?.filter((player) => player.position_name === pos)
                  .map((player) => (
                    <PlayerNameWrapper key={player.id}>
                      <PlayerImg
                        src={player.profile_image}
                        alt={'프로필사진'}
                        onClick={() =>
                          router.push(
                            {
                              pathname: `/team/${queryId}/playerInfo`,
                              query: {
                                team_id: team && team.id,
                                player: player && player.id,
                              },
                            },
                            undefined,
                            { shallow: true }
                          )
                        }
                      />
                      <p>
                        NO.{player.number} {player.name}({player.position_code})
                      </p>
                    </PlayerNameWrapper>
                  ))}
              </CoachWrapper>
            </Fragment>
          ))}
    </Container>
  );
};

export default TeamPlayers;
