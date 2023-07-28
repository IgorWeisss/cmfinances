import { EntryBox } from '@/components/EntryBox'
import { Header } from '@/components/Header'
import { Stats } from '@/components/Stats'

const months = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
]

export default function Inicio() {
  return (
    <>
      <Header navButtonsType="month" navButtonsItems={months} />
      <main className="flex flex-col p-12 gap-12">
        <div className="flex flex-col w-full max-w-[100rem] mx-auto gap-12">
          <div className="flex h-container w-full gap-12 ">
            <EntryBox type="IN"></EntryBox>
            <EntryBox type="OUT"></EntryBox>
            <Stats></Stats>
          </div>
          <div
            className="w-full h-container bg-gradient-to-b from-blue-800
            to-blue-900 rounded-[1.25rem] overflow-hidden shadow-entry-box"
          ></div>
        </div>
      </main>
    </>
  )
}
