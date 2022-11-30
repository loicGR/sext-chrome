import { verify } from 'jsonwebtoken-esm';

export class UserEmail {
  public static get = async () => {
    const {userEmail} = await chrome.storage.sync.get('userEmail')
    return userEmail as string | undefined
  }

  public static set = async (email: string) => {
    await chrome.storage.sync.set({userEmail: email})
  }
}

export class AccountId {
  public static get = async () => {
    const {accountId} = await chrome.storage.sync.get('accountId')
    return accountId as string | undefined
  }

  public static set = async (accountId: string) => {
    await chrome.storage.sync.set({accountId})
  }

  public static clear = async () => {
    await chrome.storage.sync.remove('accountId')
  }
}

export class SapiUrl {
  public static get = async () => {
    const {sapiUrl} = await chrome.storage.sync.get('sapiUrl')
    return sapiUrl as string
  }

  public static set = async (sapiUrl: string) => {
    await chrome.storage.sync.set({sapiUrl})
  }
}

export class JwtToken {
  public static get = async () => {
    const {token} = await chrome.storage.sync.get('token')
    return token as string | undefined
  }

  public static set = async (token: string) => {
    await chrome.storage.sync.set({token})
  }

  public static setPubkey = async (pubkey: string) => {
    await chrome.storage.sync.set({pubkey})
  }

  public static getAuthId = async () => {
    const { token, pubkey} = await chrome.storage.sync.get(['token', 'pubkey'])

    if (token && pubkey) {
      try {
        const v = verify(token, pubkey) as { authid: string, isadmin: boolean };
        return v.authid;
      } catch (e) {
        return null;
      }
    } else {
      return null
    }
  }

  public static logout = async () => {
    await chrome.storage.sync.remove(['token', 'userEmail'])
  }
}
