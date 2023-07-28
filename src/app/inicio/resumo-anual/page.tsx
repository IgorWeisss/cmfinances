import { AnnualSummary } from '@/components/AnnualSummary'
import { Header } from '@/components/Header'

const years = ['2018', '2019', '2020', '2021', '2022', '2023']

export default function ResumoAnual() {
  return (
    <>
      <Header navButtonsType="year" navButtonsItems={years} />
      <main className="flex flex-col p-12 gap-12">
        <div className="flex flex-col w-full max-w-[100rem] mx-auto gap-12">
          <div className="flex h-container w-full gap-12 ">
            <AnnualSummary></AnnualSummary>
          </div>
        </div>
      </main>
    </>
  )
}
