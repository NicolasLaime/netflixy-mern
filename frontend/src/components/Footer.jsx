
const Footer = () => {
  return (
    <footer className='py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800'>
       <div className='flex flex-col items-center justify-between gap4 md:h-24 md:flex-row'>
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
             echo por{" "}
             <a 
             href="https://github.com/NicolasLaime"
             target="_blank"
             className="font-medium underline underline-offset-4"
             >
             Nicolas Laime
             </a>
             . el codigo esta disponible en {' '}
             <a 
             href="https://github.com/NicolasLaime"
             target="_blank"
             rel="noreferrer"
             className="font font-medium underline underline-offset-4"
             >
             github
             </a>
          </p>
       </div>
    </footer>
  )
}

export default Footer