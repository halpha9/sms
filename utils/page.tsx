export const scrollToBottom = (ref: React.MutableRefObject<any>) => {
  ref.current?.scrollIntoView({ behavior: 'smooth' });
};
