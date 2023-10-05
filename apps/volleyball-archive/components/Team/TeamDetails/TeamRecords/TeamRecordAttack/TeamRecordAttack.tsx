import { TokenClient } from 'lib/Axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { RecordTitle } from '../../TeamPlayers/PlayerDetails/PlayerDetails';
import { AttackType, PerformanceWrapper } from '../TeamRecords';

export const TeamRecordItem = () => {
  const [attackData, setAttackData] = useState<AttackType>();
  const router = useRouter();
  const id = router.query.team_id;

  useEffect(() => {
    TokenClient.get('/team/record/attack', { params: { team_id: id } })
      .then((response) => {
        if (response.status === 200) {
          setAttackData(response.data.data);
        }
      })
      .catch((response) => {
        console.log(response.data);
        console.log(response.status);
      });
  }, [id]);
  return (
    <>
      <RecordTitle>공격 기록</RecordTitle>
      <PerformanceWrapper>
        <table>
          <thead>
            <tr>
              <th>경기수</th>
              <th>세트수</th>
              <th>공격 시도</th>
              <th>공격 성공</th>
              <th>범실</th>
              <th>상대 블로킹</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{attackData?.match_count}</td>
              <td>{attackData?.set_count}</td>
              <td>{attackData?.attack}</td>
              <td>{attackData?.attack_success}</td>
              <td>{attackData?.attack_miss}</td>
              <td>{attackData?.blocking_shut_out}</td>
            </tr>
          </tbody>
        </table>
      </PerformanceWrapper>
    </>
  );
};
