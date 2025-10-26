import { Navigate, Outlet } from 'react-router-dom'
import { getClientSideUser } from '@renderer/lib/auth'

interface PrivateRouteProps {
  children?: React.ReactNode
}

function PrivateRoute({ children }: PrivateRouteProps): React.JSX.Element {
  const userData = getClientSideUser()

  // If token not found, redirect to login
  if (!userData || !userData.session) {
    return <Navigate to="/" replace />
  }

  // Render nested routes if token exists
  return children ? <>{children}</> : <Outlet />
}

export default PrivateRoute
