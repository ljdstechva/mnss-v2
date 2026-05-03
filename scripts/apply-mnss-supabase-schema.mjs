import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const env = loadEnv(path.join(root, '.env.local'))
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY
const accessToken = env.SUPABASE_ACCESS_TOKEN ?? env.SUPABASE_MANAGEMENT_TOKEN
const migrationsDir = path.join(root, 'supabase', 'migrations')

if (!supabaseUrl) {
  fail('NEXT_PUBLIC_SUPABASE_URL is missing from .env.local.')
}

if (!serviceRoleKey) {
  fail('SUPABASE_SERVICE_ROLE_KEY is missing from .env.local.')
}

if (!accessToken) {
  fail(
    [
      'SUPABASE_ACCESS_TOKEN is required to create tables/functions in the live Supabase project.',
      'Create one in Supabase Dashboard > Account > Access Tokens, then run:',
      '$env:SUPABASE_ACCESS_TOKEN="your-token"; npm.cmd run setup:mnss-supabase',
      'The existing service role key can read/write data, but Supabase rejected it for SQL DDL execution.',
    ].join('\n')
  )
}

const projectRef = getProjectRef(supabaseUrl)
const sql = fs
  .readdirSync(migrationsDir)
  .filter((fileName) => fileName.endsWith('.sql') && fileName.includes('mnss'))
  .sort()
  .map((fileName) => fs.readFileSync(path.join(migrationsDir, fileName), 'utf8'))
  .join('\n\n')

assertMnssOnlySchema(sql)

const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: sql }),
})

if (!response.ok) {
  const body = await response.text()
  fail(`Supabase schema setup failed with HTTP ${response.status}.\n${redact(body)}`)
}

await verifyLiveSchema(supabaseUrl, serviceRoleKey)

console.log('MNSS Supabase schema is ready.')
console.log('Created/verified only public objects prefixed with mnss_ plus their RLS policies, indexes, triggers, and seed rows.')

function loadEnv(envPath) {
  const values = { ...process.env }

  if (!fs.existsSync(envPath)) {
    return values
  }

  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([^#][^=]+)=(.*)$/)

    if (!match) {
      continue
    }

    const key = match[1].trim()
    const value = match[2].trim().replace(/^"|"$/g, '')
    values[key] ??= value
  }

  return values
}

function getProjectRef(url) {
  const match = url.match(/^https:\/\/([^.]+)\.supabase\.co/)

  if (!match) {
    fail('Could not derive the Supabase project ref from NEXT_PUBLIC_SUPABASE_URL.')
  }

  return match[1]
}

function assertMnssOnlySchema(sql) {
  const blockedStatements = sql
    .split(';')
    .map((statement) => statement.trim())
    .filter(Boolean)
    .filter((statement) => {
      const compact = statement.replace(/\s+/g, ' ')

      if (/\b(create|alter|drop)\s+table\b/i.test(compact)) {
        return !/\b(create|alter|drop)\s+table\s+(if\s+(not\s+)?exists\s+)?public\.mnss_/i.test(compact)
      }

      if (/\binsert\s+into\b/i.test(compact)) {
        return !/\binsert\s+into\s+public\.mnss_/i.test(compact)
      }

      if (/\b(update|delete\s+from)\b/i.test(compact)) {
        return !/\b(update|delete\s+from)\s+public\.mnss_/i.test(compact)
      }

      if (/\b(create\s+or\s+replace\s+function|drop\s+function)\b/i.test(compact)) {
        return !/\b(create\s+or\s+replace\s+function|drop\s+function)\s+(if\s+exists\s+)?public\.mnss_/i.test(compact)
      }

      return false
    })

  if (blockedStatements.length > 0) {
    fail(
      [
        'Refusing to apply SQL because it contains non-MNSS table/function operations.',
        ...blockedStatements.map((statement) => statement.slice(0, 160)),
      ].join('\n')
    )
  }
}

async function verifyLiveSchema(url, key) {
  const tables = [
    'mnss_admin_users',
    'mnss_hero_sections',
    'mnss_site_information',
    'mnss_projects',
    'mnss_certifications',
  ]

  for (const table of tables) {
    const response = await fetch(`${url}/rest/v1/${table}?select=id&limit=1`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    })

    if (!response.ok) {
      const body = await response.text()
      fail(`Verification failed for ${table}: HTTP ${response.status}\n${redact(body)}`)
    }
  }

  for (const fn of ['mnss_is_admin', 'mnss_has_active_admin']) {
    const response = await fetch(`${url}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: '{}',
    })

    if (!response.ok) {
      const body = await response.text()
      fail(`Verification failed for ${fn}: HTTP ${response.status}\n${redact(body)}`)
    }
  }
}

function redact(value) {
  return value.replace(/[A-Za-z0-9_-]{24,}/g, '[redacted]')
}

function fail(message) {
  console.error(message)
  process.exit(1)
}
