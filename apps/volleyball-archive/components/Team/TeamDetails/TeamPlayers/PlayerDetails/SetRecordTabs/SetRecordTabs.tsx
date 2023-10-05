import styled from '@emotion/styled';
import React from 'react';
import { SetRecordType } from 'components/Team/TeamDetails/TeamPlayers/PlayerDetails/PlayerDetails';

const PerformanceWrapper = styled.div`
  margin: 10px 0;
  width: 100%;
  max-width: 960px;
  border-top: 2px solid #1a2b64;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
  }

  th {
    font-size: 14px;
    padding: 15px 0;
    color: #1a2b64;
    background: #f6f7f8;
    border-bottom: 1px solid #e0dfe1;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
  td {
    font-size: 14px;
    padding: 15px 0;
    border-bottom: 1px solid #e0dfe1;
    text-align: center;
    color: #767676;
    font-weight: 700px;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

export interface PlayerSetRecordProps {
  data: SetRecordType[] | undefined;
}

export const SetRecordTabs = ({ data }: PlayerSetRecordProps) => {
  return (
    <PerformanceWrapper>
      <table>
        <thead>
          <tr>
            <th style={{ width: '50px' }}>번호</th>
            <th style={{ width: '280px' }}>세트명</th>
            <th style={{ width: '130px' }}>공격 득점/시도</th>
            <th style={{ width: '130px' }}>서브 득점/시도</th>
            <th style={{ width: '130px' }}>블로킹 성공/시도</th>
            <th style={{ width: '140px' }}>서브 리시브 정확/시도</th>
            <th style={{ width: '130px' }}>디그 정확/시도</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((data, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{data.set_name}</td>
                <td>
                  {data.attack_success}/{data.attack}(
                  {data.attack_success_ratio}%)
                </td>
                <td>
                  {data.serve_success}/{data.serve}({data.serve_success_ratio}%)
                </td>
                <td>
                  {data.block_success}/{data.block}({data.block_success_ratio}%)
                </td>
                <td>
                  {data.receive_success}/{data.receive}(
                  {data.receive_success_ratio}%)
                </td>
                <td>
                  {data.dig_success}/{data.dig}({data.dig_success_ratio}%)
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </PerformanceWrapper>
  );
};
