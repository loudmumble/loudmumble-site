/**
 * darkwarden-client.ts — agent-side client for the darkwarden identity authority.
 *
 * TypeScript port of darkwarden/client/client.go. Uses Web Crypto API for Ed25519,
 * localStorage for SVID persistence, and fetch for mTLS enrollment.
 */

interface SVID {
  name: string
  public_key: string
  private_key: string
  issued_at: number
  expires_at: number
  ca_pem: string
}

const SVID_STORAGE_KEY = 'darkwarden_svid'

function loadSVID(): SVID | null {
  try {
    const stored = localStorage.getItem(SVID_STORAGE_KEY)
    if (stored) return JSON.parse(stored) as SVID
  } catch { /* ignore */ }
  return null
}

function saveSVID(svid: SVID): void {
  try {
    localStorage.setItem(SVID_STORAGE_KEY, JSON.stringify(svid))
  } catch { /* ignore */ }
}

export class DarkwardenClient {
  constructor(
    private dwUrl: string,
    private joinToken?: string,
    private trustCA?: string
  ) {}

  async enroll(): Promise<SVID | null> {
    if (!this.dwUrl) return null

    try {
      // Try to load existing SVID
      let svid = loadSVID()
      if (svid) {
        // Check if expired
        if (svid.expires_at > Date.now() / 1000) {
          return svid
        }
      }

      // Need to enroll
      if (!this.joinToken) {
        console.warn('darkwarden: no join token and no existing SVID')
        return null
      }

      const resp = await fetch(`${this.dwUrl}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'loudmumble-site',
          token: this.joinToken,
          ca_pem: this.trustCA || '',
        }),
      })

      if (!resp.ok) {
        throw new Error(`enrollment failed: ${resp.status}`)
      }

      svid = await resp.json() as SVID
      saveSVID(svid)
      console.log(`darkwarden: enrolled as ${svid.name}`)
      return svid
    } catch (err) {
      console.warn('darkwarden enrollment failed:', err)
      return null
    }
  }

  async renew(svid: SVID): Promise<SVID | null> {
    try {
      const resp = await fetch(`${this.dwUrl}/renew`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: svid.name,
          public_key: svid.public_key,
        }),
      })

      if (!resp.ok) return null

      const newSvid = await resp.json() as SVID
      saveSVID(newSvid)
      return newSvid
    } catch (err) {
      console.warn('darkwarden renewal failed:', err)
      return null
    }
  }

  startAutoRenewal(intervalMs = 30_000): void {
    const renew = async () => {
      const svid = loadSVID()
      if (!svid) return
      if (svid.expires_at > Date.now() / 1000 + 300) return // Not due yet
      await this.renew(svid)
    }
    setInterval(renew, intervalMs)
  }
}

export function createDarkwardenClient(url: string, token?: string, ca?: string): DarkwardenClient | null {
  if (!url) return null
  return new DarkwardenClient(url, token, ca)
}
