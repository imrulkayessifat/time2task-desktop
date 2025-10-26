import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

interface UseGetTaskProps {
  taskPage: number
  status: string
  projectId: number
}

interface TaskData {
  rows: unknown[]
  meta: {
    total_records: number
    current_page: number
    total_pages: number
  }
}

export const useGetTasks = ({ taskPage, projectId, status }: UseGetTaskProps) => {
  const query = useQuery<TaskData>({
    queryKey: ['tasks', taskPage, projectId, status],
    queryFn: async () => {
      const token = Cookies.get('auth-token')
      const res = await fetch(
        `${import.meta.env.VITE_URL}/task/project/${projectId}?page=${taskPage}&limit=5&status=${status}`,
        {
          method: 'GET',
          headers: {
            Authorization: `${token}`
          }
        }
      )
      if (!res.ok) {
        throw new Error('Failed to fetch tasks')
      }
      const { data } = await res.json()
      return data
    },
    gcTime: 72 * 60 * 60 * 1000
  })
  return query
}
