import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
    const [searchParamas] = useSearchParams();

    const numDays = !searchParamas.get('last') 
        ? 7 
        : Number(searchParamas.get('last'));

    const queryDate = subDays(new Date(), numDays).toISOString();

    const {isStaysLoading, data: bookings} = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey: ['bookings', `last-${numDays}`]
    });

    return {isStaysLoading, bookings};
}

