import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoProvider from './feature/todo/TodoContext'
import TodoApp from './feature/todo/TodoApp'
import Caculator from './feature/caculator/Caculator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <TodoProvider>
      <TodoApp/>
    </TodoProvider>
    // <Caculator/>
  )
}

export default App
