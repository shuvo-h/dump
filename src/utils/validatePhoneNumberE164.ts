/**
 * 
 * @param phoneNumber Phone number to be validated
 * @returns boolean value true/false
 * @example validatePhoneForE164("+123456678"):true
 */
export const validatePhoneForE164 = (phoneNumber:string):boolean => {
    const regEx = /^\+[1-9]\d{10,14}$/;
    return regEx.test(phoneNumber);
};