interface ProgressBarProps {
  progress: number;
  label: string;
}

const ProgressBar = ({ progress, label }: ProgressBarProps) => {
  return (
    <div className="w-full h-[28px] rounded-[18px] border-[3px] border-black bg-black mx-auto overflow-hidden relative">
      <div 
        className="rounded-[18px] bg-white h-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
      <div className="absolute inset-0 w-full h-full text-[12px] text-center z-[1] text-black font-semibold">
        {label}
      </div>
    </div>
  );
};

export default ProgressBar; 