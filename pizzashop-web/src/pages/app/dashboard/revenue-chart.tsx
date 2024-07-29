import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts"
import colors from "tailwindcss/colors"

const data = [
  { date: '28/07', revenue: 1200 },
  { date: '29/07', revenue: 200 },
  { date: '30/07', revenue: 600 },
  { date: '01/08', revenue: 1800 },
  { date: '02/08', revenue: 150 },
  { date: '03/08', revenue: 1900 },
  { date: '04/08', revenue: 200 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              dy={16}
            />

            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />

            <CartesianGrid vertical={false} className="stroke-muted" />

            <Line type="linear" strokeWidth={2} dataKey="revenue" stroke={colors.violet['500']} />

          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
