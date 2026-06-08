// src/components/auth/authStyles.js
// ── Shared styles for all auth pages ─────────────────────────

export const overlay = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg,#080B14 0%,#0E1525 60%,#080B14 100%)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: 20, fontFamily: "'DM Sans','Segoe UI',sans-serif",
  position: 'relative', overflow: 'hidden',
}

export const glowStyle = (top, left, color) => ({
  position: 'fixed', width: 500, height: 500, borderRadius: '50%',
  background: `radial-gradient(ellipse,${color} 0%,transparent 70%)`,
  top, left, pointerEvents: 'none', zIndex: 0,
})

export const card = {
  background: '#0E1525',
  border: '1px solid rgba(201,168,76,.25)',
  borderRadius: 20, padding: '44px 40px',
  maxWidth: 440, width: '100%',
  boxShadow: '0 0 80px rgba(201,168,76,.07)',
  position: 'relative', zIndex: 1,
}

export const logo = {
  textAlign: 'center', marginBottom: 32,
}

export const logoTitle = {
  fontFamily: 'Georgia,serif', fontSize: 28, fontWeight: 400,
  background: 'linear-gradient(135deg,#E8DCC8,#C9A84C,#E8DCC8)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  letterSpacing: 3, margin: 0,
}

export const logoSub = {
  fontSize: 11, color: '#3A4A5A', letterSpacing: 3,
  textTransform: 'uppercase', marginTop: 4,
}

export const heading = {
  fontSize: 20, fontWeight: 600, color: '#C8D0DC',
  margin: '0 0 6px', textAlign: 'center',
}

export const subheading = {
  fontSize: 13, color: '#3A4A5A', textAlign: 'center',
  margin: '0 0 28px',
}

export const label = {
  display: 'block', fontSize: 11, color: '#4A6070',
  letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8,
}

export const input = (hasError) => ({
  width: '100%', padding: '12px 16px', boxSizing: 'border-box',
  background: 'rgba(255,255,255,.03)',
  border: `1px solid ${hasError ? '#E05555' : 'rgba(255,255,255,.08)'}`,
  borderRadius: 10, color: '#E8DCC8', fontSize: 14,
  outline: 'none', fontFamily: 'inherit',
  transition: 'border-color .2s',
})

export const goldBtn = (disabled) => ({
  width: '100%', padding: '13px',
  background: disabled
    ? 'rgba(201,168,76,.08)'
    : 'linear-gradient(135deg,#C9A84C,#A07830)',
  border: 'none', borderRadius: 10,
  color: disabled ? '#2A3A2A' : '#0A1020',
  fontSize: 14, fontWeight: 700,
  cursor: disabled ? 'not-allowed' : 'pointer',
  letterSpacing: .5, marginTop: 8,
  boxShadow: disabled ? 'none' : '0 4px 20px rgba(201,168,76,.2)',
  transition: 'all .3s',
})

export const ghostLink = {
  background: 'none', border: 'none',
  color: '#C9A84C', fontSize: 13, cursor: 'pointer',
  textDecoration: 'none', letterSpacing: .3,
}

export const divider = {
  textAlign: 'center', color: '#2A3A4A',
  fontSize: 12, margin: '20px 0', position: 'relative',
}

export const errorBox = {
  background: 'rgba(224,85,85,.08)',
  border: '1px solid rgba(224,85,85,.2)',
  borderRadius: 8, padding: '10px 14px',
  color: '#E08080', fontSize: 13, marginBottom: 16,
}

export const successBox = {
  background: 'rgba(76,180,120,.08)',
  border: '1px solid rgba(76,180,120,.2)',
  borderRadius: 8, padding: '10px 14px',
  color: '#4CB478', fontSize: 13, marginBottom: 16,
}