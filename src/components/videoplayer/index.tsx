import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url }: any) => {
  return <ReactPlayer className="h-auto w-100" url={url} style={{ objectFit: 'cover' }} controls />;
};

export default VideoPlayer;
