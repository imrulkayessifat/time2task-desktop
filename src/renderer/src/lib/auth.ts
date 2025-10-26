// ...existing code...
export const TOKEN_NAME = 'auth-token'

function setCookie(name: string, value: string, days?: number) {
  const encoded = encodeURIComponent(value)
  const maxAge = days ? `; max-age=${days * 24 * 60 * 60}` : ''
  // Path and SameSite for desktop renderer; add Secure if using HTTPS
  document.cookie = `${name}=${encoded}; path=/${maxAge}; SameSite=Strict`
}

function getCookie(name: string) {
  const escaped = name.replace(/([.*+?^${}()|[\]\\])/g, '\\$1')
  const re = new RegExp('(?:^|; )' + escaped + '=([^;]*)')
  const match = document.cookie.match(re)
  return match ? decodeURIComponent(match[1]) : null
}

function deleteCookie(name: string) {
  // Max-age=0 removes the cookie
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Strict`
}

export function setClientToken(token: string) {
  try {
    // Remove any existing token cookie first
    deleteCookie(TOKEN_NAME)
    // Set the new token cookie (30 days)
    setCookie(TOKEN_NAME, token, 30)
    // Verify the token was set
    const savedToken = getCookie(TOKEN_NAME)
    console.log('Verification - Saved token (cookie):', savedToken)
    // Trigger a storage-like event for listeners
    window.dispatchEvent(new Event('storage'))
    return true
  } catch (error) {
    console.error('Error setting token in cookie:', error)
    return false
  }
}

export function getClientSideUser() {
  try {
    const token = getCookie(TOKEN_NAME)
    console.log('Retrieved token (cookie):', token)
    if (!token) return null
    const payload = token.split('.')[1]
    const session = JSON.parse(atob(payload))
    return { session, token }
  } catch (error) {
    console.error('Error getting user data from cookie:', error)
    return null
  }
}

export function removeClientToken() {
  try {
    deleteCookie(TOKEN_NAME)
    window.dispatchEvent(new Event('storage'))
  } catch (error) {
    console.error('Error removing token cookie:', error)
  }
}
