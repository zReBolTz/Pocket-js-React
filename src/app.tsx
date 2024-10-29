import { Plus } from 'lucide-react'
import { Button } from './components/ui/button'
import { Dialog, DialogTrigger } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { EmptyGoals } from './components/empty-goals'

export function App() {
  return (
    <Dialog>
      <EmptyGoals />
      <CreateGoal />
    </Dialog>
  )
}
