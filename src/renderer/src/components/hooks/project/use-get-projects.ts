import Cookies from 'js-cookie'

import { useQuery } from '@tanstack/react-query'

interface UseGetProjectProps {
  page: number
}

interface ProjectData {
  rows: unknown[]
  meta: {
    total_records: number
    current_page: number
    total_pages: number
  }
}

export const useGetProjects = ({ page }: UseGetProjectProps) => {
  const query = useQuery<ProjectData>({
    queryKey: ['projects', page],
    queryFn: async () => {
      const token = Cookies.get('auth-token')
      const res = await fetch(
        `${import.meta.env.VITE_URL}/project?page=${page}&limit=3&status=active`,
        {
          method: 'GET',
          headers: {
            Authorization: `${token}`
          }
        }
      )
      if (!res.ok) {
        throw new Error('Failed to fetch projects')
      }
      const { data } = await res.json()
      return data
    },
    gcTime: 72 * 60 * 60 * 1000
  })
  return query
}
