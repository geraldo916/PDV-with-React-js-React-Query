import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export default class Example extends PureComponent {
  
  render() {
    const {dataSet} = this.props
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={dataSet}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="8 8" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="natural" dataKey="uv" stroke="#134479" fill="#7df34edc" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
