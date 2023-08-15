import { Button, Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CommentForm({ onCurComments }) {
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');
  const { id } = useParams();

  const newComment = new URLSearchParams();
  newComment.append('username', capitalize(username));
  newComment.append('comment', comment);

  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  async function handlePostComment(ev) {
    ev.preventDefault();

    try {
      await axios.post(
        `http://localhost:3000/${id}/comment`,
        newComment.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      onCurComments((dataComment) => [
        ...dataComment,
        { _id: Date.now(), username, comment, timestamp: Date.now() },
      ]);

      setComment('');
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  return (
    <form onSubmit={handlePostComment}>
      <Flex mt='auto' flexDir={'column'} gap={4}>
        <Input
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          placeholder='username'
        />

        <Input
          value={comment}
          onChange={(ev) => setComment(ev.target.value)}
          placeholder='comment'
        />

        <Button type='submit' colorScheme='blue'>
          Add
        </Button>
      </Flex>
    </form>
  );
}

export default CommentForm;
