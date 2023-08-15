import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage';
import VideoDetailPage from './pages/VideoDetailPage';
import { VideoProvider } from './contexts/VideoContext';
import ScrollToTop from './components/ScrollToTop';
import ServerEventTest from './pages/ServerEventTest';

function App() {
  return (
    <VideoProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route index element={<Homepage />} />
          <Route path='search' element={<Homepage />} />
          <Route path='video/:id' element={<VideoDetailPage />} />
          <Route path='events' element={<ServerEventTest />} />
          <Route path='*' element={<p>No page found</p>} />
        </Routes>
      </BrowserRouter>
    </VideoProvider>
  );
}

export default App;
