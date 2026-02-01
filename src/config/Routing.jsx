import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from '../page/Home'
import Simulation from '../page/Simulation/Simulation'
import ProtectedRouting from './ProtectedRouting'
import MM1 from '../page/Simulation/MM1'
import MMC from '../page/Simulation/MMC'
import Queueing from '../page/Queueing/Queueing'
import QueueMGC from '../page/Queueing/QueueMGC'
import QueueGGC from '../page/Queueing/QueueGGC'
import QueueMMC from '../page/Queueing/QueueMMC'
import MGC from '../page/Simulation/MGC'
import Graphs from '../page/Simulation/Graphs'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<ProtectedRouting/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/Simulation' element={<Simulation/>}>
          <Route path='MM1' element={<MM1/>}/>
          <Route path='MMC' element={<MMC/>}/>
          <Route path='MGC' element={<MGC/>}/>

        </Route>
        <Route path='/Queueing' element={<Queueing/>}>
          <Route path='mmcModel' element={<QueueMMC/>}/>
          <Route path='mgcModel' element={<QueueMGC/>}/>
          <Route path='ggcModel' element={<QueueGGC/>}/>
        </Route>
          <Route path='Graphs' element={<Graphs/>}/>
      </Route>
    </Route>
  )
)

const Routing = () => {
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  )
}

export default Routing