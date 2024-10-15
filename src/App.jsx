import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DynamicForm from './DynamicForm'


function App() {
  const [count, setCount] = useState(0)



  return (
    <>
      <h1>Dynamiskt form</h1>
      <DynamicForm />
    </>
  )
}

export default App
