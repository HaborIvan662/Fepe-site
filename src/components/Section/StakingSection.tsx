import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';
import ConnectWalletModal from '../Modal/ConnectWalletModal';
import WithdrawToken from '../Modal/WithdrawToken';
import ClaimNotLiveModal from '../Modal/ClaimNotLiveModal';

interface DataPoint {
  month: string;
  value: number;
}

const data: DataPoint[] = [
  { month: 'Mar-2025', value: 107031250000 },
  { month: 'Apr-2025', value: 107812500000 },
  { month: 'May-2025', value: 108593750000 },
  { month: 'Jun-2025', value: 109375000000 },
  { month: 'Jul-2025', value: 110156250000 },
  { month: 'Aug-2025', value: 110937500000 },
  { month: 'Sep-2025', value: 111718750000 },
  { month: 'Oct-2025', value: 112500000000 },
  { month: 'Nov-2025', value: 113281250000 },
  { month: 'Dec-2025', value: 114062500000 },
  { month: 'Jan-2026', value: 114843750000 },
  { month: 'Feb-2026', value: 115625000000 },
  { month: 'Mar-2026', value: 116406250000 },
  { month: 'Apr-2026', value: 117187500000 },
  { month: 'May-2026', value: 117968750000 },
  { month: 'Jun-2026', value: 118750000000 },
  { month: 'Jul-2026', value: 119531250000 },
  { month: 'Aug-2026', value: 120312500000 },
  { month: 'Sep-2026', value: 121093750000 },
  { month: 'Oct-2026', value: 121875000000 },
  { month: 'Nov-2026', value: 122656250000 },
  { month: 'Dec-2026', value: 123437500000 },
  { month: 'Jan-2027', value: 124218750000 },
  { month: 'Feb-2027', value: 125000000000 },
  { month: 'Mar-2027', value: 125781250000 },
];

