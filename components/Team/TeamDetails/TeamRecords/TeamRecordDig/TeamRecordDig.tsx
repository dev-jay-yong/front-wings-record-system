import { TokenClient } from 'lib/Axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { RecordTitle } from '../../TeamPlayers/PlayerDetails/PlayerDetails';
import { DigType, PerformanceWrapper } from '../TeamRecords';

export const TeamRecordDig = () => {
  const [digData, setDigData] = useState<DigType>();
  const router = useRouter();
  const id = router.query.team_id;

  useEffect(() => {
    TokenClient.get('/team/record/dig', { params: { team_id: id } })
      .then((response) => {
        if (response.status === 200) {
          setDigData(response.data.data);
        }
      })
      .catch((response) => {
        console.log(response.data);
        console.log(response.status);
      });
  }, [id]);
  return (
    <>
      <RecordTitle>디그 기록</RecordTitle>
      <PerformanceWrapper>
        <table>
          <thead>
            <tr>
              <th>경기수</th>
              <th>세트수</th>
              <th>디그 시도</th>
              <th>디그 성공</th>
              <th>디그 실패</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{digData?.match_count}</td>
              <td>{digData?.set_count}</td>
              <td>{digData?.dig}</td>
              <td>{digData?.dig_success}</td>
              <td>{digData?.dig_fail}</td>
            </tr>
          </tbody>
        </table>
      </PerformanceWrapper>
    </>
  );
};
