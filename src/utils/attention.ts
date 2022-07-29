// Calculation based on behaviour
export const calculateAttention = (count: any, behaves: any[]) => {
  if (behaves.length === 0) {
    return 0;
  } else if (behaves[0].includes('angry')) {
    return count > 52 ? count - 3 - parseInt((Math.random() * 10).toFixed(0)) : 31;
  } else if (behaves[0].includes('sad')) {
    return count > 50 ? count - 5 - parseInt((Math.random() * 10).toFixed(0)) : 33;
  } else if (behaves[0].includes('happy')) {
    return count < 70 ? count + 18 + parseInt((Math.random() * 10).toFixed(0)) : 92;
  } else if (behaves[0].includes('surprised')) {
    return count < 70 ? count + 16 + parseInt((Math.random() * 10).toFixed(0)) : 83;
  } else if (behaves.some((el) => el.includes('surprised'))) {
    return count < 70 ? count + 14 + parseInt((Math.random() * 10).toFixed(0)) : 72;
  } else if (
    behaves.some((el) => el.includes('sad')) &&
    behaves.some((el) => el.includes('angry'))
  ) {
    return count > 60 ? count - 20 - parseInt((Math.random() * 10).toFixed(0)) : 29;
  } else if (behaves[1].includes('sad')) {
    return count > 50
      ? count - parseInt((Math.random() * 10).toFixed(0))
      : 42 - parseInt((Math.random() * 10).toFixed(0));
  } else if (behaves[1].includes('angry')) {
    return count > 50 ? count - 3 - parseInt((Math.random() * 10).toFixed(0)) : 46;
  } else if (behaves[1].includes('happy')) {
    return count < 57 ? count + 11 + parseInt((Math.random() * 10).toFixed(0)) : 68;
  } else if (behaves[1].includes('surprised')) {
    return count < 57 ? count + 7 + parseInt((Math.random() * 10).toFixed(0)) : 63;
  } else if (behaves[0].includes('neutral') && !behaves.some((el) => el.includes('fearful'))) {
    return 50 + parseInt((Math.random() * 10).toFixed(0));
  } else {
    return 62 - parseInt((Math.random() * 10).toFixed(0));
  }
};

//calculates colour of the attention frame

export const setFrameColour = (attentionCount: number) => {
  if (attentionCount === 0) {
    return '#fff';
  } else if (attentionCount < 37) {
    return '#911111';
  } else if (attentionCount < 43) {
    return '#de7a7a';
  } else if (attentionCount < 57) {
    return '#e8e866';
  } else if (attentionCount < 64) {
    return '#d17c21';
  } else if (attentionCount < 67) {
    return '#cdf283';
  } else if (attentionCount < 70) {
    return '#4cd11f';
  } else {
    return '#4cd11f';
  }
};
