import React from 'react'
import { DonutChart } from '@mantine/charts';



interface DonutChartDataSlice {
    name: string; // Name of the slice (displayed in the chart)
    value: number; // Numerical value of the slice (determines slice size)
    color: string; // Optional color for the slice (defaults to chart's theme)
}

// Improved Props type with refined data property
type Props = {
    header: string;
    data: DonutChartDataSlice[]; // Array of DonutChartDataSlice objects
    amount: string
};


const AgentProfStatus = ({ header, data, amount }: Props) => {
    return (
        <div className={`px-[31px] w-full sm:mr-2 md:mr-5 my-2 sm:max-md:max-w-[364px] md:w-[364px] flex flex-col justify-between border border-[#E4E4E4] shadow-md items-center py-[20px] gap-[10px] rounded-[10px] bg-[#FCFCFC] `}>

            {/* the header and data */}
            <div className='flex flex-col items-center space-y-2'>
                <h1 className='text-[16px] text-[#808191] leading-[24px]'>{header}</h1>
                <h1 className='text-[#11142D] text-[25px] font-bold'>{amount}</h1>
            </div>

            <div>
                <DonutChart
                    size={60}
                    withTooltip={false}
                    thickness={12}
                    data={[
                        ...data,
                        { name: 'Other', value: 200, color: '#e4e8ef' },
                    ]}
                />
            </div>



        </div>
    )
}

export default AgentProfStatus