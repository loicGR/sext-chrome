import axios from '@src/axios/index';
import { TreenodeDocument } from '@src/interfaces';

export async function fetchPackTree(prjId: string = ''): Promise<TreenodeDocument[]> {
  try {
    const res = await axios.get(`tnode/SCREENS/${prjId}`);
    return res ? res.data : [];
  } catch (e: any) {
    console.log('Error post request :', e.message);
    return [];
  }
}
