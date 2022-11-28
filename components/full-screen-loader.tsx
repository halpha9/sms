import Spinner from './spinner';

const FullScreenLoader = () => {
  return (
    <div className="w-screen h-screen fixed bg-slate-800">
      <div className="absolute top-64 left-1/2 -translate-x-1/2">
        <Spinner width={50} height={50} />
      </div>
    </div>
  );
};

export default FullScreenLoader;
