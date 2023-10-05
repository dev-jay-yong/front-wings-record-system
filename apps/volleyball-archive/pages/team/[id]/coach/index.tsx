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

export type CoachType = {
  name: string;
  birth: string;
  role: string;
  position_name: string;
  position_code: string;
  profile_image: string;
};

const Coach = () => {
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
  const [coach, setCoach] = useState<CoachType>({
    name: '',
    birth: '',
    role: '',
    position_name: '',
    position_code: '',
    profile_image: '',
  });

  useEffect(() => {
    TokenClient.get('/team/introduction', { params: { team_id: id } })
      .then((response) => {
        if (response.status === 200) {
          setTeam(response.data.data);
        }
      })
      .catch((response) => {
        console.log(response.data);
        console.log(response.status);
      });

    TokenClient.get('/team/coach', { params: { team_id: id } })
      .then((response) => {
        if (response.status === 200) {
          setCoach(response.data.data);
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
      <TeamDetails team={team} coach={coach} />
    </Container>
  );
};

export default Coach;
