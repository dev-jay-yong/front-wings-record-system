import { TokenClient } from 'lib/Axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { RecordTitle } from '../../TeamPlayers/PlayerDetails/PlayerDetails';
import { PerformanceWrapper, ServeType } from '../TeamRecords';

export const TeamRecordServe = () => {
  const [serveData, setServeData] = useState<ServeType>();
  const router = useRouter();
  const id = router.query.team_id;

  useEffect(() => {
    TokenClient.get('/team/record/serve', { params: { team_id: id } })
      .then((response) => {
        if (response.status === 200) {
          setServeData(response.data.data);
        }
      })
      .catch((response) => {
        console.log(response.data);
        console.log(response.status);
      });
  }, [id]);
  return (
    <>
      <RecordTitle>서브 기록</RecordTitle>
      <PerformanceWrapper>
        <table>
          <thead>
            <tr>
              <th>경기수</th>
              <th>세트수</th>
              <th>서브 시도</th>
              <th>서브 득점</th>
              <th>서브 범실</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{serveData?.match_count}</td>
              <td>{serveData?.set_count}</td>
              <td>{serveData?.serve_count}</td>
              <td>{serveData?.serve_success}</td>
              <td>{serveData?.serve_miss}</td>
            </tr>
          </tbody>
        </table>
      </PerformanceWrapper>
    </>
  );
};
