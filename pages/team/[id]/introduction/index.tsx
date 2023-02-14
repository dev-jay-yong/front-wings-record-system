import styled from '@emotion/styled';
import { Header, SubNavgation, TeamDetails } from 'components';
import { TokenClient } from 'lib/Axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 140px);
`;

export type PerformanceType = {
  id: number;
  competition_name: string;
  results: string;
  win_counts: number;
  lose_counts: number;
  start_date: string;
  end_date: string;
  team_id: number;
};

export type TeamTotalRecordType = {
  total_win_count: number;
  total_lose_count: number;
};

export interface TeamIntroductionType {
  id: number;
  name: string;
  team_logo: string;
  gender: boolean;
  created_at: string;
  coach: string;
  performance: PerformanceType[];
  team_total_record?: TeamTotalRecordType;
}

const Introduction = () => {
  const router = useRouter();
  const id = router.query.team_id;
  const [team, setTeam] = useState<TeamIntroductionType>({
    id: 0,
    name: '',
    team_logo: '',
    gender: true,
    created_at: '',
    coach: '',
    performance: [],
  });

  useEffect(() => {
    TokenClient.get('/team/introduction', { params: { team_id: id } })
      .then((response) => {
        if (response.status === 200) {
          setTeam(response.data.data);
        }
      })
      .catch((err) => {
        if (err.response.data.status_code === 401) {
          router.replace('/', undefined, { shallow: true });
        }
      });
  }, [id, router]);
  return (
    <Container>
      <Header />
      <SubNavgation />
      <TeamDetails team={team} />
    </Container>
  );
};

export default Introduction;
