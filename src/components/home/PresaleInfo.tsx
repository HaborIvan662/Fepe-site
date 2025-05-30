interface PresaleInfoProps {
  info: {
    raised: string;
    price: string;
  };
}

const PresaleInfo = ({ info }: PresaleInfoProps) => {
  return (
    <div className="flex flex-col gap-3 mt-[15px] w-full">
      <div className="text-center text-black">
        <span className="uppercase text-[24px]  font-medium">USDT Raised:  {info.raised}</span>
      </div>

      <p className="relative text-center text-sm text-custom-red font-medium before:absolute before:left-0 before:top-1/2 before:h-px before:w-1/5 before:bg-black after:absolute after:right-0 after:top-1/2 after:h-px after:w-1/5 after:bg-black">
        1 $FEPE = ${info.price}
      </p>
    </div>
  );
};

export default PresaleInfo; 