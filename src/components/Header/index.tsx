import { PeriodCarousel } from './PeriodCarousel'

interface HeaderProps {
  showMonths?: boolean
}

export function Header({ showMonths }: HeaderProps) {
  return (
    <header className="w-full bg-gradient-to-b from-blue-800 to-blue-900 px-4 sm:px-12 py-5 flex justify-between gap-2">
      <nav className="flex items-center justify-center">
        <div className="flex flex-col sm:flex-row">
          <PeriodCarousel variant="YEAR" />
          {showMonths && (
            <>
              <div className="sm:w-2 sm:mx-4 bg-gray-600"></div>
              <PeriodCarousel variant="MONTH" />
            </>
          )}
        </div>
      </nav>
      <div className="flex items-center justify-center">
        <span className="text-orange-500 font-bold text-[1.5rem] sm:text-[2rem]">
          CM
        </span>
        <span className="text-gray-100 font-bold text-[1.5rem] sm:text-[2rem]">
          Finances
        </span>
      </div>
    </header>
  )
}
