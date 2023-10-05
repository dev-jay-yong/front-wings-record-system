import styled from '@emotion/styled';
import { Header, SubNavgation, TeamDetails } from 'components';
import { TokenClient } from 'lib/Axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { TeamIntroductionType } from '../introduction';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 140px);
`;

const Record = () => {
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
    team_total_record: {
      total_win_count: 0,
      total_lose_count: 0,
    },
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

export default Record;
