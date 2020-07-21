import serverConfigs from 'configs/servers';

export function getDelpoyEnv() {
  return process.env.DEPLOY_ENV || localStorage.getItem('DEPLOY_ENV') || 'dev';
}

export function getServer(servers = serverConfigs) {
  return servers[getDelpoyEnv()];
}
