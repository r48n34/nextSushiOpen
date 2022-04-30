import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
// just in case of any legal issues

function genStoreInfoApi(): string{
    const str = "U2FsdGVkX18Fmvv61B+PWSuT69Cv4thJX6IxGJAaHFqO8rgHkOj7pMWlwdMkLyg0B7pUru6v8RA/PIKOGi7wBOiQHw3tnk78IM1ZeHKSdp3HoT3pXLIdxs1gOqJqsXLx"
    const urlLink  = CryptoJS.AES.decrypt(str, 'justInCase').toString(CryptoJS.enc.Utf8);
    return urlLink + uuidv4();
}

function genspecificStoreTicket(id: number | string): string{
    const str = "U2FsdGVkX1+F540mDZp0bFXMfB7dxpoK8QWzUVnkYXUU5qbX0f30QEmXLmp9J4lWnTu2RAmmBVTFqOCMs6IbGsIsU+y0hjhTCZWrpVD+rOaK4argjT2/HT2oLwC1VJqD"
    const urlLink  = CryptoJS.AES.decrypt(str, 'justInCase').toString(CryptoJS.enc.Utf8);
    return urlLink + id;
}

export { genStoreInfoApi, genspecificStoreTicket }