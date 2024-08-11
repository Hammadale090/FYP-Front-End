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


const DonutChartData = ({ header, data, amount }: Props) => {
    return (
        <div className={`px-[22px] w-full md:mr-5 my-2 sm:max-md:max-w-[266.25] md:w-[266.25px] flex justify-between items-center py-[24px] gap-[10px] rounded-[15px] bg-[#FCFCFC] `}>

            {/* the header and data */}
            <div className='flex flex-col space-y-3'>
                <h1 className='text-[14px] text-[#808191]'>{header}</h1>
                <h1 className='text-[#11142D] text-[24px] font-bold'>{amount}</h1>
            </div>

            <div>
                <DonutChart
                    withTooltip={false}
                    size={80}
                    data={[
                        ...data,
                        { name: 'Other', value: 200, color: '#e4e8ef' },
                    ]}
                />
            </div>



        </div>
    )
}

export default DonutChartData