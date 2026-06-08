import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

import * as S from './authStyles'

export default function ForgotPassword({ onGoLogin }) {
  const { resetPassword } = useAuth()
  const [email, setEmail]     = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async () => {
    setError(''); setSuccess('')
    setLoading(true)
    const { error: err } = await resetPassword(email)
    if (err) setError(err.message)
    else setSuccess('Reset link sent! Check your email.')
    setLoading(false)
  }

  return (
    <div style={S.overlay}>
      <div style={S.glowStyle(-200, -100, 'rgba(201,168,76,.06)')} />
      <div style={S.card}>
        <div style={S.logo}>
          <h1 style={S.logoTitle}>RAPPORT AI</h1>
          <p style={S.logoSub}>Reset Password</p>
        </div>
        {error   && <div style={S.errorBox}>❌ {error}</div>}
        {success && <div style={S.successBox}>✅ {success}</div>}
        <div style={{ marginBottom: 20 }}>
          <label style={S.label}>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com" type="email"
            style={S.input(false)}
            onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,.4)'}
            onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,.08)'}
          />
        </div>
        <button onClick={handle} disabled={!email || loading}
          style={S.goldBtn(!email || loading)}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button onClick={onGoLogin} style={S.ghostLink}>← Back to Sign In</button>
        </div>
      </div>
    </div>
  )
}