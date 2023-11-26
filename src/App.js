import React, { useState } from 'react'
import Header from './Components/Header'
import NewTask from './Components/NewTask'
import TaskList from './Components/TaskList'

const App = () => {

  const [update, setUpdate] = useState(true)
  return (
    <>
    <Header/>
    <NewTask />
    {/* <TaskList/> */}
    </>
  )
}

export default App