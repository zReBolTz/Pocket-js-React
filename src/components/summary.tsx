import { CheckCircle2, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { OutlineButton } from './ui/outline-button'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from '../http/get-summary'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-Br'
import { PendingGoals } from './pending-goals'

dayjs.locale(ptBr)

export function Summary() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  })

  const firtsDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastsDayOfWeek = dayjs().endOf('week').format('D MMM')

  if (!data) {
    return null
  }

  const completedPertentage = Math.round((data.completed * 100) / data.total)

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firtsDayOfWeek} - {lastsDayOfWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button>
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={data.completed} max={data.total}>
          <ProgressIndicator style={{ width: `${completedPertentage}` }} />
        </Progress>
        <div className="flex justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{data.completed} </span>de{' '}
            <span className="text-zinc-100"> {data.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPertentage}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua Semana</h2>

        {Object.entries(data.goalPerDay).map(([date, values]) => {
          const weekDay = dayjs(date).format('dddd')
          const formatDate = dayjs(date).format('D [de] MMMM')
          return (
            <div key={date} className="flex flex-col gap-4">
              <h3 className="font-medium capitalize">
                {weekDay}{' '}
                <span className="text-zinc-400 text-xs"> ({formatDate})</span>
              </h3>
              <ul className="flex flex-col gap-3">
                {values.map(values => {
                  const formatTime = dayjs(values.completedAt).format('HH:mm')
                  return (
                    <li key={values.id} className="flex items-center gap-2">
                      <CheckCircle2 className="text-pink-500  size-4" />
                      <span className="text-sm text-zinc-400">
                        {' '}
                        Você completou “
                        <span className="text-zinc-100">{values.title}</span>”
                        às <span className="text-zinc-100">
                          {' '}
                          {formatTime}{' '}
                        </span>{' '}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
