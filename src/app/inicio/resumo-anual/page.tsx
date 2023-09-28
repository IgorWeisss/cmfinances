import { AnnualSummary } from '@/components/AnnualSummary'
import { Header } from '@/components/Header/index'

export default function ResumoAnual() {
  return (
    <>
      <Header />
      <main className="mt-[5.5rem] flex flex-col p-12 gap-12">
        <div className="flex flex-col w-full max-w-[100rem] mx-auto gap-12">
          <div className="flex h-container w-full gap-12 ">
            <AnnualSummary></AnnualSummary>
          </div>
        </div>
      </main>
    </>
  )
}
