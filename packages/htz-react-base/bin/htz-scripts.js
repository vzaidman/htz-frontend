#!/usr/bin/env node

/**
 * Script launcher for React development helpers.
 * Inspired by Next.js and `react-scripts` from `create-react-app`.
 * TODO: Make this friendlier (list scripts, help, version, etc.)
 */

const spawn = require('cross-spawn')
const argv = process.argv.slice(2)

const script = argv[0]
const args = argv.slice(1)

if (script) {
  const scriptPath = require.resolve(`../scripts/${script}`)
  const result = spawn.sync('node', [scriptPath].concat(args), {
    stdio: 'inherit'
  })
  if (result.signal) {
    console.error(result.signal)
    process.exit(1)
  }
  process.exit(result.status)
}
