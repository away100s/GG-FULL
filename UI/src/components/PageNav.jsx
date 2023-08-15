import { Link } from 'react-router-dom';
import { Flex, Button } from '@chakra-ui/react';

import Logo from './Logo';
import SearchBar from './SearchBar';

function PageNav() {
  return (
    <Flex
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      backgroundColor='#0E1B3E'
      px='10'
      py='3'
      color='white'
      position='sticky'
      top='0'
      zIndex='1'
    >
      <Logo />
      <SearchBar />
      <Button as={Link} to='login' colorScheme='red' size='md' width='8rem'>
        Login
      </Button>
    </Flex>
  );
}

export default PageNav;
