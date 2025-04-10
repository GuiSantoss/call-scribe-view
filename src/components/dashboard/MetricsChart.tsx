
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface MetricsChartProps {
  data: {
    name: string;
    value: number;
    fill: string;
  }[];
}

const MetricsChart = ({ data }: MetricsChartProps) => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Response Time Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {data.map((entry, index) => (
                <Bar key={`bar-${index}`} dataKey="value" name={entry.name} fill={entry.fill} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsChart;
