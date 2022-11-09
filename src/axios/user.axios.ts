import axios from '@src/axios/index';
import { UserDocument } from '@src/interfaces';
import { JwtToken } from '@src/utils/storage.utils';
import { Md5 } from 'md5-typescript';


export async function getUserByAuthId(): Promise<UserDocument | null> {
  try {
    const authid = await JwtToken.getAuthId()
    return authid ? (await axios.get(`user/auth/${authid}`)).data : null;
  } catch (e: any) {
    console.log('Error get request :', e.message);
    return null;
  }
}

export async function getAuth(email: string, password: string): Promise<boolean | string> {
  const data = { email, password: Md5.init(password) }
  try {
    const res = await axios.post('auth/login', data)
    await JwtToken.setPubkey(res.data.pk)

    return true
  } catch (e: any) {
    let msg = e.response.data
    if (e.code === 'ERR_BAD_RESPONSE') {
      // const match = e.response.data.match(new RegExp('^<pre>.+pre>$', 'm'))
      // msg = match[0].replace('<pre>', `<pre style="white-space: pre-wrap">`)
      msg = 'Unknown Account Identifier'
    }
    console.log('catch error sur auth/login', msg)
    return msg
  }
}
