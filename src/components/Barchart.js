import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from 'recharts';


const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  const radius = 10;
  
  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
        {value.split(' ')[1]}
      </text>
    </g>
  );
};

export default class BarCharts extends PureComponent {

  render() {
    const data = this.props.dataSet
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={200}
          height={200}
          data={data}
          margin={{
            top: 46,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="fr" fill="#8884d8" minPointSize={5}>
            <LabelList dataKey="name" content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey="pv" fill="#82ca9d" minPointSize={10} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}