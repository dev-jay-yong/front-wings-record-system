import { TokenClient } from 'lib/Axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { RecordTitle } from '../../TeamPlayers/PlayerDetails/PlayerDetails';
import { PerformanceWrapper, ReceiveType } from '../TeamRecords';

export const TeamRecordReceive = () => {
  const [receiveData, setReceiveData] = useState<ReceiveType>();
  const router = useRouter();
  const id = router.query.team_id;

  useEffect(() => {
    TokenClient.get('/team/record/serve_receive', { params: { team_id: id } })
      .then((response) => {
        if (response.status === 200) {
          setReceiveData(response.data.data);
        }
      })
      .catch((response) => {
        console.log(response.data);
        console.log(response.status);
      });
  }, [id]);
  return (
    <>
      <RecordTitle>리시브 기록</RecordTitle>
      <PerformanceWrapper>
        <table>
          <thead>
            <tr>
              <th>경기수</th>
              <th>세트수</th>
              <th>리시브 시도</th>
              <th>리시브 성공</th>
              <th>리시브 실패</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{receiveData?.match_count}</td>
              <td>{receiveData?.set_count}</td>
              <td>{receiveData?.receive}</td>
              <td>{receiveData?.receive_success}</td>
              <td>{receiveData?.receive_miss}</td>
            </tr>
          </tbody>
        </table>
      </PerformanceWrapper>
    </>
  );
};
