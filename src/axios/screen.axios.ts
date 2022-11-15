import axios from '@src/axios/index';
import { PictureDocument, ScreenDocument, TreenodeDocument } from '@src/interfaces';

export async function fetchPackTree(prjId: string = ''): Promise<TreenodeDocument[]> {
  try {
    const res = await axios.get(`tnode/SCREENS/${prjId}`);
    return res ? res.data : [];
  } catch (e: any) {
    console.log('fetchPackTree error :', e.message);
    return [];
  }
}

export async function fetchScreens(prjid: string, packid: string | null): Promise<ScreenDocument[]> {

  try {
    const res = await axios.post('screen/all', { prjid, packid });
    // console.log('fetchAllScreens res=', res);
    return res.data;
  } catch (e: any) {
    console.log('fetchScreens error :', e.message);
    return [];
  }
}

export async function fetchPicture(picid: string): Promise<PictureDocument | null> {
  try {
    const data = await axios.get(`/picture/${picid}`);
    return data ? data.data : null;
  } catch (e: any) {
    console.log('fetchPicture error :', e.message);
    return null;
  }
}
