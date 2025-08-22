import { useQuery } from "@tanstack/react-query";
import { BadAreas } from "./hills-bad-areas";
import { HillsRevenueChart } from "./hills-revenue-chart/hills-revenue-chart";
import { RsHillsRevenueCard } from "./rs-hills-revenue-card";
import { ScHillsRevenueCard } from "./sc-hills-revenue-card";
import { TotalHillsRevenueCard } from "./total-hills-revenue-card";
import { validateToken } from "@/api/get-auth-validation";
import { useAuthRedirect } from "@/hooks/auth-redirect";

export function Hills() {
    const {error} = useQuery({
        queryKey: ["testing"],
        queryFn: validateToken
    })

    useAuthRedirect(error)

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Hill's</h1>
            <div className="grid grid-cols-3 gap-5">
                <RsHillsRevenueCard />
                <ScHillsRevenueCard />
                <TotalHillsRevenueCard />
            </div>
            <div className="grid grid-cols-9 gap-4">
                <HillsRevenueChart />
                <BadAreas />
            </div>
        </div>
    )
}