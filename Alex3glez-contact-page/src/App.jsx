import { useState } from 'react'
import ContactCard from './assets/components/ContactCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <button></button>
    <ul>
      <ContactCard/>
    </ul>
    </>
  )
}

export default App
