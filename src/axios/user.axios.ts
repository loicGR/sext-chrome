import axios from '@src/axios/index';
import { UserDocument } from '@src/interfaces';
import { JwtToken } from '@src/utils/storage.utils';


export async function getUserByAuthId(): Promise<UserDocument | null> {
  try {
    const authid = await JwtToken.getAuthId()
    return authid ? (await axios.get(`user/auth/${authid}`)).data : null;
  } catch (e: any) {
    console.log('Error get request :', e.message);
    return null;
  }
}
