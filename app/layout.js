import {montserrat} from './estilos/fonts'
 import './globals.css'
 
 export const metadata = { 
  title: 'Control de stock',
 }

export default function RootLayout({children}){
  return (
   <html lang="en">
      <body className={`${montserrat.className}`}>
        <h1>Control de Stock</h1> 
        <div> 
          {children}
        </div>
      </body> 
   </html> 
  )
}

