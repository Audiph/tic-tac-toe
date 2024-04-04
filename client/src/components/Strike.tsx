const Strike = ({ strikeClass }: { strikeClass: string }) => {
  return <div className={`absolute bg-red-500 ${strikeClass}`}></div>;
};

export default Strike;
