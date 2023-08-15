import { Box } from '@chakra-ui/react';

function Footer() {
  return (
    <Box p={6} textAlign='center' mt={'auto'}>
      <p>&copy; Copyright {new Date().getFullYear()} - Away </p>
    </Box>
  );
}

export default Footer;
