module.exports = {
  apps: [
    {
      name: 'aegisindex-frontend',
      script: 'npm',
      args: 'start',
      cwd: './frontend',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'aegisindex-backend',
      script: 'npm',
      args: 'start',
      cwd: './backend',
      env: {
        NODE_ENV: 'production',
        API_PORT: 4000
      }
    },
    {
      name: 'aegisindex-agent',
      script: 'npm',
      args: 'run run-all',
      cwd: './agent',
      cron_restart: '0 9 * * 1', // Run every Monday at 9 AM
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}

