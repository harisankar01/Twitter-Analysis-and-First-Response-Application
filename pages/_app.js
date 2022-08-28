import { ThemeContextProvider } from '../components/GreatArea/Side/theme'
import '../styles/globals.css'
ThemeContextProvider
function MyApp({ Component, pageProps }) {
  return(
    <ThemeContextProvider>
    <Component {...pageProps} />
    </ThemeContextProvider>
  )
}

export default MyApp
