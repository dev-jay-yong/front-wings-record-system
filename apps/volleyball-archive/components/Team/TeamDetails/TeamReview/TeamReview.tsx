import styled from '@emotion/styled';
import { TokenClient } from 'lib/Axios';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { TeamComboBox } from '../TeamDetails';

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
`;

const ReviewHeader = styled.div`
  display: flex;
  height: 80px;
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;
const Title = styled.div`
  font-size: 18px;
  color: #0e76bc;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ReviewWrapper = styled.div`
  width: 100%;
  padding: 36px 40px 35px 40px;
  color: #253032;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  font-size: 14px;
  font-weight: bold;
  white-space: pre-wrap;
  margin: 10px 0 100px 0;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 26px 30px 25px 30px;
  }
`;

type SelectType = {
  id: number;
  title: string;
};

type DataType = {
  id: number;
  team_id: number;
  title: string;
  content: string;
};
export const TeamReview = () => {
  const router = useRouter();
  const teamId = router.query.team_id;
  const [id, setId] = useState<number>(1);
  const [selectData, setSelectData] = useState<SelectType[]>();
  const [historyData, setHistoryData] = useState<DataType>();
  useEffect(() => {
    TokenClient.get(`/team/history/${teamId}`, { params: { content_id: id } })
      .then((response) => {
        if (response.status === 200) {
          setSelectData(response.data.data.history_list);
          setHistoryData(response.data.data.history_detail);
        }
      })
      .catch((response) => {
        console.log(response.data);
        console.log(response.status);
      });
  }, [teamId, id]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setId(Number(e.target.value));
  };

  return (
    <Container>
      <ReviewHeader>
        <Title>{historyData?.title}</Title>
        <TeamComboBox onChange={handleChange}>
          {selectData?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </TeamComboBox>
      </ReviewHeader>
      <ReviewWrapper>{historyData?.content}</ReviewWrapper>
    </Container>
  );
};
