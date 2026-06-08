import { useState } from 'react'
import Login from './Login'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'

export default function AuthGate({ children }) {
  const [page, setPage] = useState('login') // login | signup | forgot

  // اختاري الصفحة حسب الحالة
  if (page === 'signup')  return <SignUp onGoLogin={() => setPage('login')} />
  if (page === 'forgot')  return <ForgotPassword onGoLogin={() => setPage('login')} />

  return <Login
    onGoSignUp={() => setPage('signup')}
    onGoForgot={() => setPage('forgot')}
  />
}