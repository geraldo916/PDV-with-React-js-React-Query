import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector,Line, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#dc0f5f','#5f50cc'];

const RADIAN = Math.PI / 180;

let renderLabel = function(entry) {
    return entry.name;
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index ,name}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

var a = ({name}) =>{
    return name
}

export default class PizzaChart extends PureComponent {

  render() {
      var data = this.props.dataSet
    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart  width={400} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    nameKey='name'
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    legendType='circle'
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} color='#fff' fontSize='16px' fill={COLORS[index % COLORS.length]} />
                    ))}

                </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div style={{
                color:'#000',
                display:'flex',
                position:'absolute',
                top:'50px',
                right:'0px',
                flexDirection:'column',
                fontSize:'10px'
                }} >
                {data.map((entry, index) => (
                <div style={{backgroundColor:`${COLORS[index % COLORS.length]}`,top:'0',margin:'10px',padding:'6px',color:'#fff'}}>
                        {entry.name}
                </div>
                ))}
            </div>
        </>
      
    );
  }
}
