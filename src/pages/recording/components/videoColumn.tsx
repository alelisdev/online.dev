/** eslint-ignore */
import React from 'react';
import VideoPlayer from '../../../components/videoplayer';
import AnalysisTimeline from './analysisTimeline';

const VideoColumn = (props: any) => {
  const recording = props.recording;
  return (
    <div className="h-100" style={{ position: 'relative' }}>
      <div className="analysis-video-wrapper rounded-3">
        <VideoPlayer url={recording.url}></VideoPlayer>
      </div>

      <div className="mt-3" style={{ left: 0 }}>
        <AnalysisTimeline />
      </div>
    </div>
  );
};

export default VideoColumn;
