import React, { useState, useEffect } from 'react';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { useLocation } from 'react-router-dom';
import { BarChart } from '@mui/x-charts';

const Graphs = () => {
  const colors = ["#831843", "#d1d5db"];
  const location = useLocation();
  const chart = location.state;

  const scatterPlotArrival = chart?.arrivalTime?.map((arrival, index) => ({
    id: `data-${index}`,
    x: arrival,
    y: chart?.serviceTime[index],
  }));

  const scatterPlotService = chart?.serviceTime?.map((service, index) => ({
    id: `data-${index}`,
    x: chart?.arrivalTime[index],
    y: service,
  }));

  const [dimensions, setDimensions] = useState({
    width: Math.min(window.innerWidth * 0.9, 600), 
    height: Math.min(window.innerHeight * 0.4, 500), 
  });
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: Math.min(window.innerWidth * 0.9, 600),
        height: Math.min(window.innerHeight * 0.4, 500),
      });
    };

    handleResize(); // Call immediately to set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center bg-cream gap-4 p-4">
      <div className="border border-black rounded-md p-2 w-full md:w-[48%] overflow-x-auto md:overflow-hidden">
        <h1 className="text-center font-bold mb-4">Scatter Plot</h1>
        <div style={{ minWidth: dimensions.width }}>
          <ScatterChart
            width={dimensions.width}
            height={dimensions.height}
            series={[
              {
                label: 'Arrival Time',
                data: scatterPlotArrival.map((v) => ({ x: v.x, y: v.y, id: v.id })),
                color: colors[1],
              },
              {
                label: 'Service Time',
                data: scatterPlotService.map((v) => ({ x: v.x, y: v.y, id: v.id })),
                color: colors[0],
              },
            ]}
          />
        </div>
      </div>

      {/* Bar Charts */}
      {[
        { title: 'Arrival Time', data: chart?.arrivalTime },
        { title: 'Service Time', data: chart?.serviceTime },
        { title: 'TurnAround', data: chart?.turnAroundTime },
        { title: 'Response Time', data: chart?.responseTime },
        { title: 'Waiting Time', data: chart?.waitingTime },
      ].map((item, index) => (
        <div
          key={index}
          className="border border-black rounded-md p-2 w-full md:w-[48%] overflow-x-auto md:overflow-hidden"
        >
          <h1 className="text-center font-bold mb-4">{item.title}</h1>
          <div style={{ minWidth: dimensions.width }}>
            <BarChart
              xAxis={[
                {
                  scaleType: 'band',
                  data: item.data,
                },
              ]}
              series={[{ data: item.data, color: colors[index % colors.length] }]}
              width={dimensions.width} 
              height={dimensions.height}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Graphs;

