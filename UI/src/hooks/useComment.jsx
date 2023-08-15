import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DATABASE_URL = 'https://tokopedia-play-clone.cyclic.app/';

function useComment() {
  const { id } = useParams();
  const [commentDatabase, setCommentDatabase] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fecthCommentList() {
        try {
          setIsLoading(true);
          const res = await axios.get(`${DATABASE_URL}/${id}/comment`);
          setCommentDatabase(res.data?.list_comments);
        } catch (error) {
          console.log(error);
          setCommentDatabase([]);
        } finally {
          setIsLoading(false);
        }
      }
      fecthCommentList();
    },
    [id]
  );

  useEffect(() => {
    // Create a new EventSource connection to the SSE endpoint
    const eventSource = new EventSource(`${DATABASE_URL}/${id}/comment/sse`);

    // Handle SSE updates from the server
    eventSource.onmessage = (event) => {
      const sseData = JSON.parse(event.data);
      if (sseData.newComment.video === id) {
        setComments((prevComment) => [...prevComment, sseData.newComment]);
      }
    };

    // Handle SSE errors
    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
    };

    // Close the EventSource connection when the component is unmounted
    return () => {
      eventSource.close();
    };
  }, [id]);

  return { commentDatabase, comments, isLoading };
}

export default useComment;
