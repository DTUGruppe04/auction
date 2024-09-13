import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Helloworld from "./container/helloworld/Helloworld.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Helloworld />
  </StrictMode>,
)
