import React from 'react'
import { BarChart } from '@mantine/charts';

type Props = {}

const CustomerData = (props: Props) => {

    const sampleData = [
        { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
        { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
        { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
        { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
        { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
    ];
    return (
        <div className='flex justify-between items-center my-2'>
            <div className='flex flex-col'>
                <h1 className='text-[#11142D] text-[26px] font-semibold'>5007K</h1>
                <h1 className='text-[#6C6C6C] text-[12px] font-semibold'>21.77%</h1>
            </div>


            <BarChart
                h={100}
                w={150}
                data={sampleData}
                withTooltip={false}
                dataKey="month"
                series={[{ name: 'Smartphones', color: 'teal' }]}
                withXAxis={false}
                withYAxis={false}
            />
        </div>
    )
}

export default CustomerData