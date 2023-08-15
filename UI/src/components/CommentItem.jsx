import { Box, Tag, TagLabel, Text, Wrap } from '@chakra-ui/react';

function CommentItem({ comment }) {
  const timestamp = new Date(comment.timestamp);
  const hour = timestamp.getHours();
  const minute = timestamp.getMinutes();

  return (
    <Box display={'flex'} flexDir={'column'} mt={6}>
      <Tag
        size='lg'
        borderRadius='full'
        width='max-content'
        fontSize={'sm'}
        variant={'outline'}
        color={'gray.50'}
      >
        <TagLabel>{comment.username}</TagLabel>
      </Tag>

      <Tag
        size='lg'
        colorScheme='blue'
        borderRadius='full'
        mt={1}
        width={'fit-content'}
        pr={4}
      >
        <TagLabel>
          <Wrap py={1} lineHeight={1.25}>
            {comment.comment}
          </Wrap>
        </TagLabel>
      </Tag>

      <Text
        fontSize={'xs'}
        mt={1}
        position={'relative'}
        left={2}
      >{`${hour}:${minute}`}</Text>
    </Box>
  );
}

export default CommentItem;
