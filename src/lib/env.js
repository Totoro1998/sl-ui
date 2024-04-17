import pkg from '../../package.json'

export function isDevMode() {
  return import.meta.env.DEV
}

export function isProdMode() {
  return import.meta.env.PROD
}

export function getEnv() {
  return import.meta.env.MODE
}

export function getCommonStoragePrefix() {
  const { name, version } = pkg
  return `${name.replace(/\s/g, '_')}__${getEnv()}__${version}__`.toUpperCase()
}
