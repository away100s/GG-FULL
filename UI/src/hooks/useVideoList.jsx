import axios from 'axios';
import { useEffect, useState } from 'react';

const DATABASE_URL = 'https://tokopedia-play-clone.cyclic.app/';

function useVideo() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchVideos() {
      try {
        setIsLoading(true);
        const res = await axios.get(DATABASE_URL);
        setVideos(res.data.list_videos);
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideos();
  }, []);

  return { videos, isLoading };
}

export default useVideo;
