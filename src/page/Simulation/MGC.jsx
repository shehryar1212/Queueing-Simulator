import React, { useState } from 'react'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
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

const MGC = () => {
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
            options: selectPriority,
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
        <Box className="mx-3">
        {
          data?.table ?
            <>
              <TableContainer component={Paper} sx={{
                maxWidth: '1200px', margin: 'auto'
              }}>
                <div className='md:overflow-hidden overflow-x-scroll'>

                  <Table sx={{ minWidth: 700  }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                      <StyledTableCell text-gray align="center">Patient ID</StyledTableCell>
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
                      {data?.table.map((item,idx) => (
                        <StyledTableRow key={idx}>
                          <StyledTableCell align="center">{idx+1}</StyledTableCell>
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
                </div>
                </TableContainer>
                <div className="flex flex-wrap my-[2vw] mx-[1vw] justify-center">
                  <div className="flex flex-wrap items-center justify-center w-full">
                    {data?.ganttCharts?.length !== 0 ? (
                      data.ganttCharts.map((chart, chartIndex) => (
                        <div
                          key={chartIndex}
                          className="gantt-chart-section my-2 flex flex-col w-full "
                        >
                          <h3 className="text-lg md:text-left text-center font-bold">Chart {chartIndex + 1}</h3>
                          <div className="flex flex-wrap md:justify-start justify-center">
                            {chart.map((item, index) => {
                              const nextItem = chart[index + 1];
                              const idleTime =
                                nextItem && nextItem.start_Time > item.end_Time
                                  ? nextItem.start_Time - item.end_Time
                                  : 0;

                              return (
                                <React.Fragment key={index}>
                                  {/* Gantt Chart Task */}
                                  <div className="md:w-20 w-[23vw] h-16 rounded-sm text-center relative border border-1 py-3 px-2 my-2 text-gray-900 border-pink-900 bg-white">
                                    <p className="text-center font-semibold">P{item?.customer_Id + 1}</p>
                                    <p className="absolute bottom-1 left-1">{item?.start_Time}</p>
                                    <p className="absolute bottom-1 right-1">{item?.end_Time}</p>
                                  </div>

                                  {/* Idle Time (if any) */}
                                  {idleTime > 0 && (
                                    <div className="md:w-20 w-[23vw] h-16 rounded-sm text-center flex items-center justify-center relative border border-dashed py-3 px-2 my-2 bg-[#831843]">
                                      <p className="text-white text-sm">Idle</p>
                                    </div>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No Gantt chart data available.</p>
                    )}
                  </div>
                </div>    
                <h4 style={{
                  margin: '2em auto',
                  paddingBottom:'10px',
                  textAlign: 'center',
                  fontSize: '22px',
                  fontWeight: 'bold'
                }}>
                  {
                    data?.serverUtilization?.map((utilization,index)=>(
                      <div key={index}> 
                        <p>Server{index+1} Utilization: {utilization.toFixed(2)}%</p>
                      </div>
                    ))
                  }
                    
                </h4>
                <div className='m-2'>
                  <h1 style={{
                  margin: '0.2em auto',
                  paddingBottom:'15px',
                  textAlign: 'center',
                  fontSize: '22px',
                  fontWeight: 'bold'
                }}>Performance Measures</h1>
                 {
                  data?.avgValues ?
                 
                  <TableContainer component={Paper} sx={{
                    maxWidth: '1200px', margin: 'auto'
                    }}>
                    <div className='md:overflow-hidden  overflow-scroll'>

                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">Avg TurnAround Time(TAT)</StyledTableCell>
                            <StyledTableCell align="center">Avg Waiting Time(WT)</StyledTableCell>
                            <StyledTableCell align="center">Avg Response Time(RST)</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <StyledTableRow >
                            <StyledTableCell align="center">{data?.avgValues?.avgTAT}</StyledTableCell>
                            <StyledTableCell align="center">{data?.avgValues?.avgWT}</StyledTableCell>
                            <StyledTableCell align="center">{data?.avgValues?.avgRT}</StyledTableCell>
                          </StyledTableRow>
                        </TableBody>
                      </Table>
                    </div>
                    </TableContainer>
                    :
                    null
                    }
                </div>
                <div className='flex justify-center p-2'>
                  <button className='px-5 py-4 rounded-md bg-pink-900 text-white hover:bg-gray-900 transition-colors' onClick={()=>{goToChartPage()}}>Chart Analysis</button>
                </div>
            </>

            : null
        }
      </Box>
    </div>
  )
}

export default MGC