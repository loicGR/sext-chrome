import { PictureDocument } from '@src/interfaces';
import { Buffer} from 'buffer'

class Pictures {
  private shots = new Map<string, string>()

  public setUrl(picture: PictureDocument | null) {
    const url = picture ? `data:${picture.type};base64,${(new Buffer(picture.data as Buffer)).toString('base64')}` : '';
    if (picture) {
      this.shots.set(picture._id, url)
    }
    return url
  }

  public getUrl(screenShotId: string) {
    return this.shots.get(screenShotId) || null
  }
}

const pictures = new Pictures()
export default pictures
