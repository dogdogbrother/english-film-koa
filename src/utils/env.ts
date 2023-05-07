/**
 * @description 环境变量
 * @author 森林
 */

const ENV = process.env.NODE_ENV

export const isDev = ENV === 'dev'
export const notDev = ENV !== 'dev'
export const isProd = ENV === 'production'
export const notProd = ENV !== 'production'
