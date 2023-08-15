import { SimpleGrid, CircularProgress } from '@chakra-ui/react';

import { useLocation } from 'react-router-dom';

import { useVideoContext } from '../contexts/VideoContext';
import VideoItem from './VideoItem';

function VideoList() {
  const { isLoading, listSearchedVideos, videos } = useVideoContext();

  const { pathname } = useLocation();

  return (
    <>
      {isLoading ? (
        <CircularProgress
          mt={'auto'}
          mx={'auto'}
          isIndeterminate
          size='6rem'
          color='blue.500'
        />
      ) : pathname === '/search' ? (
        <SimpleGrid
          minChildWidth={['xs', 'md', 'md']}
          p={4}
          gap={4}
          justifyItems='center'
        >
          {listSearchedVideos.map((video) => (
            <VideoItem key={video._id} video={video} />
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid
          minChildWidth={['xs', 'md', 'md']}
          p={4}
          gap={4}
          justifyItems='center'
        >
          {videos.map((video) => (
            <VideoItem key={video._id} video={video} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
}

export default VideoList;
