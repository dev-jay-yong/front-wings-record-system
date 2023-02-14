import styled from '@emotion/styled';
import { TokenClient } from 'lib/Axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PhotoSwiper } from './PhotoSwiper/PhotoSwiper';
import { PlayerJob } from './PlayerJob/PlayerJob';
import { RecordTabs } from './RecordTabs/RecordTabs';

interface PlayerDetailProps {
  team_id: string | string[] | undefined;
  player_id: string | string[] | undefined;
}

const Container = styled.div`
  width: 100%;
  max-width: 960px;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  margin-top: 30px;
`;

const ProfileImage = styled.img`
  object-fit: contain;
  width: 507px;
  height: 498px;
  @media (max-width: 768px) {
    width: 400px;
    height: 400px;
  }
  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
  }
`;

const PlayerProfileWrapper = styled.div`
  display: flex;
  width: 453px;
  height: 498px;
  flex-direction: column;
  padding-top: 86px;

  @media (max-width: 600px) {
    padding-top: 0px;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const PlyaerNumber = styled.div`
  color: #253032;
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 20px;
    text-align: center;
  }
`;

const PlayerName = styled.div`
  color: #253032;
  font-size: 28px;
  padding-top: 10px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 22px;
    text-align: center;
  }
`;

const ProfileContent = styled.div`
  width: 351px;
  margin-top: 33px;
  padding-top: 34px;
  border-top: 1px solid #e0e0e0;

  @media (max-width: 980px) {
    width: unset;
    margin-right: 20px;
  }
  @media (max-width: 600px) {
    border: none;
    text-align: center;
    margin-top: 0px;
    margin-right: 0px;
    padding: 10px 0 20px 0;
  }
