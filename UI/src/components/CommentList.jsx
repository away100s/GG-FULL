import {
  SkeletonText,
  Grid,
  AbsoluteCenter,
  Divider,
  Box,
} from '@chakra-ui/react';

import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { useEffect, useRef, useState } from 'react';
import useComment from '../hooks/useComment';

function CommentList() {
  const { commentDatabase, comments, isLoading } = useComment();
  const [curComments, setCurComments] = useState([]);

  const commentSectionRef = useRef();

  useEffect(
    function () {
      setCurComments(commentDatabase);
    },
    [commentDatabase]
  );

  useEffect(
    function () {
      setCurComments([...comments]);
    },
    [comments]
  );

  useEffect(() => {
    commentSectionRef.current.scrollTop =
      commentSectionRef.current.scrollHeight;
  }, [curComments]);

  return (
    <Grid bgColor='gray.900' color={'gray.200'} p={4} templateRows={'1fr auto'}>
      <Box
        ref={commentSectionRef}
        display={'flex'}
        flexDir={'column'}
        overflow={'hidden'}
        overflowY={'auto'}
        maxH={{ base: '2xs', '2xl': 'sm' }}
      >
        <SkeletonText
          noOfLines={10}
          spacing='4'
          skeletonHeight='2'
          isLoaded={!isLoading}
        >
          <Box position={'relative'} p={4}>
            <Divider />
            <AbsoluteCenter
              bg={'gray.900'}
              px={4}
              fontSize={['xs', 'xs', 'xs', 'md']}
            >
              Start comment
            </AbsoluteCenter>
          </Box>
          {curComments
            ? curComments?.map((comment) => (
                <CommentItem comment={comment} key={comment._id} />
              ))
            : null}
        </SkeletonText>
      </Box>

      <Box my={'auto'} pt={4}>
        <CommentForm onCurComments={setCurComments} />
      </Box>
    </Grid>
  );
}

export default CommentList;
