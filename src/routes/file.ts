import * as Router from 'koa-router'
import * as jwt from 'koa-jwt'
import { _JWT_KEY_, accessKey, secretKey, bucket } from '../conf/secretKeys'
import { Context } from 'koa'
import * as qiniu from 'qiniu'
import * as fs from 'fs'
import { Caption } from '../models/index'
import * as path from 'path'
import * as os from 'os'
interface CaptionValue{
  origin: string
  translate: string
}
const router = new Router({ prefix: '/file' })
const auth = jwt({ secret: _JWT_KEY_ })
router.post('/img', auth, async (ctx: Context) => {
  const url = await uploadQiniu(ctx)
  ctx.body = { url }
})
router.post('/caption', auth, async (ctx: Context) => {  
  const { filepath } = ctx.request.files.file as any
  const fileData = await fs.readFileSync(filepath, 'utf-8')
  fs.unlink(filepath, () => {})
  const caption = JSON.parse(fileData)
  const captionArray = Object.entries(caption).map(([key, value]: [string, CaptionValue]) => {
    const [start, end] = key.split('-').map(i => Number(i))
    return {
      start,
      end,
      en: value.origin,
      cn: value.translate
    }
  })
  ctx.body = captionArray
})
function uploadQiniu(ctx: Context) {
  return new Promise((resolve) => {
    const { filepath, originalFilename } = ctx.request.files.file as any
    // 七牛云 相关文档 https://developer.qiniu.com/kodo/1289/nodejs#1
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    const putPolicy = new qiniu.rs.PutPolicy({scope: bucket, expires: 3600 * 24 * 365 * 60})  // 3600为一小时  共60年
    const uploadToken = putPolicy.uploadToken(mac);
    const config: any = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z1;
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    const bucketManager = new qiniu.rs.BucketManager(mac, config);
    const publicBucketDomain = 'http://file.freetoplay.cn/'
    
    formUploader.putFile(uploadToken, originalFilename, filepath, putExtra, (_respErr, respBody, _respInfo) => {
      const publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, respBody.key);
      resolve(publicDownloadUrl)
      // 上次成功后删除缓存
      fs.unlink(filepath, () => {})
    })
  })
}
// 下载字幕文件
router.get('/:fragmentId/caption', auth, async (ctx: Context) => {
  ctx.verifyParams({
    fragmentId: { type: 'string', required: true },
  })
  const { fragmentId }  = ctx.params
  const findCaption = await Caption.findOne({
    where: { fragmentId }
  })
  const res = {}
  if (findCaption) {
    const { value } = findCaption
    JSON.parse(value).forEach(item => {
      const { start, end, en, cn} = item
      res[`${start}-${end}`] = {
        origin: en,
        translate: cn
      }
    })
    const filePath = path.resolve(__dirname, '..', `public/${fragmentId}.json`)
    fs.writeFileSync(filePath, JSON.stringify(res))
    ctx.body = {
      url: `http://${getIpAddress()}:7001/${fragmentId}.json`
    }
    setTimeout(() => {
      fs.unlink(filePath, () => {})
    }, 3000)
  } else {
    ctx.status = 404
  }
})
export default router

function getIpAddress() {
  let ifaces = os.networkInterfaces()
  for (let dev in ifaces) {
      let iface = ifaces[dev]
      for (let i = 0; i < iface.length; i++) {
          let { family, address, internal } = iface[i]
          if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
              return address
          }
      }
  }
}