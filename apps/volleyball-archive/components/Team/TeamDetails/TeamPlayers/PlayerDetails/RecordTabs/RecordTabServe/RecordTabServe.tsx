import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { ServeType } from '../../PlayerDetails';
import { PlayerStat } from '../RecordTabAttack/RecordTabAttack';
import { Box, TextBox } from '../RecordTabs';

interface RecordDataProps {
  data: ServeType | undefined;
}

export const RecordTabServe = ({ data }: RecordDataProps) => {
  const [possession, setPossession] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  const onScroll = () => {
    setY(window.scrollY);
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
      handlPossessionCount(Number(data?.possession));
    } else {
      setPossession(0);
    }
    return () => window.removeEventListener('scroll', onScroll);
  }, [data?.possession, setPossession, y]);
  return (
    <>
      <Box>
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
          <div>서브 에이스 점유율</div>
        </TextBox>
      </Box>
      <PlayerStat>
        <dl>
          <dt>서브 시도</dt>
          <dd>{data?.serve_count}</dd>
        </dl>
        <dl>
          <dt>서브 에이스</dt>
          <dd>{data?.serve_success}</dd>
        </dl>
        <dl>
          <dt>범실</dt>
          <dd>{data?.serve_miss}</dd>
        </dl>
        <dl>
          <dt>서브 에이스 점유율</dt>
          <dd>{data?.possession}%</dd>
        </dl>
      </PlayerStat>
    </>
  );
};
