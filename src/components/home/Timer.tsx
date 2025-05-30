interface TimerProps {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const Timer = ({ days, hours, minutes, seconds }: TimerProps) => {
  const timeUnits = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <div className="flex items-center justify-center w-full gap-2 bg-white shadow-sm border-[3px] border-black rounded-[16px]">
      {timeUnits.map((unit, i) => (
        <div key={i} className="rounded-lg text-center flex flex-col min-w-[78px] md:min-w-[30px] 930:min-w-[78px] p-[10px] justify-center items-center text-black">
          <div className="text-[21px]">{unit.value}</div>
          <div className="text-[12px] text-gray-600 leading-[20px] font-normal font-[Baloo 2]">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timer; 