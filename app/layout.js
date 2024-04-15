import NavBar from './components/Navbar'
import {montserrat} from './estilos/fonts'
 import './globals.css'
 
 export const metadata = { 
  title: 'Control de stock',
 }

export default function RootLayout({children}){
  return (
   <html lang="en">
      <body className={`${montserrat.className}`}>
        <div>
          <NavBar/>
          {children}
        </div>
      </body> 
   </html> 
  )
}

