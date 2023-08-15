import { Image, LinkOverlay as ChakraLink, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to='/'>
      <Text fontSize={['xs', 'xs', 'md', 'lg']}>Play</Text>
      <Image src='/tokopedia-logo.png' alt='tokopedia logo' width='10rem' />
    </Link>
  );
}

export default Logo;
