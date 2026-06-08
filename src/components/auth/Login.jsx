// src/components/auth/Login.jsx
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

import * as S from './authStyles'

export default function Login({ onGoSignUp, onGoForgot }) {
  const { signIn } = useAuth()
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  const handle = async () => {
    setError('')
    if (!email || !password) return setError('Please fill in all fields.')
    setLoading(true)
    const { error: err } = await signIn(email, password)
    if (err) setError(err.message)
    setLoading(false)
  }

  return (
    <div style={S.overlay}>
      <div style={S.glowStyle(-200, -100, 'rgba(201,168,76,.06)')} />
      <div style={S.glowStyle('auto', 'auto', 'rgba(80,130,200,.04)')} />

      <div style={S.card}>
        {/* Logo */}
        <div style={S.logo}>
          <div style={{
            fontSize: 10, letterSpacing: 4, color: '#C9A84C',
            marginBottom: 8, textTransform: 'uppercase'
          }}>
            POWERED BY GROQ AI
          </div>
          <h1 style={S.logoTitle}>RAPPORT AI</h1>
          <p style={S.logoSub}>Professional Report Generator</p>
        </div>

        <h2 style={S.heading}>Welcome Back</h2>
        <p style={S.subheading}>Sign in to your account</p>

        {/* Error */}
        {error && <div style={S.errorBox}>❌ {error}</div>}

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label style={S.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handle()}
            placeholder="you@example.com"
            style={S.input(false)}
            onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,.4)'}
            onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,.08)'}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 8 }}>
          <label style={S.label}>Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handle()}
              placeholder="••••••••"
              style={{ ...S.input(false), paddingRight: 44 }}
              onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,.4)'}
              onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,.08)'}
            />
            <button
              onClick={() => setShowPwd(p => !p)}
              style={{
                position: 'absolute', right: 12,
                top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none',
                color: '#5A7080', cursor: 'pointer', fontSize: 16,
              }}
            >
              {showPwd ? '🙈' : '👁'}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div style={{ textAlign: 'right', marginBottom: 20 }}>
          <button onClick={onGoForgot} style={S.ghostLink}>
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <button
          onClick={handle}
          disabled={!email || !password || loading}
          style={S.goldBtn(!email || !password || loading)}
        >
          {loading ? 'Signing in...' : '✦ Sign In'}
        </button>

        {/* Divider */}
        <div style={S.divider}>
          <span style={{
            background: '#0E1525', padding: '0 12px',
            position: 'relative', zIndex: 1,
          }}>
            Don't have an account?
          </span>
          <div style={{
            position: 'absolute', top: '50%', left: 0,
            right: 0, height: 1,
            background: 'rgba(255,255,255,.06)', zIndex: 0,
          }} />
        </div>

        {/* Go to Sign Up */}
        <button
          onClick={onGoSignUp}
          style={{
            width: '100%', padding: '12px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,.08)',
            borderRadius: 10, color: '#5A7080',
            fontSize: 14, cursor: 'pointer',
            fontFamily: 'inherit', letterSpacing: .5,
            transition: 'all .2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(201,168,76,.3)'
            e.currentTarget.style.color = '#C9A84C'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'
            e.currentTarget.style.color = '#5A7080'
          }}
        >
          Create Account
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
        input::placeholder { color: #2A3A4A; }
        input { transition: border-color .2s; }
      `}</style>
    </div>
  )
}
