import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Staticstics({ bookings, confirmedStays, numDays, cabinCount}) {

    //1. Total Number of bookings
    const numBookings = !bookings ? 0 : bookings.length;

    //2. Total Sales Amount
    const totalSales = !bookings ? 0 : bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

    //3. Total Check In's
    const checkins = !confirmedStays ? 0 : confirmedStays.length;

    //4. Ocupancy Rate = (Number of Checked In nights) / (All Available nigths(num days, num cabins))

    const ocupation = !confirmedStays ? 0 : confirmedStays.reduce(
        (acc, cur) => acc + cur.numNights, 
        0
    )/ (numDays * cabinCount);

    return (
        <>
        <Stat 
            title='Bookings' 
            color='blue' 
            icon={<HiOutlineBriefcase />} 
            value={numBookings}
        />
        <Stat 
            title='Sales' 
            color='green' 
            icon={<HiOutlineBanknotes />} 
            value={formatCurrency(totalSales)}
        />
        <Stat 
           title='Check Ins' 
           color='indigo' 
           icon={<HiOutlineCalendarDays />} 
           value={checkins}
        />
        <Stat 
           title='Occupancy Rate' 
           color='yellow' 
           icon={<HiOutlineChartBar />} 
           value={Math.round(ocupation * 100) + '%'}
        />
            
        </>
    );
}

export default Staticstics;
