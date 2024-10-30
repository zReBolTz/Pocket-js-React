import { Plus } from 'lucide-react'
import { Button } from './components/ui/button'
import { Dialog, DialogTrigger } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { EmptyGoals } from './components/empty-goals'
import { Summary } from './components/summary'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http/get-summary'

export function App() {
  // const [summary, setSummary] = useState<summaryResponde | null>(null)

  // const { } = useQuery<summaryResponse>(){
  //   queryKey: ['summary'],
  //   queryFn: async ()=> {
  //     const response = fetch('http://localhost:3333/summary')
  //     await data= response.json()

  //     return data.summary
  //   },
  // }

  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
  })

  return (
    <Dialog>
      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}
