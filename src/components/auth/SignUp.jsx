import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import * as S from './authStyles'

export default function SignUp({ onGoLogin }) {
  const { signUp } = useAuth()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState('')
  const [loading, setLoading]   = useState(false)

  const handle = async () => {
    setError(''); setSuccess('')
    if (password !== confirm) return setError('Passwords do not match.')
    if (password.length < 6)  return setError('Password must be at least 6 characters.')
    setLoading(true)
    const { error: err } = await signUp(email, password)
    if (err) setError(err.message)
    else setSuccess('Account created! Check your email to confirm.')
    setLoading(false)
  }

  return (
    <div style={S.overlay}>
      <div style={S.glowStyle(-200, -100, 'rgba(201,168,76,.06)')} />
      <div style={S.card}>
        <div style={S.logo}>
          <h1 style={S.logoTitle}>RAPPORT AI</h1>
          <p style={S.logoSub}>Create Account</p>
        </div>
        {error   && <div style={S.errorBox}>❌ {error}</div>}
        {success && <div style={S.successBox}>✅ {success}</div>}
        <div style={{ marginBottom: 16 }}>
          <label style={S.label}>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com" type="email" style={S.input(false)}
            onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,.4)'}
            onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,.08)'}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={S.label}>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Min. 6 characters" type="password" style={S.input(false)}
            onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,.4)'}
            onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,.08)'}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={S.label}>Confirm Password</label>
          <input value={confirm} onChange={e => setConfirm(e.target.value)}
            placeholder="Repeat password" type="password" style={S.input(false)}
            onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,.4)'}
            onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,.08)'}
          />
        </div>
        <button onClick={handle} disabled={!email||!password||!confirm||loading}
          style={S.goldBtn(!email||!password||!confirm||loading)}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <span style={{ color: '#3A4A5A', fontSize: 13 }}>Already have an account? </span>
          <button onClick={onGoLogin} style={S.ghostLink}>Sign In</button>
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap'); input::placeholder{color:#2A3A4A}`}</style>
    </div>
  )
}