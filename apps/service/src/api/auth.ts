

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


