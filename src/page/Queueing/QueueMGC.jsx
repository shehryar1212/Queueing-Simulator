import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import QueueForm from '../../components/QueueForm';

const factorial = (n) => {
  if(n === 0){
      return 1;
  }
  if (n > 0) {
        return n * factorial(n - 1);
    }
}
function calculatePo(c, rho){
    let res = 0
    for(let n = 0; n<c; n++){
      res += Math.pow((c*rho), n)/factorial(n)
    }
    return 1 / (res + (Math.pow((c*rho), c)/(factorial(c)*(1-rho))))
}
const calculateCsSquare = (variance,mue) => {
  return (variance / Math.pow((1 / mue ),2));
}
const calculateMGC = (meanArrivalTime, minServiceTime,maxServiceTime,servers) => {
  meanArrivalTime = parseFloat(1 / meanArrivalTime);
  let meanServiceTime = 1/ ((+minServiceTime + +maxServiceTime)/2);
  servers = parseInt(servers)
  
  const rho = +(meanArrivalTime / (servers * meanServiceTime)).toFixed(1);
  if(rho < 1){
      
  const idle = +(1 - rho).toFixed(1);
  const variance = Math.pow((maxServiceTime - minServiceTime),2)/12;
  const cs2 = calculateCsSquare(variance,meanServiceTime);
   const Lq = +(((calculatePo(servers, rho)*Math.pow((meanArrivalTime/meanServiceTime),servers)*rho)/(factorial(servers)*Math.pow(1-rho, 2))) * ((cs2 + 1) / 2)).toFixed(1);
    const Wq = +(Lq / meanArrivalTime).toFixed(2);
    const Ws = +(Wq + (1/meanServiceTime)).toFixed(2);
    const Ls = +((meanArrivalTime*Ws)).toFixed(2);
    return {
        rho,
        idle,
        Wq,
        Lq,
        Ws,
        Ls
    }
  }else{
      console.log("This is not queuing model..");
      return {rho};
  }
}
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#831843",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:hover': {
    backgroundColor: "#c2b38c",
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const QueueMGC = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (formData) => {
        setIsLoading(true);
        try {
            const { ArrivalTime, MinServiceTime, MaxServiceTime, Servers } = formData;
            const model = calculateMGC(ArrivalTime, MinServiceTime, MaxServiceTime, Servers);
            setData({
              ...model
            });
        } catch (error) {
            console.error('Calculation error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleClear = () => {
        setData({});
    }

    const formFields = [
        {
            name: 'ArrivalTime',
            label: 'Arrival Rate (λ)',
            type: 'number',
            required: true,
            helperText: 'Average arrival rate per time unit',
            unit: 'customers/time'
        },
        {
            name: 'MinServiceTime',
            label: 'Min Service Time',
            type: 'number',
            required: true,
            helperText: 'Minimum service time range',
            unit: 'time units'
        },
        {
            name: 'MaxServiceTime',
            label: 'Max Service Time',
            type: 'number',
            required: true,
            helperText: 'Maximum service time range',
            unit: 'time units'
        },
        {
            name: 'Servers',
            label: 'Number of Servers (c)',
            type: 'number',
            required: true,
            helperText: 'Total number of servers',
            unit: 'servers'
        }
    ];
  return (
    <div className='w-full min-h-screen pb-20'>
        <div className='w-full max-w-6xl mx-auto p-4'>
            <QueueForm
                fields={formFields}
                onSubmit={handleSubmit}
                submitButtonText="Calculate"
                isLoading={isLoading}
                onClear={handleClear}
            />
        </div>

        <Box className="px-3 py-6">
        {
          (Object.keys(data).length === 0) ?
          null
          :
          (Object.keys(data).length === 1) ?
           <div className='flex items-center justify-center'>
            <div className='border-1 border p-2 rounded-lg border-pink-200 max-w-md mx-auto'>
            <h1 className='text-center font-sans font-bold text-xl text-pink-950'>{`Rho (${data.rho}) is greater than 1. It's not a stable model.`}</h1>
            </div>
           </div>
          :
            <>
              {/* Performance Insights */}
              <div className="bg-gray-200 p-4 rounded-lg mb-4 max-w-6xl mx-auto">
                <h3 className="font-semibold text-pink-900 mb-2">Performance Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-pink-900">Utilization: </span>
                    <span className="font-medium">{data.rho}</span>
                  </div>
                  <div>
                    <span className="text-pink-900">Wait Time in Queue: </span>
                    <span className="font-medium">{data.Wq}</span>
                  </div>
                  <div>
                    <span className="text-pink-900">Wait Time in System: </span>
                    <span className="font-medium">{data.Ws}</span>
                  </div>
                  <div>
                    <span className="text-pink-900">Length in Queue: </span>
                    <span className="font-medium">{data.Lq}</span>
                  </div>
                  <div>
                    <span className="text-pink-900">Length in System: </span>
                    <span className="font-medium">{data.Ls}</span>
                  </div>
                  <div>
                    <span className="text-pink-900">Idle Time: </span>
                    <span className="font-medium">{data.idle}</span>
                  </div>
                </div>
              </div>

              {/* Server Utilization Indicator */}
              <div className="max-w-6xl mx-auto mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Server Utilization: {Number((data.rho * 100).toFixed(2))}%</span>
                  <span className={`text-sm ${
                    data.rho > 0.8 ? 'text-pink-900' :
                    data.rho > 0.6 ? 'text-pink-700' : 'text-gray-900'
                  }`}>
                    {data.rho > 0.8 ? 'High' : data.rho > 0.6 ? 'Medium' : 'Low'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      data.rho > 0.8 ? 'bg-pink-900' :
                      data.rho > 0.6 ? 'bg-pink-700' : 'bg-gray-900'
                    }`}
                    style={{ width: `${Math.min(Number((data.rho * 100).toFixed(2)), 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Results Table - Desktop */}
              <div className="hidden md:block">
                <TableContainer component={Paper} sx={{ maxWidth: '1200px', margin: 'auto' }}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align='center'>Utilization</StyledTableCell>
                      <StyledTableCell align='center'>Wait Time In Queue(Wq)</StyledTableCell>
                      <StyledTableCell align='center'>Wait Time In System(Ws)</StyledTableCell>
                      <StyledTableCell align='center'>Length In Queue(Lq)</StyledTableCell>
                      <StyledTableCell align='center'>Length In System(Ls)</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data ? (
                      <StyledTableRow className='px-15'>
                        <StyledTableCell className='mx-15' align='center'>{data.rho}</StyledTableCell>
                        <StyledTableCell className='mx-15' align='center'>{data.Wq}</StyledTableCell>
                        <StyledTableCell className='mx-5' align='center'>{data.Ws}</StyledTableCell>
                        <StyledTableCell className='mx-5' align='center'>{data.Lq}</StyledTableCell>
                        <StyledTableCell className='mx-5' align='center'>{data.Ls}</StyledTableCell>
                      </StyledTableRow>
                    ) : (
                      <StyledTableRow>
                        <StyledTableCell colSpan={5} align="center">No queuing model data available</StyledTableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </Table>
                </TableContainer>
              </div>

              {/* Results Table - Mobile Card Layout */}
              <div className="md:hidden space-y-3 max-w-6xl mx-auto">
                <div className="border rounded-lg p-3 bg-white">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="font-medium">Utilization:</span><span>{data.rho}</span>
                    <span className="font-medium">Wait Time Q:</span><span>{data.Wq}</span>
                    <span className="font-medium">Wait Time S:</span><span>{data.Ws}</span>
                    <span className="font-medium">Length Q:</span><span>{data.Lq}</span>
                    <span className="font-medium">Length S:</span><span>{data.Ls}</span>
                  </div>
                </div>
              </div>
            </>
        }
      </Box>
    </div>
  )
}

export default QueueMGC