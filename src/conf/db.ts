import { isProd } from '../utils/env'
import { DEV_MYSQL_KEY, PROD_MYSQL_KEY } from './secretKeys'

let _MYSQL_CONF = {
  user: 'root',
  password: DEV_MYSQL_KEY,
  port: '3306',
  database: 'words'
}
  
if (isProd) {
  _MYSQL_CONF = {
    user: 'root',
    password: PROD_MYSQL_KEY,
    port: '3306',
    database: 'words'
  }
}
export const MYSQL_CONF = _MYSQL_CONF