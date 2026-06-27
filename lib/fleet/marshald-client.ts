/**
 * marshald-client.ts — client for registering loudmumble-site with the Marshald agent marketplace.
 *
 * Lightweight JS port of the Go marshald client pattern. Uses fetch + localStorage
 * for keypair persistence. Fire-and-forget: errors are logged but never fatal.
 */

interface MarshaldAgent {
  name: string
  description: string
  capabilities: Array<{ name: string; description: string }>
  skills: string[]
  endpoint: string
  protocols: string[]
  owner: string
  input_modes: string[]
  output_modes: string[]
  public_key: string
  signature: string
}

interface KeyPair {
  public_key: string
  private_key: string
}

const STORAGE_KEY = 'marshald_keypair'

async function generateKeyPair(): Promise<KeyPair> {
  const crypto = globalThis.crypto
  if (!crypto) {
    throw new Error('Web Crypto API not available')
  }

  const keypair = await crypto.subtle.generateKey(
    { name: 'Ed25519' },
    false,
    ['sign', 'verify']
  )

  const pubRaw = await crypto.subtle.exportKey('raw', keypair.publicKey)
  const privRaw = await crypto.subtle.exportKey('raw', keypair.privateKey)

  return {
    public_key: Array.from(new Uint8Array(pubRaw)).map(b => b.toString(16).padStart(2, '0')).join(''),
    private_key: Array.from(new Uint8Array(privRaw)).map(b => b.toString(16).padStart(2, '0')).join(''),
  }
}

async function signMessage(privateKeyHex: string, message: string): Promise<string> {
  const crypto = globalThis.crypto
  if (!crypto) throw new Error('Web Crypto API not available')

  const privBytes = Uint8Array.from(privateKeyHex.match(/.{2}/g)!.map(b => parseInt(b, 16)))
  
  // Import the private key
  const privateKey = await crypto.subtle.importKey(
    'raw',
    privBytes,
    { name: 'Ed25519' },
    false,
    ['sign']
  )

  const encoder = new TextEncoder()
  const signature = await crypto.subtle.sign('Ed25519', privateKey, encoder.encode(message))

  return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function loadKeyPair(): KeyPair | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const kp = JSON.parse(stored) as KeyPair
      if (kp.public_key && kp.private_key) return kp
    }
  } catch {
    // ignore
  }
  return null
}

function saveKeyPair(kp: KeyPair): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(kp))
  } catch {
    // ignore storage errors
  }
}

export class MarshaldClient {
  constructor(
    private marshaldUrl: string,
    private listenAddr = ''
  ) {}

  async register(): Promise<void> {
    if (!this.marshaldUrl) return

    try {
      if (await this.isRegistered()) {
        console.log('loudmumble-site already registered in marshald')
        return
      }

      let kp = loadKeyPair()
      if (!kp) {
        kp = await generateKeyPair()
        saveKeyPair(kp)
      }

      const endpoint = process.env.LOUDMUMBLE_PUBLIC_URL || `http://localhost${this.listenAddr}`
      const name = 'loudmumble-site'
      const owner = 'system'
      const msg = `${name}|${endpoint}|${owner}`

      const signature = await signMessage(kp.private_key, msg)

      const agent: MarshaldAgent = {
        name,
        description: 'Loudmumble security services website and documentation portal',
        capabilities: [
          { name: 'documentation', description: 'Project documentation and fleet status' },
          { name: 'portfolio', description: 'Security services portfolio and case studies' },
          { name: 'fleet-status', description: 'Real-time fleet health dashboard' },
        ],
        skills: ['documentation', 'portfolio', 'status-dashboard'],
        endpoint,
        protocols: ['rest'],
        owner,
        input_modes: ['application/json', 'text/plain'],
        output_modes: ['application/json'],
        public_key: kp.public_key,
        signature,
      }

      const resp = await fetch(`${this.marshaldUrl}/agents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agent),
      })

      if (resp.status === 201) {
        console.log('loudmumble-site registered in marshald')
      } else {
        console.warn(`marshald registration: unexpected status ${resp.status}`)
      }
    } catch (err) {
      console.warn('marshald registration failed:', err)
    }
  }

  async isRegistered(): Promise<boolean> {
    try {
      const resp = await fetch(`${this.marshaldUrl}/agents`)
      if (!resp.ok) return false
      const data = await resp.json()
      const agents = data.agents || []
      return agents.some((a: any) => a.name === 'loudmumble-site')
    } catch {
      return false
    }
  }
}

export function createMarshaldClient(url: string): MarshaldClient | null {
  if (!url) return null
  return new MarshaldClient(url)
}
