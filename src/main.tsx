import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import theme from './styles/theme.ts'
import { ThemeProvider } from '@mui/material/styles'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
)
