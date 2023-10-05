import styled from '@emotion/styled';
import { Header, PlayerDetails, SubNavgation, TeamDetails } from 'components';
import { TokenClient } from 'lib/Axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TeamIntroductionType } from '../introduction';
import { PlayerType } from '../players';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 140px);
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    padding: 0 50px;
  }
  @media (max-width: 768px) {
    padding: 0 30px;
  }
`;

const PlayerInfo = () => {
  const router = useRouter();
  const id = router.query.team_id;
  const playerId = router.query.player;
  const [team, setTeam] = useState<TeamIntroductionType>({
    id: 0,
    name: '',
    team_logo: '',
    gender: true,
    created_at: '',
    coach: '',
    performance: [],
  });
  const [player, setPlayer] = useState<PlayerType[]>([]);

  useEffect(() => {
    TokenClient.get('/team/introduction', { params: { team_id: id } })
      .then((response) => {
        if (response.status === 200) {
          setTeam(response.data.data);
        }
      })
      .catch((err) => {
        console.log(err.data);
      });

    TokenClient.get('/team/players', { params: { team_id: id } })
      .then((response) => {
        if (response.status === 200) {
          setPlayer(response.data.data);
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
      <TeamDetails team={team} player={player} isBlue />
      <Wrapper>
        <PlayerDetails player_id={playerId} team_id={id} />
      </Wrapper>
    </Container>
  );
};

export default PlayerInfo;
