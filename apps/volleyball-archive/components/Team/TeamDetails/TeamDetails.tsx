import styled from '@emotion/styled';
import { TokenClient } from 'lib/Axios';
import { useRouter } from 'next/router';
import { TeamType } from 'pages/team/[id]';
import { CoachType } from 'pages/team/[id]/coach';
import { TeamIntroductionType } from 'pages/team/[id]/introduction';
import { PlayerType } from 'pages/team/[id]/players';
import React, { ChangeEvent, useEffect, useState } from 'react';
import TeamHeader from '../TeamHeader/TeamHeader';
import TeamCoach from './TeamCoach/TeamCoach';
import TeamIntroduction from './TeamIntroduction/TeamIntroduction';
import TeamPlayers from './TeamPlayers/TeamPlayers';
import { TeamRecords } from './TeamRecords/TeamRecords';
import { TeamReview } from './TeamReview/TeamReview';

export interface TeamIntroductionProps {
  team?: TeamIntroductionType;
  coach?: CoachType;
  player?: PlayerType[];
  isBlue?: boolean;
}

export interface ButtonProps {
  isActive: boolean;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const TeamWrapper = styled.div`
  width: 960px;
  margin: 50px auto 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 1200px) {
    width: 100%;
    padding: 0 50px;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 30px;
  }
`;

export const TeamComboBox = styled.select`
  width: 210px;
  height: 32px;
  padding-left: 10px;
  text-align: left;
  font-size: 14px;
  color: #999;
  cursor: pointer;
  border: 1px solid #e0e0e0;
  background: #f8f8f8
    url('https://www.kovo.co.kr/images/bg/bg_select_table.png') right center
    no-repeat;

  @media (max-width: 768px) {
    width: 170px;
    height: 28px;
    font-size: 12px;
  }
`;

const TeamInfoBox = styled.div`
  display: flex;
`;

const TeamDetails = ({
  team,
  coach,
  player,
  isBlue = false,
}: TeamIntroductionProps) => {
  const router = useRouter();
  const page = router.pathname.split('/');
  const id = router.query.id as string;
  const [teamList, setTeamList] = useState<TeamType[]>([]);

  useEffect(() => {
    TokenClient.get('/team', {
      params: { gender: id === 'men' ? true : false },
    })
      .then((response) => {
        if (response.status === 200) {
          setTeamList(response.data.data);
        }
      })
      .catch((response) => {
        console.log(response.data);
        console.log(response.status);
      });
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push({
      pathname: window.location.pathname,
      query: { team_id: e.target.value },
    });
  };

  const renderContentByPage = (page: string) =>
    ({
      introduction: <TeamIntroduction team={team} />,
      coach: <TeamCoach coach={coach} />,
      players: <TeamPlayers player={player} team={team} />,
      record: <TeamRecords team={team} />,
      review: <TeamReview />,
    }[page] || <></>);
  return (
    <Container>
      <TeamWrapper>
        <TeamComboBox onChange={handleChange} value={team?.id}>
          {teamList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </TeamComboBox>
        <TeamInfoBox>
          <TeamHeader team={team} isBlue={isBlue} />
        </TeamInfoBox>
        {renderContentByPage(page[3])}
      </TeamWrapper>
    </Container>
  );
};

export default TeamDetails;
