import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  LinkOverlay,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function VideoItem({ video }) {
  const { title, username, url_thumbnail, _id } = video;

  const youtubeID = url_thumbnail.slice(
    url_thumbnail.length - 11,
    url_thumbnail.length
  );

  return (
    <Card maxW='3xl' bgColor={'#1B2C34'} color='gray.300'>
      <LinkOverlay as={Link} to={`/video/${_id}`}>
        <CardBody>
          <Image
            src={`https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`}
            alt={title}
            borderRadius='lg'
            border={'2px solid #ECE1CD'}
          />
          <Stack mt='6' spacing='2'>
            <Heading size='md' color={'gray.200'}>
              {title}
            </Heading>
            <Text>{username}</Text>
          </Stack>
        </CardBody>
      </LinkOverlay>
    </Card>
  );
}

export default VideoItem;