`;
const ProfileBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 980px) {
    flex-direction: column;
    gap: 6px;
    margin-top: 8px;
  }
  h4 {
    color: #253032;
    font-weight: bold;
    font-size: 14px;
    margin: 3px;
    width: 60px;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
  span {
    color: #767676;
    font-size: 14px;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

const RecordTable = styled.table`
  width: 100%;
  border-spacing: 0;
  table-layout: fixed;

  td {
    height: 50px;
    font-size: 14px;
    color: #767676;
    text-align: center;
    border-top: 1px solid #e0e0e0;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
  td + td {
    border-left: 1px solid #e0e0e0;
  }
`;

const TableHeader = styled.thead`
  th {
    font-size: 14px;
    font-weight: 700;
    color: #1a2b64;
    background-color: #f6f7f8;
    height: 50px;
    text-align: center;
    border-top: 1px solid #e0e0e0;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
  th + th {
    border-left: 1px solid #e0e0e0;
  }
`;

const TableBody = styled.tbody`
  th {
    height: 50px;
    font-size: 14px;
    color: #253032;
    text-align: center;
    border-top: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    background-color: #ffffff;
    @media (max-width: 768px) {
      font-size: 10px;
    }
  }
`;

export const RecordTitle = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #0e76bc;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const RecordBox = styled.div`
  display: flex;
  width: 100%;
  height: 247px;
  border: 1px solid #e0e0e0;
  margin-top: 15px;
`;

const FlexBox = styled.div`
  display: flex;
  gap: 30px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export type AttackType = {
  attack: number;
  attack_success: number;
  attack_miss: number;
  blocking_shut_out: number;
  accuracy: number;
  possession: number;
};

export type ServeType = {
  serve_success: number;
  serve_miss: number;
  serve_count: number;
  possession: number;
};

export type BlockType = {
  block_success: number;
  block: number;
  block_miss: number;
  block_fail: number;
  possession: number;
};

export type DigType = {
  dig: number;
  dig_success: number;
  dig_fail: number;
  possession: number;
};

export type ReceiveType = {
  receive: number;
  receive_success: number;
  receive_miss: number;
  possession: number;
};

type RankType = {
  total_count: number;
  rank: number;
};

export type PhotoGalleryType = {
  id: number;
  user_id: number;
  image_url: string;
};

type PrizeType = {
  id: number;
  prize_name: string;
  created_at: string;
  user_id: number;
  team_id: number;
};

type TripleCrownType = {
  id: number;
  user_id: number;
  back_attack_count: number;
  serve_count: number;
  block_count: number;
  created_at: string;
  match_id: number;
};

type ReferenceRecordType = {
  id: number;
  user_id: number;
  record_name: string;
  created_at: string;
};

export type DetailRecordType = {
  attack: AttackType;
  serve: ServeType;
  block: BlockType;
  dig: DigType;
  serve_receive: ReceiveType;
  set_count: number;
  match_count: number;
};

type UserType = {
  id: number;
  name: string;
  number: number;
  profile_image: string;
  weight: number | null;
  height: number | null;
  position: string | null;
  birth: string;
};

type PlayerRecordType = {
  score_rank: RankType;
  attack_rank: RankType;
  serve_rank: RankType;
  block_rank: RankType;
  receive_rank: RankType;
};

export type JobType = {
  prize: PrizeType[];
  triple_crown: TripleCrownType[];
  reference_record: ReferenceRecordType[];
};

interface PlayerData {
  user: UserType;
  detail_record: DetailRecordType;
  player_record: PlayerRecordType;
  photo_gallery_urls: PhotoGalleryType[];
  job: JobType;
}

const PlayerDetails = ({ team_id, player_id }: PlayerDetailProps) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [playerData, setPlayerData] = useState<PlayerData>();

  useEffect(() => {
    TokenClient.get(`/team/player/${player_id}`, {
      params: { team_id: team_id },
    })
      .then((response) => {
        if (response.status === 200) {
          setPlayerData(response.data.data);
        }
      })
      .catch((err) => {
        if (err.response.data.status_code === 400) {
          router.replace('/', undefined, { shallow: true });
        }
      });
  }, [team_id, player_id, router]);

  return (
    <Container>
      <ProfileBox>
        <FlexBox style={{ display: 'flex', gap: '30px' }}>
          <ProfileImage src={playerData?.user.profile_image} />
          <PlayerProfileWrapper>
            <PlyaerNumber>
              NO.{playerData?.user.number}{' '}
              {playerData?.user.position === null
                ? '-'
                : playerData?.user.position}
            </PlyaerNumber>
            <PlayerName>{playerData?.user.name}</PlayerName>
            <ProfileContent>
              <ProfileBlock>
                <h4>생년월일</h4>
                <span>{playerData?.user.birth}</span>
              </ProfileBlock>
              <ProfileBlock>
                <h4>신장/체중</h4>
                <span>
                  {playerData?.user.height === null
                    ? '-'
                    : playerData?.user.height}
                  cm /{' '}
                  {playerData?.user.weight === null
                    ? '-'
                    : playerData?.user.weight}
                  kg
                </span>
              </ProfileBlock>
            </ProfileContent>
          </PlayerProfileWrapper>
        </FlexBox>
        <RecordTable>
          <TableHeader>
            <tr>
              <th scope='col'>구분</th>
              <th scope='col'>득점</th>
              <th scope='col'>공격</th>
              <th scope='col'>서브</th>
              <th scope='col'>블로킹</th>
              <th scope='col'>수비</th>
            </tr>
          </TableHeader>
          <TableBody>
            <tr>
              <th scope='row'>종합기록</th>
              <td>{playerData?.player_record.score_rank.total_count}</td>
              <td>{playerData?.player_record.attack_rank.total_count}</td>
              <td>{playerData?.player_record.serve_rank.total_count}</td>
              <td>{playerData?.player_record.block_rank.total_count}</td>
              <td>{playerData?.player_record.receive_rank.total_count}</td>
            </tr>
            <tr>
              <th scope='row'>전체순위</th>
              <td>{playerData?.player_record.score_rank.rank}</td>
              <td>{playerData?.player_record.attack_rank.rank}</td>
              <td>{playerData?.player_record.serve_rank.rank}</td>
              <td>{playerData?.player_record.block_rank.rank}</td>
              <td>{playerData?.player_record.receive_rank.rank}</td>
            </tr>
          </TableBody>
        </RecordTable>
      </ProfileBox>
      <RecordTitle>기록 상세 (연도)</RecordTitle>
      <RecordBox>
        <RecordTabs data={playerData?.detail_record} />
      </RecordBox>
      <RecordTitle>포토갤러리</RecordTitle>
      <PhotoSwiper images={playerData?.photo_gallery_urls} />
      <RecordTitle>주요 경력</RecordTitle>
      <PlayerJob data={playerData?.job} />
    </Container>
  );
};

export default PlayerDetails;
