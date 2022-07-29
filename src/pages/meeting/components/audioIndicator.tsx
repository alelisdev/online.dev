import React from 'react';

type IProps = {
  audioLevel: number;
};

export default function AudioIndicator({ audioLevel }: IProps) {
  const _renderItems = (audioLevel: number) => {
    const items = [];
    for (let i = 0; i < Math.floor(audioLevel * 50); i++) {
      items.push(<span key={i} className="audio-indicator-item active"></span>);
    }
    return items;
  };

  return (
    <div className="audio-indicator-wrapper">
      <span className="audio-indicator-item active"></span>
      {_renderItems(audioLevel)}
    </div>
  );
}
