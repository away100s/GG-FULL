import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DATABASE_URL = 'https://tokopedia-play-clone.cyclic.app/';

function useVideoDetail(specificData = '') {
  if (typeof specificData !== 'string')
    throw new Error('Argument only accept string');

  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchVideoDetail() {
        try {
          setIsLoading(true);
          const res = await axios.get(`${DATABASE_URL}/${id}/${specificData}`);
          setDetail(res?.data);
        } catch (err) {
          console.log(err);
          setDetail([]);
        } finally {
          setIsLoading(false);
        }
      }
      fetchVideoDetail();
    },
    [id, specificData]
  );

  return { detail, isLoading, setDetail };
}

export default useVideoDetail;
