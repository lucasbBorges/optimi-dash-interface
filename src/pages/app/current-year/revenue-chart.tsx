import { getTotalReceiptCompare } from "@/api/get-total-receipt-compare";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ResponsiveContainer,  
         LineChart,
         XAxis,
         YAxis,
         Line,
         CartesianGrid
} from 'recharts'
import { yearReceiptCompareResolve } from "./utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { sky, violet } from "tailwindcss/colors";



export function RevenueChart() {
    const { data: monthReceipt, isFetching: isLoadingMonthReceipt } = useQuery({
    queryKey: ['total', 'history-receipt-compare-year'],
    queryFn: getTotalReceiptCompare,
  })

    const monthReceiptResolved = yearReceiptCompareResolve(monthReceipt)

    const chartConfig = {
        faturamentoAnoRecente: {
            label: "Faturado Ano Recente",
            color: violet[500],
        },
        faturamentoAnoAnterior: {
            label: "Faturado Ano Anterior",
            color: sky[500],
        },
    } 

    return (
        <Card className="col-span-6">
            <CardHeader className="flex-row items-center justify-between pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium">Receita no período</CardTitle>
                    <CardDescription>Receita mensal dos últimos 3 anos</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <LineChart
                            accessibilityLayer
                            data={monthReceiptResolved}
                            margin={{
                            left: 12,
                            right: 12,
                            }}
                        >
                            <CartesianGrid stroke="none" />
                            <XAxis
                            dataKey="mes"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                            style={{ fontSize: 10, fontWeight: "bold"}}
                            />
                            <ChartTooltip
                            content={
                                <ChartTooltipContent
                                className="w-[150px]"
                                nameKey="views"
                                />
                            }
                            />
                            <Line
                            dataKey="faturamentoAnoRecente"
                            name={chartConfig.faturamentoAnoRecente.label}
                            type="monotone"
                            stroke={violet[500]}
                            strokeWidth={2}
                            dot={false}
                            />
                            <Line
                            dataKey="faturamentoAnoAnterior"
                            name={chartConfig.faturamentoAnoAnterior.label}
                            type="monotone"
                            stroke={sky[500]}
                            strokeWidth={2}
                            dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}