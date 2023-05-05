import axios from 'axios'
import { v4 as uuidv4 }from 'uuid'
import * as crypto from 'crypto'
import { YOUDAO_KEY, YOUDAO_SECRET }from '../conf/secretKeys'

const YOUDAO_URL = 'https://openapi.youdao.com/api'

export function getYoudaoAndFormat(request_word: string) {
  const salt = uuidv4()
  const curtime = Math.round(new Date().getTime() / 1000)
  const str = YOUDAO_KEY + request_word + salt + curtime + YOUDAO_SECRET
  const hash = crypto.createHash('sha256').update(str)
  const sign = hash.digest('hex')
  return axios({
    method: 'POST',
    url: YOUDAO_URL,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    params: {
      q: request_word,
      from: 'en',
      to: 'zh-CHS',
      appKey: YOUDAO_KEY,
      salt,
      sign,
      signType: 'v3',
      curtime,
    }
  }).then((res: any) => {
    const { 
      errorCode,
      word, 
      isWord, 
      translation, 
      webdict, 
      speakUrl, 
      basic, 
      returnPhrase,
      web
    } = res.data
    if (errorCode !== "0") {
      return { error: true }
    }
    // 用于存最后放在数据库里面的对象
    const _youdao_: any = { 
      isWord, 
      translation: translation.join(','), 
      webdict: 
      webdict.url, speakUrl 
    }
    
    if (isWord) {
      _youdao_.explains = JSON.stringify(basic.explains)
      _youdao_.ukPhonetic = basic['uk-phonetic']
      _youdao_.ukSpeech = basic['uk-speech']
      _youdao_.usPhonetic = basic['us-phonetic']
      _youdao_.usSpeech = basic['us-speech']
    }
    if (returnPhrase) {
      _youdao_.word = returnPhrase[0]
    } else if (word) {
      _youdao_.word = word[0] 
    } else {
      // 不是单词 也不是短语的内容,没有 returnPhrase 和 word
      _youdao_.word = request_word
    }
    if (web) {
      _youdao_.web = web ? JSON.stringify(web) : null
    }
    return _youdao_
  })
}