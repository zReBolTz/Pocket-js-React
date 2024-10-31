type summaryResponse = {
  completed: number
  total: number
  goalPerDay: Record<
    string,
    {
      id: string
      title: string
      completedAt: string
    }[]
  >
}

export async function getSummary(): Promise<summaryResponse> {
  const response = await fetch('http://localhost:3333/summary')
  const data = await response.json()
  return data.summary
}
