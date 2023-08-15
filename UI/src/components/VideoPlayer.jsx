import {
  AspectRatio,
  Box,
  Heading,
  Text,
  Flex,
  Skeleton,
} from '@chakra-ui/react';
import ReactPlayer from 'react-player/youtube';
import useVideoDetail from '../hooks/useVideoDetail';

function VideoPlayer() {
  const { detail, isLoading } = useVideoDetail('');
  const url = detail.detail_video?.url_thumbnail;

  return (
    <Skeleton isLoaded={!isLoading} fadeDuration>
      <AspectRatio maxW='100%' ratio={[1 / 1, 1 / 1, 21 / 9]}>
        <ReactPlayer
          url={url}
          width='100%'
          height='100%'
          controls={true}
          playing={true}
        />
      </AspectRatio>
    </Skeleton>
  );
}

export default VideoPlayer;
