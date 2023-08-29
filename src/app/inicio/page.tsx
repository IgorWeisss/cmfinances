import { EntryBox } from '@/components/Entries/EntryBox'
import { Header } from '@/components/Header/index'
import { Stats } from '@/components/Stats/index'

export default function Inicio() {
  return (
    <>
      <Header showMonths />
      <main className="flex flex-col p-12 gap-12">
        <div className="flex flex-col w-full max-w-[100rem] mx-auto gap-12">
          <div className="flex h-container w-full gap-12 ">
            <EntryBox variant="IN" />
            <EntryBox variant="OUT" />
            <Stats></Stats>
          </div>
          <div
            className="w-full h-container bg-gradient-to-b from-blue-800
            to-blue-900 rounded-[1.25rem] overflow-hidden shadow-entry-box"
            // TODO: Develop chart here
          ></div>
        </div>
      </main>
    </>
  )
}
