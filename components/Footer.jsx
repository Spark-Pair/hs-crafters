// components/Footer.jsx
export function Footer() {
    return (
      <footer className="pt-20 pb-32 px-10 border-t border-[var(--secondary-bg)] mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <h2 style={{ fontFamily: 'var(--font-amarante)' }} className="text-4xl text-[var(--black)] mb-4">HS Crafters</h2>
            <p style={{ fontFamily: 'var(--font-abel)' }} className="text-[var(--dark-grey)] max-w-xs">
              Crafting a slower, more intentional way of living through handmade art.
            </p>
          </div>
          
          <div>
            <h5 style={{ fontFamily: 'var(--font-roboto)' }} className="text-xs uppercase tracking-[0.2em] mb-6 font-bold">Follow</h5>
            <ul style={{ fontFamily: 'var(--font-abel)' }} className="space-y-3 text-[var(--dark-grey)]">
              <li className="hover:text-[var(--black)] cursor-pointer">Instagram</li>
              <li className="hover:text-[var(--black)] cursor-pointer">Pinterest</li>
              <li className="hover:text-[var(--black)] cursor-pointer">Journal</li>
            </ul>
          </div>
  
          <div>
            <h5 style={{ fontFamily: 'var(--font-roboto)' }} className="text-xs uppercase tracking-[0.2em] mb-6 font-bold">Inquiries</h5>
            <p style={{ fontFamily: 'var(--font-abel)' }} className="text-[var(--dark-grey)]">hello@hscrafters.art</p>
            <p style={{ fontFamily: 'var(--font-abel)' }} className="text-[var(--dark-grey)] mt-2">Karachi, Pakistan</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[var(--light-secondary-bg)] flex justify-between items-center text-[10px] uppercase tracking-[0.3em] text-[var(--dark-grey)]">
          <p>© 2026 HS Crafters</p>
          <p>Built with Care</p>
        </div>
      </footer>
    )
  }