import { getTopFornecs } from "@/api/get-total-top-fornecs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from "tailwindcss/colors";

const COLORS = [
    colors.sky[400],
    colors.amber[400],
    colors.violet[400],
    colors.emerald[400],
    colors.rose[400],
    colors.indigo[400]
]

export function PopularFornecsChart () {
    const { data } = useQuery({
    queryKey: ['total', 'top-fornecs'],
    queryFn: getTopFornecs,
  })

    return (
        <Card className="col-span-3">
            <CardHeader className="pb-4">
                <div className="flex flex-col gap-1">
                    <CardTitle className="text-base font-medium">
                        Fornecedores populares
                    </CardTitle>
                    <CardDescription>
                        Top fornecedores do período
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="pr-4 pl-4">
                {data ?
                <ResponsiveContainer width='100%' height={240}>    
                    <PieChart style={{fontsize: 12}}>
                        <Pie 
                            data={data} 
                            dataKey='faturamento' 
                            nameKey='fornec' 
                            cx='50%' 
                            cy='50%'
                            outerRadius={86}
                            innerRadius={64}
                            strokeWidth={8}
                            labelLine={false}
                            label={({
                                cx,
                                cy,
                                midAngle,
                                innerRadius,
                                outerRadius,
                                value,
                                index,
                                }) => {
                                const RADIAN = Math.PI / 180
                                const radius = 12 + innerRadius + (outerRadius - innerRadius)
                                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                                const y = cy + radius * Math.sin(-midAngle * RADIAN)

                                return (
                                    <text
                                    x={x}
                                    y={y}
                                    className="fill-muted-foreground text-xs"
                                    textAnchor={x > cx ? 'start' : 'end'}
                                    dominantBaseline="central"
                                    >
                                    {data[index].fornec.length > 12
                                        ? data[index].fornec.substring(0, 12).concat('...')
                                        : data[index].fornec}{' '}
                                    {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                    }).format(value)}
                                    </text>
                                )
                                }}
                                >
                            {data?.map((_, index) => {
                                return (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} className="stroke-background hover:opacity-50"/>
                                )
                            })}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                : ''}   
            </CardContent>
        </Card>
    )
}