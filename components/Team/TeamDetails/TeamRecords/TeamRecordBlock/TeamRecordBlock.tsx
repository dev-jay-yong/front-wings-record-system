import { TokenClient } from 'lib/Axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { RecordTitle } from '../../TeamPlayers/PlayerDetails/PlayerDetails';
import { BlockType, PerformanceWrapper } from '../TeamRecords';

export const TeamRecordBlock = () => {
  const [blockData, setBlockData] = useState<BlockType>();
  const router = useRouter();
  const id = router.query.team_id;

  useEffect(() => {
    TokenClient.get('/team/record/block', { params: { team_id: id } })
      .then((response) => {
        if (response.status === 200) {
          setBlockData(response.data.data);
        }
      })
      .catch((response) => {
        console.log(response.data);
        console.log(response.status);
      });
  }, [id]);
  return (
    <>
      <RecordTitle>블로킹 기록</RecordTitle>
      <PerformanceWrapper>
        <table>
          <thead>
            <tr>
              <th>경기수</th>
              <th>세트수</th>
              <th>블로킹 성공</th>
              <th>유효 블로킹</th>
              <th>범실</th>
              <th>실패</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{blockData?.match_count}</td>
              <td>{blockData?.set_count}</td>
              <td>{blockData?.block_success}</td>
              <td>{blockData?.block}</td>
              <td>{blockData?.block_miss}</td>
              <td>{blockData?.block_fail}</td>
            </tr>
          </tbody>
        </table>
      </PerformanceWrapper>
    </>
  );
};
