import * as Router from 'koa-router'
import * as jwt from 'koa-jwt'
import { _JWT_KEY_, accessKey, secretKey, bucket } from '../conf/secretKeys'
import { Context } from 'koa'
import * as qiniu from 'qiniu'



const router = new Router({ prefix: '/file' })
const auth = jwt({ secret: _JWT_KEY_ })
router.post('/img', auth, async (ctx: Context) => {
  const url = await uploadQiniu(ctx)
  ctx.body = { url }
})
function uploadQiniu(ctx: Context) {
  return new Promise((resolve) => {
    const { filepath, originalFilename } = ctx.request.files.file as any
    // 七牛云 相关文档 https://developer.qiniu.com/kodo/1289/nodejs#1
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    const putPolicy = new qiniu.rs.PutPolicy({scope: bucket})
    const uploadToken = putPolicy.uploadToken(mac);
    const config: any = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z1;
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    const bucketManager = new qiniu.rs.BucketManager(mac, config);
    const publicBucketDomain = 'http://rvoalg4kz.hb-bkt.clouddn.com'
    
    formUploader.putFile(uploadToken, originalFilename, filepath, putExtra, (_respErr, respBody, _respInfo) => {
      const publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, respBody.key);
      resolve(publicDownloadUrl)
    })
  })
}
export default router