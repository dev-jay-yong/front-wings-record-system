import styled from '@emotion/styled';
import { SetupType } from '../../PlayerDetails';
import 'react-circular-progressbar/dist/styles.css';

export const PlayerStat = styled.div`
  flex: 1;
  border-left: 1px solid #e0e0e0;
  margin: 0;
  text-align: center;

  dl {
    width: 33.33%;
    float: left;
    border-right: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    box-sizing: border-box;
    margin: 0;

    &:nth-of-type(3) {
      border-right: none;
    }
    &:nth-of-type(6) {
      border-right: none;
    }

    dt {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      height: 62px;
      font-size: 14px;
      color: #1a2b64;
      background-color: #f6f7f8;
      border-bottom: 1px solid #e0e0e0;
      margin: 0;

      @media (max-width: 768px) {
        font-size: 10px;
      }
    }

    dd {
      height: 60px;
      line-height: 61px;
      font-size: 14px;
      margin: 0;
      font-weight: 500;

      @media (max-width: 768px) {
        font-size: 10px;
      }
    }
  }
`;
interface RecordDataProps {
  data: SetupType | undefined;
}
export const RecordTabSetup = ({ data }: RecordDataProps) => {
  return (
    <>
      <PlayerStat>
        <dl>
          <dt>레프트 셋업 성공</dt>
          <dd>{data?.left_setup_success}</dd>
        </dl>
        <dl>
          <dt>레프트 셋업 실패</dt>
          <dd>{data?.left_setup_fail}</dd>
        </dl>
        <dl>
          <dt>센터 셋업 성공</dt>
          <dd>{data?.center_setup_success}</dd>
        </dl>
        <dl>
          <dt>센터 셋업 실패</dt>
          <dd>{data?.center_setup_fail}</dd>
        </dl>
        <dl>
          <dt>A퀵 셋업 성공</dt>
          <dd>{data?.a_quick_setup_success}</dd>
        </dl>
        <dl>
          <dt>A퀵 셋업 실패</dt>
          <dd>{data?.a_quick_setup_fail}</dd>
        </dl>
        <dl>
          <dt>라이트 셋업 성공</dt>
          <dd>{data?.right_setup_success}</dd>
        </dl>
        <dl>
          <dt>라이트 셋업 실패</dt>
          <dd>{data?.right_setup_fail}</dd>
        </dl>
        <dl>
          <dt>2단 셋업 성공</dt>
          <dd>{data?.setup_success}</dd>
        </dl>
        <dl>
          <dt>2단 셋업 실패</dt>
          <dd>{data?.setup_fail}</dd>
        </dl>
      </PlayerStat>
    </>
  );
};
