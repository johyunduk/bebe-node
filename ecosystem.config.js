const kill_timeout = 7000

const autorestart = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'stage'
console.log('### pm2 autorestart:', autorestart, ' NODE_ENV:', process.env.NODE_ENV)
module.exports = {
  // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
  apps: [
    {
      name: 'diary-server',
      namespace: 'bebe',
      script: './dist/diary-server/diary-server.js',
      instances: 1,
      watch: false,
      max_memory_restart: '1G',
      wait_ready: true,
      autorestart,
      kill_timeout,
    },
  ],
}
