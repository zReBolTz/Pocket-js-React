import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { getPendingGoals } from '../http/pending-goals'
import { createGoalCompletion } from '../http/create-goal-completions'

export function PendingGoals() {
  const queryclient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['pendingGoals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60,
  })
  if (!data) {
    return null
  }

  async function handleComplateGoal(goalId: string) {
    await createGoalCompletion(goalId)
    queryclient.invalidateQueries({ queryKey: ['summary'] })
    queryclient.invalidateQueries({ queryKey: ['pendingGoals'] })
  }
  return (
    <div className="flex flex-wrap gap-3">
      {data?.map(goals => {
        return (
          <OutlineButton
            key={goals.id}
            disabled={goals.completionCount >= goals.desiredWeeklyFrequency}
            onClick={() => handleComplateGoal(goals.id)}
          >
            <Plus />
            {goals.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
