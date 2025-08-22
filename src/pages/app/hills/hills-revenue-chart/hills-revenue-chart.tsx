import { getHillsHistoryReceipt } from "@/api/get-hills-history-receipt";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ResponsiveContainer,  
         BarChart,
         Bar,
         CartesianGrid,
         XAxis
} from 'recharts'

import { sky, violet } from 'tailwindcss/colors'
import { Estado, formatReceipt, generateHillsRevenueChartData, reduce } from "./hills-utils";

const chartConfig = {
  views: {
    label: "Faturado R$",
  },
  RS: {
    label: "RS",
    color: violet[500],
  },
  SC: {
    label: "SC",
    color: sky[500],
  },
} satisfies ChartConfig

export function HillsRevenueChart() {
    const { data: monthReceipt, isFetching: isLoadingMonthReceipt } = useQuery({
        queryKey: ['hills', 'faturado-historico'],
        queryFn: getHillsHistoryReceipt,
    })
    const total = monthReceipt? reduce(monthReceipt) : undefined
    const [activeChart, setActiveChart] = useState<Estado>("RS")
    const activeChartData = activeChart === 'RS' ? generateHillsRevenueChartData(monthReceipt)?.historicoRS
                                                 : generateHillsRevenueChartData(monthReceipt)?.historicoSC

    return (
        <Card className="col-span-6">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle className="text-base font-medium">Receita Hill's no período</CardTitle>
                    <CardDescription>Receita Hill's diária dos últimos 3 anos</CardDescription>
                </div>
                    <div className="flex">
                        {["RS", "SC"].map((key) => {
                            const chart = key as Estado
                            return (
                                <button
                                    key={chart}
                                    data-active={activeChart === chart}
                                    className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                    onClick={() => setActiveChart(chart)}
                                >
                                    <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                    </span>
                                    <span className="text-lg font-bold leading-none sm:text-2xl">
                                    {isLoadingMonthReceipt ? '-' : formatReceipt(total, key)}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart data={activeChartData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        minTickGap={32}
                        />
                        <ChartTooltip
                        content={
                            <ChartTooltipContent
                            className="w-[150px]"
                            nameKey="views"
                            />
                        }
                        />
                        <Bar
                        dataKey='fat'
                        fill={`var(--color-${activeChart})`}
                        />
                    </BarChart>
                    </ChartContainer>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}