export default function StakingSection() {
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isClaimNotLiveModalOpen, setIsClaimNotLiveModalOpen] = useState(false);

  return (
    <div className="bg-custom-green w-full min-h-screen">
      <div className="py-[130px] px-[20px] md:px-[50px]">
        <div className="container">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full lg:w-3/4 text-center">
              <h3 className="text-[36px] md:text-[56px] font-bold mb-8 drop-shadow">Welcome to $FEPE Staking</h3>
              <p className="text-black text-[16px] pt-8">
                The distribution of $FEPE token rewards will occur at a rate of 3567.35 $FEPE tokens per ETH block. These rewards will be disbursed over 2 years and will be claimable once claim goes live.
              </p>
            </div>

            <div className="w-full md:w-11/12 mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 text-[16px] text-black">
              {/* Box 1 */}
              <div className="bg-white p-5 border-[3px] border-black rounded-[16px] shadow w-full">
                <div>
                  <span className="block">Staked Balance</span>
                  <div className="font-semibold">0 $FEPE</div>
                </div>
                <div className="mt-4">
                  <span className="block">Your stakeable</span>
                  <div className="font-semibold text-[18px]">0 $FEPE</div>
                </div>
                <div 
                  onClick={() => setIsConnectWalletModalOpen(true)}
                  className="w-full mt-4 border-[3px] border-black bg-custom-red py-[10px] min-w-[140px] rounded-[16px] mx-auto text-white text-center cursor-pointer hover:bg-custom-green hover:text-black transition-colors duration-300"
                >
                  Buy And Stake
                </div>
              </div>

              {/* Box 2 */}
              <div className="bg-white p-5 border-[3px] border-black rounded-[16px] shadow w-full">
                <div className="flex justify-between items-center">
                  <div>% of Pool</div>
                  <img src="/assets/images/svg-icons/info-black.svg" alt="info" className="w-4 h-4 cursor-pointer" />
                </div>
                <h2 className="font-semibold text-[18px]">0%</h2>
                <div className="mt-4">
                  <span className="block">Total Staked</span>
                  <h2 className="font-semibold text-[18px]">1,545,083,530 $FEPE</h2>
                </div>
                <button 
                  onClick={() => setIsWithdrawModalOpen(true)}
                  className="w-full mt-4 border-[3px] border-black bg-custom-red py-[10px] min-w-[140px] rounded-[16px] mx-auto text-white text-center leading-none cursor-pointer hover:bg-custom-green hover:text-black transition-colors duration-300"
                >
                  Withdraw Staked Tokens
                </button>
              </div>

              {/* Box 3 */}
              <div className="bg-white p-5 border-[3px] border-black rounded-[16px] shadow w-full flex flex-col justify-between">
                <div>
                  <span className="block">Estimated Rewards</span>
                  <h2 className="font-semibold text-[18px]">607%<sup className="ml-1 text-sm">p/a</sup></h2>
                </div>
                <ul className="mt-3 leading-normal text-[10px]">
                  <li className="flex items-center"><img src="/assets/images/svg-icons/left.svg" alt="left" className="mr-1 w-3 h-3" />Rewards rate is dynamic</li>
                  <li className="flex items-center"><img src="/assets/images/svg-icons/left.svg" alt="left" className="mr-1 w-3 h-3" />Monthly = Rewards % / 12</li>
                  <li className="flex items-center"><img src="/assets/images/svg-icons/left.svg" alt="left" className="mr-1 w-3 h-3" />Daily = Rewards % / 365</li>
                </ul>
              </div>

              {/* Box 4 */}
              <div className="bg-white p-5 border-[3px] border-black rounded-[16px] shadow w-full">
                <div>
                  <span className="block">Current Rewards</span>
                  <h2 className="font-semibold text-[18px]">3567.35 <sup className="ml-1 text-sm">Per ETH Block</sup></h2>
                </div>
              </div>

              {/* Box 5 */}
              <div className="bg-white p-5 border-[3px] border-black rounded-[16px] shadow w-full flex flex-col justify-between">
                <div>
                  <span className="block">Total Rewards</span>
                  <h2 className="font-semibold text-[18px]">0 $FEPE</h2>
                </div>
                <button 
                  onClick={() => setIsClaimNotLiveModalOpen(true)}
                  className="w-full mt-4 border-[3px] border-black bg-custom-red py-[10px] min-w-[140px] rounded-[16px] mx-auto text-white text-center cursor-pointer hover:bg-custom-green hover:text-black transition-colors duration-300"
                >
                  Claim Rewards
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-3/4 mb-[16px] mx-auto mt-12">
            <div className="border-[3px] border-black bg-white rounded-[20px] min-h-[431px]">
              <div className="mt-4 text-center text-black text-[18px] font-semibold">Total Supply</div>
              <div className="w-full h-[500px] p-4 bg-white rounded-2xl shadow-md">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis 
                      dataKey="month" 
                      angle={-60} 
                      textAnchor="end" 
                      interval={0} 
                      height={80}
                      tick={{ fontSize: 12, fill: 'black' }}
                      label={{ value: 'Months', position: 'bottom', offset: 0, fill: 'black' }}
                    />
                    <YAxis 
                      tickFormatter={(val: number) => `${(val / 1e9).toFixed(0)}M`}
                      domain={[0, 130000000000]}
                      ticks={[0, 20000000000, 40000000000, 60000000000, 80000000000, 100000000000, 120000000000]}
                      tick={{ fill: 'black' }}
                      label={{ value: 'Supply', angle: -90, position: 'left', offset: 0, style: { textAnchor: 'middle', fill: 'black' } }}
                    />
                    <Bar dataKey="value" radius={[5, 5, 0, 0]} cursor="pointer">
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.month === 'May-2025' ? '#FF5600' : '#87878780'}
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={(e: React.MouseEvent<SVGElement>) => {
                            const target = e.target as HTMLElement;
                            target.style.opacity = '0.7';
                            
                            // Remove any existing tooltip
                            const existingTooltip = document.getElementById('custom-tooltip');
                            if (existingTooltip) {
                              existingTooltip.remove();
                            }
                            
                            // Create tooltip
                            const tooltip = document.createElement('div');
                            tooltip.style.position = 'fixed';
                            tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                            tooltip.style.color = 'white';
                            tooltip.style.padding = '5px 10px';
                            tooltip.style.borderRadius = '4px';
                            tooltip.style.textAlign = 'center';
                            tooltip.style.zIndex = '1000';
                            tooltip.className = 'tooltip-fade';
                            
                            const rect = target.getBoundingClientRect();
                            tooltip.style.top = `${rect.top - 70}px`;
                            tooltip.style.left = `${rect.left + (rect.width / 2)}px`;
                            tooltip.style.transform = 'translateX(-50%)';
                            
                            tooltip.innerHTML = `${entry.month}<br>${entry.value.toLocaleString()}`;
                            tooltip.id = 'custom-tooltip';
                            document.body.appendChild(tooltip);
                          }}
                          onMouseLeave={(e: React.MouseEvent<SVGElement>) => {
                            const target = e.target as HTMLElement;
                            target.style.opacity = '1';
                            const tooltip = document.getElementById('custom-tooltip');
                            if (tooltip) {
                              tooltip.className = 'tooltip-fade-out';
                              setTimeout(() => tooltip.remove(), 300);
                            }
                          }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <span className="font-14 text-black mb-0 mx-auto text-center flex items-center justify-center gap-1">
              Staking powered by
              <a href="https://web3paymentsolutions.io/" target="_blank" rel="noopener">
                <img src="/assets/images/svg-icons/W3P_Black.svg" alt="Web3Payments" className="h-[18px]" />
              </a>
            </span>
          </div>
        </div>
      </div>

      <ConnectWalletModal 
        isOpen={isConnectWalletModalOpen}
        onClose={() => setIsConnectWalletModalOpen(false)}
      />

      <WithdrawToken
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
      />

      <ClaimNotLiveModal
        isOpen={isClaimNotLiveModalOpen}
        onClose={() => setIsClaimNotLiveModalOpen(false)}
      />
    </div>
  )
}
