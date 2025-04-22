import { BrowserRouter} from 'react-router-dom'
import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux'
import { store } from './store/store'
import { theme } from './utils/style/themeObject'
import AppRoutes from './components/app.routes';


function App() {

  return (

      <Provider store={store}>
        <BrowserRouter >
          <ThemeProvider theme={theme}>
            <AppRoutes></AppRoutes>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>

  )
}

export default App
