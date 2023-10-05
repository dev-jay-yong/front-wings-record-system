import styled from '@emotion/styled';
import { TeamIntroductionType } from 'pages/team/[id]/introduction';
import { useState } from 'react';
import { RecordTitle } from '../TeamPlayers/PlayerDetails/PlayerDetails';
import { TeamRecordItem } from './TeamRecordAttack/TeamRecordAttack';
import { TeamRecordBlock } from './TeamRecordBlock/TeamRecordBlock';
import { TeamRecordDig } from './TeamRecordDig/TeamRecordDig';
import { TeamRecordReceive } from './TeamRecordReceive/TeamRecordReceive';
import { TeamRecordServe } from './TeamRecordServe/TeamRecordServe';

interface TeamRecordsProps {
  team?: TeamIntroductionType;
}

interface MenuTypeBoxProps {
  isActive: boolean;
}

export const PerformanceWrapper = styled.div`
  margin: 10px 0 100px 0;
  width: 100%;
  max-width: 960px;
  border-top: 2px solid #1a2b64;

  @media (max-width: 768px) {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
  }

  th {
    font-size: 14px;
    padding: 15px 0;
    color: #1a2b64;
    background: #f6f7f8;
    border-bottom: 1px solid #e0dfe1;

    @media (max-width: 768px) {
      width: 73.33px;
      font-size: 12px;
    }
  }
  td {
    font-size: 14px;
    padding: 15px 0;
    border-bottom: 1px solid #e0dfe1;
    text-align: center;
    color: #767676;
    font-weight: 700px;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
`;

const TeamBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  height: 140px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  padding-left: 30px;
  @media (max-width: 768px) {
    padding: 0 20px;
    justify-content: center;
  }
  @media (max-width: 500px) {
    gap: 40px;
  }
`;

const TeamLogo = styled.img`
  object-fit: contain;
  width: 150px;
  height: 112px;

  @media (max-width: 768px) {
    width: 80px;
    height: 72px;
  }
`;

const TeamNameBox = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #253032;
  font-weight: bold;
  font-size: 18px;

  @media (max-width: 768px) {
    width: 200px;
    font-size: 16px;
  }
  @media (max-width: 500px) {
    width: unset;
  }
`;

const ScoreBox = styled.div`
  margin-left: 100px;
  align-items: center;
  height: 100%;
  display: flex;
  gap: 10px;

  @media (max-width: 1050px) {
    margin-left: 70px;
  }
  @media (max-width: 980px) {
    margin-left: 50px;
  }
  @media (max-width: 925px) {
    margin-left: 30px;
  }
  @media (max-width: 768px) {
    margin-left: 0px;
  }
`;

const WinCircle = styled.div`
  background-color: #0e76bc;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  border-radius: 100%;
  @media (max-width: 768px) {
    font-size: 12px;
    width: 30px;
    height: 30px;
  }
`;
const LoseCircle = styled.div`
  background-color: #767676;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  border-radius: 100%;

  @media (max-width: 768px) {
    margin-left: 25px;
    font-size: 12px;
    width: 30px;
    height: 30px;
  }
  @media (max-width: 500px) {
    margin-left: 0;
  }
`;

const Text = styled.div`
  color: #1a2b64;
  font-size: 14px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const MenuBox = styled.div`
  display: flex;
  height: 50px;
  margin-top: 15px;
  @media (max-width: 768px) {
    height: 40px;
  }
`;

const MenuBlock = styled.div<MenuTypeBoxProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${({ isActive }) => (isActive ? '#0e76bc' : '#e5e6e7')};
  height: 50px;
  font-size: 15px;
  border-right: 1px solid #e0e0e0;
  color: ${({ isActive }) => (isActive ? '#fff' : '#333')};
  cursor: pointer;

  &:last-child {
    border: 0;
  }

  @media (max-width: 768px) {
    height: 40px;
    font-size: 13px;
  }
`;

const Flexbox = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 5px;
  }
`;
export type AttackType = {
  attack: number;
  attack_miss: number;
  attack_success: number;
  blocking_shut_out: number;
  match_count: number;
  set_count: number;
};

export type BlockType = {
  block: number;
  block_fail: number;
  block_miss: number;
  block_success: number;
  match_count: number;
  set_count: number;
};

export type ServeType = {
  serve_count: number;
  serve_miss: number;
  serve_success: number;
  match_count: number;
  set_count: number;
};

export type ReceiveType = {
  receive: number;
  receive_miss: number;
  receive_success: number;
  match_count: number;
  set_count: number;
};

export type DigType = {
  dig: number;
  dig_fail: number;
  dig_success: number;
  match_count: number;
  set_count: number;
};
export const TeamRecords = ({ team }: TeamRecordsProps) => {
  const [currentTab, clickTab] = useState(0);
  const menuArr = [
    { name: '공격', content: <TeamRecordItem /> },
    { name: '블로킹', content: <TeamRecordBlock /> },
    { name: '서브', content: <TeamRecordServe /> },
    { name: '리시브', content: <TeamRecordReceive /> },
    { name: '디그', content: <TeamRecordDig /> },
  ];

  const selectMenuHandler = (index: number) => {
    clickTab(index);
  };

  return (
    <Container>
      <TeamBox>
        <Flexbox>
          <TeamLogo src={team?.team_logo} alt={'팀 로고'} />
          <TeamNameBox>{team?.name}</TeamNameBox>
        </Flexbox>
        <ScoreBox>
          <WinCircle>승</WinCircle>
          <Text>{team?.team_total_record?.total_win_count}</Text>
        </ScoreBox>
        <ScoreBox>
          <LoseCircle>패</LoseCircle>
          <Text>{team?.team_total_record?.total_lose_count}</Text>
        </ScoreBox>
      </TeamBox>
      <RecordTitle>팀 기록</RecordTitle>
      <MenuBox>
        {menuArr.map((el, idx) => (
          <MenuBlock
            key={idx}
            isActive={idx === currentTab}
            onClick={() => selectMenuHandler(idx)}
          >
            {el.name}
          </MenuBlock>
        ))}
      </MenuBox>
      {menuArr[currentTab].content}
    </Container>
  );
};
