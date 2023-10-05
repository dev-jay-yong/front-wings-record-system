import styled from '@emotion/styled';
import { AttackType } from '../../PlayerDetails';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Box, TextBox } from '../RecordTabs';
import { useEffect, useState } from 'react';

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
  data: AttackType | undefined;
}
export const RecordTabAttack = ({ data }: RecordDataProps) => {
  const [accuracy, setAccuracy] = useState<number>(0);
  const [possession, setPossession] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  const onScroll = () => {
    setY(window.scrollY);
  };
  const handleAccuracyCount = (num: number) => {
    for (let i = 0; i <= num; i++) {
      setAccuracy(i);
    }
  };
  const handlPossessionCount = (num: number) => {
    for (let i = 0; i <= num; i++) {
      setPossession(i);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    onScroll();

    if (y > 350) {
      handleAccuracyCount(Number(data?.accuracy));
      handlPossessionCount(Number(data?.possession));
    } else {
      setAccuracy(0);
      setPossession(0);
    }
    return () => window.removeEventListener('scroll', onScroll);
  }, [data?.accuracy, data?.possession, setAccuracy, setPossession, y]);
  return (
    <>
      <Box>
        <TextBox>
          <CircularProgressbar
            value={accuracy}
            maxValue={100}
            text={`${data?.accuracy}%`}
            strokeWidth={6}
            className={'Progress'}
            styles={{
              path: {
                // Path color
                stroke: `#797F95`,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',
                // Customize transition animation
                transition: 'stroke-dashoffset 2s ease 0s',
                transformOrigin: 'center center',
              },
              text: {
                // Text color
                fill: '#949494',
                // Text size
                fontSize: '12px',
                fontWeight: 'bold',
              },
            }}
          />
          <div>공격 성공률</div>
        </TextBox>
        <TextBox>
          <CircularProgressbar
            value={possession}
            maxValue={100}
            text={`${data?.possession}%`}
            strokeWidth={6}
            className={'Progress'}
            styles={{
              path: {
                // Path color
                stroke: `#87BBB6`,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',
                // Customize transition animation
                transition: 'stroke-dashoffset 2s ease 0s',
                transformOrigin: 'center center',
              },
              text: {
                // Text color
                fill: '#949494',
                // Text size
                fontSize: '12px',
                fontWeight: 'bold',
              },
            }}
          />
          <div>공격 득점 점유율</div>
        </TextBox>
      </Box>
      <PlayerStat>
        <dl>
          <dt>공격 시도</dt>
          <dd>{data?.attack}</dd>
        </dl>
        <dl>
          <dt>공격 득점</dt>
          <dd>{data?.attack_success}</dd>
        </dl>
        <dl>
          <dt>범실</dt>
          <dd>{data?.attack_miss}</dd>
        </dl>
        <dl>
          <dt>상대 블록</dt>
          <dd>{data?.blocking_shut_out}</dd>
        </dl>
        <dl>
          <dt>성공율</dt>
          <dd>{data?.accuracy}%</dd>
        </dl>
        <dl>
          <dt>공격 득점 점유율</dt>
          <dd>{data?.possession}%</dd>
        </dl>
      </PlayerStat>
    </>
  );
};
