import { Box, Grid } from '@chakra-ui/react';

import PageNav from '../components/PageNav';
import VideoList from '../components/VideoList';
import Footer from '../components/Footer';
import VideoPlayer from '../components/VideoPlayer';
import CommentList from '../components/CommentList';
import ProductList from '../components/ProductList';

function VideoDetailPage() {
  return (
    <Box minH='100vh' bgColor='#D8D2C6' display='flex' flexDirection='column'>
      <PageNav />
      <Grid
        templateColumns={['1fr', '1fr', '1fr', '80% 20%']}
        templateRows={['1fr auto', '1fr auto', '1fr auto', '1fr']}
        bgColor={'blackAlpha.900'}
      >
        <VideoPlayer />
        <CommentList />
      </Grid>
      <ProductList />
      <VideoList />
      <Footer />
    </Box>
  );
}

export default VideoDetailPage;
