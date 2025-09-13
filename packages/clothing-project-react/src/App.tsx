import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import dayjs from 'dayjs'
import { Person } from '@w4ng3/tools'

function App() {
  const formatted = dayjs().format('YYYY年MM月DD日 HH:mm:ss')
  const person = new Person('王東', 'React')

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <div style={{ marginBottom: '8px' }}>{formatted}</div>
        <div>{person.slogan}</div>
      </div>
    </>
  )
}

export default App