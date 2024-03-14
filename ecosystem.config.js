const fs = require('fs');

// Function to dynamically generate PM2 app configurations
const generateAppConfigs = () => {
  const envFiles = fs.readdirSync('./').filter(file => file.endsWith('.run.env'));
  return envFiles.map(file => {
    const projectName = file.split('.').slice(0, -2).join('.');
    return {
      name: `text-embedding-inference-${projectName}`,
      script: `sudo docker compose -p ${projectName} --env-file ${file} up`,
      watch: false,
      interpreter: 'none', // Important for running shell commands
      max_memory_restart: '1000M',
      autorestart: true,
      max_restarts: 10,
    };
  });
};

module.exports = {
  apps: generateAppConfigs(),
};
