import { useQuery } from "@tanstack/react-query";
import { PopularFornecsChart } from "./popular-fornecs-chart";
import { RevenueChart } from "./revenue-chart";
import { RsRevenueCard } from "./rs-revenue-card";
import { ScRevenueCard } from "./sc-revenue-card";
import { ToRevenueCard } from "./to-revenue-card";
import { TotalRevenueCard } from "./total-revenue-card";
import { useAuthRedirect } from "@/hooks/auth-redirect";
import { validateToken } from "@/api/get-auth-validation";


export function Dashboard() {
    const {error} = useQuery({
        queryKey: ["testing"],
        queryFn: validateToken
    })
    
    useAuthRedirect(error)

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="grid grid-cols-4 gap-4">
                <RsRevenueCard />
                <ScRevenueCard />
                <ToRevenueCard />
                <TotalRevenueCard />
            </div>
            <div className="grid grid-cols-9 gap-4">
                <RevenueChart />
                <PopularFornecsChart />
            </div>
        </div>
    )
}