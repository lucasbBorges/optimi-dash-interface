import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useState } from "react";
import { ResponsiveContainer,  
         BarChart,
         Bar,
         CartesianGrid,
         XAxis
} from 'recharts'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { sky, violet } from 'tailwindcss/colors'
import { useQuery } from "@tanstack/react-query";
import { getAvertHistoryReceipt } from "@/api/get-avert-history-receipt";
import { calcTotalPositOrFat, Estado, generateAvertRevenueChartData, reduce } from "./avert-utils";


export function AvertRevenueChart() {
    const { data: monthReceipt, isFetching: isLoadingMonthReceipt } = useQuery({
        queryKey: ['avert', 'faturado-historico'],
        queryFn: getAvertHistoryReceipt,
    })

    
    const [activeChart, setActiveChart] = useState<Estado>("RS")
    const [revenueOrPositivation, setRevenueOrPositivation] = useState("fat")
    const total = monthReceipt? reduce(monthReceipt) : undefined
    const activeChartData = activeChart === 'RS' ? generateAvertRevenueChartData(monthReceipt)?.historicoRS 
                                                 : generateAvertRevenueChartData(monthReceipt)?.historicoSC

    const chartConfig = {
    views: {
        label: revenueOrPositivation === "fat" ? "Faturado R$" : "Positivado",
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

    return (
        <Card className="col-span-6">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 justify-between items-center pr-4">
                        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                            <CardTitle className="text-base font-medium">Receita Avert no período</CardTitle>
                            <CardDescription>Receita Avert diária dos últimos 3 meses</CardDescription>
                        </div>
                        <Select defaultValue="fat" onValueChange={(valor) => setRevenueOrPositivation(valor)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="fat">Faturamento</SelectItem>
                                <SelectItem value="posit">Positivação</SelectItem>
                            </SelectContent>
                        </Select>
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
                                    {isLoadingMonthReceipt? '-' : calcTotalPositOrFat(total, key)}
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
                        dataKey={revenueOrPositivation}
                        fill={`var(--color-${activeChart})`}
                        />
                    </BarChart>
                    </ChartContainer>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}