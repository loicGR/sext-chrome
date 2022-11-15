import axios from '@src/axios/index';
import { ToyDocument } from '@src/interfaces';

export async function fetchToys(scrid: string): Promise<ToyDocument[]> {
  try {
    const res = await axios.get(`/tobject/toys/${scrid}`);
    return res ? res.data : [];
  } catch (e) {
    return [];
  }
}
