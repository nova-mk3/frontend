

export interface Student {
    studentNumber : string,
    password : string,
    name : string,
    email : string,
    graduation : boolean,
    year : number,
    semester : number,
    absence : boolean,
    profilePhoto : string,
    phone : string,
    birth : string,
}

export interface Graduate extends Student {
    contact : boolean,
    work : boolean,
    job : string,
    contactInfo : string,
    contactDescription : string,
}

export async function verifyEmail(email : string) {
    try {
      const response = await fetch('/email-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!response.ok) throw new Error("에러가 발생했습니다.")
      return response.json();
    } catch (error) {
      console.error(error);
    }
}

export async function verifyEmailCode( {email,authCode} : {email : string,authCode : string}) {
  try {
    const response = await fetch('/email-auth/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email,authCode })
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}






