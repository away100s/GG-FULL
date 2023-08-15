import { createContext, useContext, useState } from 'react';
import useVideoList from '../hooks/useVideoList';

const VideoContext = createContext();

function VideoProvider({ children }) {
  const { videos, isLoading } = useVideoList();
  const [searchedVideo, setSearchedVideo] = useState('');

  const listSearchedVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchedVideo.toLowerCase())
  );

  return (
    <VideoContext.Provider
      value={{
        videos,
        isLoading,
        searchedVideo,
        onSearchedVideo: setSearchedVideo,
        listSearchedVideos,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

function useVideoContext() {
  const context = useContext(VideoContext);
  if (context === undefined)
    throw new Error('useVideoContext placed outside the provider');
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { VideoProvider, useVideoContext };
