import { getTotalHistoryReceipt } from "@/api/get-total-history-receipt";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ResponsiveContainer,  
         LineChart,
         XAxis,
         YAxis,
         Line
} from 'recharts'

import { violet } from 'tailwindcss/colors'

export function RevenueChart() {
    const { data: monthReceipt, isFetching: isLoadingMonthReceipt } = useQuery({
    queryKey: ['total', 'history-receipt'],
    queryFn: getTotalHistoryReceipt,
  })

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
                    <LineChart data={monthReceipt} style={{fontsize: 12}}>
                        <XAxis dataKey='date' tickLine={false} axisLine={false} dy={16} fontSize={10}/>
                        
                        <YAxis stroke="#888" axisLine={false} tickLine={false} fontSize={10}
                        tickFormatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}/>
                        
                        <Line type="linear" strokeWidth={2} dataKey="faturamento" stroke={violet[500]}/>
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}