import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { filledInputClasses } from '@mui/material/FilledInput';
import MenuItem from '@mui/material/MenuItem';
import { InputAdornment, inputBaseClasses, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import generateCummulativeProbabitiy from '../../utils/mmcLogic'
import { useNavigate } from 'react-router-dom';
import QueueForm from '../../components/QueueForm';


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
    backgroundColor: "#c2b38c"
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const selectPriority = [
  {
    value: 1,
    label: 'Yes',
  },
  {
    value: 0,
    label: 'No',
  },
];

const MMC = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        setIsLoading(true);
        try {
            const result = generateCummulativeProbabitiy(formData.ArrivalTime, formData.ServiceTime, formData.Servers, formData.Priority);
            setData(result);
        } catch (error) {
            console.error('Calculation error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const goToChartPage = () => {
      navigate('/Graphs', {state: data})
    }

    const handleClear = () => {
        setData(null);
    }

    const formFields = [
        {
            name: 'ArrivalTime',
            label: 'Arrival Time',
            type: 'number',
            required: true,
            helperText: 'Average arrival time',
            unit: 'time units'
        },
        {
            name: 'ServiceTime',
            label: 'Service Time',
            type: 'number',
            required: true,
            helperText: 'Average service time',
            unit: 'time units'
        },
        {
            name: 'Servers',
            label: 'Number of Servers',
            type: 'number',
            required: true,
            helperText: 'Total number of servers',
            unit: 'servers'
        },
        {
            name: 'Priority',
            label: 'Priority',
            type: 'select',
            options: [
                {
                    value: 1,
                    label: 'Yes',
                },
                {
                    value: 0,
                    label: 'No',
                },
            ],
            required: false,
            helperText: 'Enable priority scheduling'
        }
    ];
  return (
    <div className='w-full min-h-screen pb-20'>
        <div className="w-full max-w-6xl mx-auto p-4">
            <QueueForm
                fields={formFields}
                onSubmit={handleSubmit}
                submitButtonText="Calculate"
                isLoading={isLoading}
                onClear={handleClear}
            />
        </div>
        <Box sx={{ marginX: { xs: "15px" }, marginY: { xs: "5px" } }}>
        {
          data?.table ? (
            <>
              {/* Performance Insights */}
              <div className="bg-gray-200 p-4 rounded-lg mb-4 max-w-6xl mx-auto">
                <h3 className="font-semibold text-pink-900 mb-2">Performance Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-pink-900">Avg Wait Time: </span>
                    <span className="font-medium">{data?.avgValues?.avgWT || 0}</span>
                  </div>
                  <div>
                    <span className="text-pink-900">Avg TAT: </span>
                    <span className="font-medium">{data?.avgValues?.avgTAT || 0}</span>
                  </div>
                  <div>
                    <span className="text-pink-900">System Utilization: </span>
                    <span className={`font-medium ${
                      (Array.isArray(data.serverUtilization) ? data.serverUtilization[0] : data.serverUtilization) > 80 ? 'text-pink-900' :
                      (Array.isArray(data.serverUtilization) ? data.serverUtilization[0] : data.serverUtilization) > 60 ? 'text-pink-900' : 'text-gray-900'
                    }`}>
                      {Array.isArray(data.serverUtilization) ? data.serverUtilization[0]?.toFixed(2) + '%' : data.serverUtilization?.toFixed(2) + '%'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Server Utilization Indicator */}
              <div className="max-w-6xl mx-auto mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Server Utilization: {Array.isArray(data.serverUtilization) ? data.serverUtilization[0]?.toFixed(2) : data.serverUtilization?.toFixed(2)}%</span>
                  <span className={`text-sm ${
                    (Array.isArray(data.serverUtilization) ? data.serverUtilization[0] : data.serverUtilization) > 80 ? 'text-pink-900' :
                    (Array.isArray(data.serverUtilization) ? data.serverUtilization[0] : data.serverUtilization) > 60 ? 'text-pink-900' : 'text-gray-900'
                  }`}>
                    {(Array.isArray(data.serverUtilization) ? data.serverUtilization[0] : data.serverUtilization) > 80 ? 'High' : (Array.isArray(data.serverUtilization) ? data.serverUtilization[0] : data.serverUtilization) > 60 ? 'Medium' : 'Low'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      (Array.isArray(data.serverUtilization) ? data.serverUtilization[0] : data.serverUtilization) > 80 ? 'bg-pink-900' :
                      (Array.isArray(data.serverUtilization) ? data.serverUtilization[0] : data.serverUtilization) > 60 ? 'bg-pink-900' : 'bg-gray-900'
                    }`}
                    style={{ width: `${Math.min(Array.isArray(data.serverUtilization) ? data.serverUtilization[0] : data.serverUtilization, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Results Table - Desktop */}
              <div className="hidden md:block">
                <TableContainer component={Paper} sx={{ maxWidth: '1200px', margin: 'auto' }}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">Patient ID</StyledTableCell>
                        <StyledTableCell align="center">Arrival Time</StyledTableCell>
                        <StyledTableCell align="center">Service Time</StyledTableCell>
                        {data?.table?.some((item) => item.priority !== undefined) && (
                          <StyledTableCell align="center">Priority</StyledTableCell>
                        )}
                        <StyledTableCell align="center">Start Time</StyledTableCell>
                        <StyledTableCell align="center">End Time</StyledTableCell>
                        <StyledTableCell align="center">Turnaround Time</StyledTableCell>
                        <StyledTableCell align="center">Wait Time</StyledTableCell>
                        <StyledTableCell align="center">Response Time</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.table.map((item, idx) => (
                        <StyledTableRow key={idx}>
                          <StyledTableCell align="center">{idx + 1}</StyledTableCell>
                          <StyledTableCell align="center">{item.arrivalTime}</StyledTableCell>
                          <StyledTableCell align="center">{item.serviceTime}</StyledTableCell>
                          {item.priority !== undefined && (
                            <StyledTableCell align="center">{item.priority}</StyledTableCell>
                          )}
                          <StyledTableCell align="center">{item.startTime}</StyledTableCell>
                          <StyledTableCell align="center">{item.endingTime}</StyledTableCell>
                          <StyledTableCell align="center">{item.turnAroundTime}</StyledTableCell>
                          <StyledTableCell align="center">{item.waitingTime}</StyledTableCell>
                          <StyledTableCell align="center">{item.responseTime}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              {/* Results Table - Mobile Card Layout */}
              <div className="md:hidden space-y-3 max-w-6xl mx-auto">
                {data?.table?.map((item, idx) => (
                  <div key={idx} className="border rounded-lg p-3 bg-white">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="font-medium">Patient ID:</span><span>{idx + 1}</span>
                      <span className="font-medium">Arrival:</span><span>{item.arrivalTime}</span>
                      <span className="font-medium">Service:</span><span>{item.serviceTime}</span>
                      {item.priority !== undefined && (
                        <>
                          <span className="font-medium">Priority:</span><span>{item.priority}</span>
                        </>
                      )}
                      <span className="font-medium">Start:</span><span>{item.startTime}</span>
                      <span className="font-medium">End:</span><span>{item.endingTime}</span>
                      <span className="font-medium">TAT:</span><span>{item.turnAroundTime}</span>
                      <span className="font-medium">Wait:</span><span>{item.waitingTime}</span>
                      <span className="font-medium">Response:</span><span>{item.responseTime}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h4 style={{
                  margin: '1em auto',
                  textAlign: 'center',
                  fontSize: '22px',
                  fontWeight: 'bold'
                }}>
                  Gantt Chart
                </h4>
                <div className='flex flex-wrap my-[2vw] mx-[1vw] justify-center'>
                  <div className="flex items-center justify-center flex-wrap">
                  {
                    data?.ganttCharts?.length !== 0 ? (
                      data?.ganttCharts[0]?.map((item, index) => {
                        const nextItem = data.ganttCharts[0][index + 1];
                        const idleTime =
                          nextItem && nextItem.start_Time > item.end_Time
                            ? nextItem.start_Time - item.end_Time
                            : 0;

                        return (
                          <React.Fragment key={index}>
                            {/* Gantt Chart Task */}
                            <div className="md:w-20 w-[23vw] h-16 rounded-sm text-center relative border border-1 py-3 px-2 my-2  border-pink-900 bg-gray-200">
                              <p className="text-center font-semibold">P{item?.customer_Id+1}</p>
                              <p className="absolute bottom-1 left-1">{item?.start_Time}</p>
                              <p className="absolute bottom-1 right-1">{item?.end_Time}</p>
                            </div>

                            {/* Idle Time (if any) */}
                            {idleTime > 0 && (
                              <div className="md:w-20 w-[23vw] h-16 rounded-sm text-center  flex items-center justify-center relative border border-dashed py-3 px-2 bg-pink-900 text-white">
                                <p className="text-sm">Idle</p>
                              </div>
                              )}
                          </React.Fragment>
                        );
                      })) : (
                        <div className="text-center text-gray-500 py-8">No gantt chart data available</div>
                      )
                    }
                  </div>
                </div>
              </div>

              <div className='m-2'>
                <h1 style={{
                  margin: '0.2em auto',
                  paddingBottom:'15px',
                  textAlign: 'center',
                  fontSize: '22px',
                  fontWeight: 'bold'
                }}>Performance Measures</h1>
                {
                  data?.avgValues ? (
                    <TableContainer component={Paper} sx={{ maxWidth: '1200px', margin: 'auto' }}>
                      <div className='md:overflow-hidden overflow-scroll'>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center">Avg TurnAround Time(TAT)</StyledTableCell>
                              <StyledTableCell align="center">Avg Waiting Time(WT)</StyledTableCell>
                              <StyledTableCell align="center">Avg Response Time(RST)</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <StyledTableRow>
                              <StyledTableCell align="center">{data?.avgValues?.avgTAT}</StyledTableCell>
                              <StyledTableCell align="center">{data?.avgValues?.avgWT}</StyledTableCell>
                              <StyledTableCell align="center">{data?.avgValues?.avgRT}</StyledTableCell>
                            </StyledTableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </TableContainer>
                  ) : null
                }
              </div>

              <div className='flex justify-center p-2'>
                <button
                  className='px-5 py-4 rounded-md bg-pink-900 text-white hover:bg-gray-900 transition-colors'
                  onClick={goToChartPage}
                >
                  Chart Analysis
                </button>
              </div>
            </>
          ) : null
        }
      </Box>
    </div>
  )
}

export default MMC