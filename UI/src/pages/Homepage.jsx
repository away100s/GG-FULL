import { Box } from '@chakra-ui/react';

import PageNav from '../components/PageNav';
import VideoList from '../components/VideoList';
import Footer from '../components/Footer';

function Homepage() {
  return (
    <Box minH='100vh' bgColor='#D8D2C6' display='flex' flexDirection='column'>
      <PageNav />
      <VideoList />
      <Footer />
    </Box>
  );
}

export default Homepage;
