import { useQuery } from "@tanstack/react-query";
import { AvertRevenueChart } from "./avert-revenue-chart/avert-revenue-chart";
import { RsAvertRevenueCard } from "./rs-avert-revenue-card";
import { ScAvertRevenueCard } from "./sc-avert-revenue-card";
import { TotalAvertRevenueCard } from "./total-avert-revenue-card";
import { useAuthRedirect } from "@/hooks/auth-redirect";
import { validateToken } from "@/api/get-auth-validation";
import { BadAreas } from "./avert-bad-areas";

export function Avert() {
    const {error} = useQuery({
        queryKey: ["testing"],
        queryFn: validateToken
    })

    useAuthRedirect(error)

    return (
         <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Avert</h1>
            <div className="grid grid-cols-3 gap-5">
                <RsAvertRevenueCard />
                <ScAvertRevenueCard />
                <TotalAvertRevenueCard />
            </div>
            <div className="grid grid-cols-9 gap-5">
                <AvertRevenueChart />
                <BadAreas />
            </div>
        </div>
    )
}