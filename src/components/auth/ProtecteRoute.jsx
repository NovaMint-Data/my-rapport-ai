import { useAuth } from '../../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return null // AuthGate handles the redirect
  return children
}