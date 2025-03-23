  // 임시 데이터 생성
const membersData = [
    {studentId : "2019019114" , name: 'Alice', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019214" , name: 'Alice', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019314" , name: 'Alice', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019414" , name: 'Alice', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019514" , name: 'Alice', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019614" , name: 'Alice', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019714" , name: 'Alice', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019814" , name: 'Alice', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019914" , name: 'Alice', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019011014" , name: 'Alice', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019012014" , name: 'Alice', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019015" , name: 'Bob', grade: "2학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019016" , name: 'Charlie', grade: "3학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019017" , name: 'Alice', grade: "4학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019018" , name: 'Bob', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019019" , name: 'Charlie', grade: "2학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019020" , name: 'Alice', grade: "3학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019021" , name: 'Bob', grade: "4학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019022" , name: 'Charlie', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019023" , name: 'Alice', grade: "2학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019024" , name: 'Bob', grade: "3학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019025" , name: 'Charlie', grade: "4학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019026" , name: 'Alice', grade: "졸업", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019027" , name: 'Bob', grade: "졸업", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019028" , name: 'Charlie', grade: "휴학", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019029" , name: 'Charlie', grade: "초과학기", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},    
];

const newMembersData = [
    {studentId : "2019019014" , name: 'Alice', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019015" , name: 'Bob', grade: "2학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019016" , name: 'Charlie', grade: "졸업생", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019017" , name: 'Alice', grade: "5학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019018" , name: 'Bob', grade: "6학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019019" , name: 'Charlie', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019020" , name: 'Alice', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019021" , name: 'Bob', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019022" , name: 'Charlie', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019023" , name: 'Alice', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019024" , name: 'Bob', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019025" , name: 'Charlie', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019026" , name: 'Alice', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019027" , name: 'Bob', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
    {studentId : "2019019028" , name: 'Charlie', grade: "1학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr"},
]

const executiveData = [
    {studentId : "2019019014" , name: '최가은', grade: "4학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr", executivetype: "회장"},
    {studentId : "2019019015" , name: '박상준', grade: "4학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr", executivetype: "부회장"},
    {studentId : "2019019016" , name: '서범수', grade: "초과학기", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr", executivetype: "임원"},
    {studentId : "2019019017" , name: '이지현', grade: "3학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr", executivetype: "임원"},
    {studentId : "2019019018" , name: '손동선', grade: "3학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr", executivetype: "임원"},
    {studentId : "2019019019" , name: '김준희', grade: "졸업생", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr", executivetype: "임원"},
    {studentId : "2019019020" , name: '이형진', grade: "4학년", phoneNumber: '010-0000-0000', birthday: '2000-07-10', email: "meow0710@Catholic.co.kr", executivetype: "임원"},
];

const executiveYear = [
    {year : 2024},
    {year : 2023},
    {year : 2022},
    {year : 2021},
    {year : 2020},
    {year : 2019},
]

export { membersData , newMembersData , executiveData , executiveYear };