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

export async function updateToy(toyId: string, data: Partial<ToyDocument>): Promise<ToyDocument | null> {
    try {
      const res = await axios.put(`/tobject/toy/${toyId}`, data);
      return res ? res.data : null;
    } catch (e) {
      return null;
    }
}
