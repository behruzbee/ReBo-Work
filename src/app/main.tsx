import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Providers } from './providers'

import '@mantine/core/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers />
  </StrictMode>,
)
