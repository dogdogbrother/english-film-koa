import { isProd } from '../utils/env'
import { DEV_MYSQL_KEY, PROD_MYSQL_KEY } from './secretKeys'

interface ConfProp {
  host?: string
  user: string
  password: string
  port: string | number
  database: string
}

let _MYSQL_CONF: ConfProp = {
  host: '120.46.36.244',
  user: 'root',
  password: DEV_MYSQL_KEY,
  port: '3306',
  database: 'film'
}
  
if (isProd) {
  _MYSQL_CONF = {
    user: 'root',
    password: PROD_MYSQL_KEY,
    port: '3306',
    database: 'film'
  }
}
export const MYSQL_CONF = _MYSQL_CONF