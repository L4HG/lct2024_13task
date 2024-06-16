import React, { useState } from 'react'
import { Row } from 'antd';
import { AppHeader } from './components/AppHeader'
import { PictureGen } from './components/PictureGen'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Row gutter={[12, 12]}>

      <AppHeader />
      <PictureGen />


    </Row>
  )
}

export default App
