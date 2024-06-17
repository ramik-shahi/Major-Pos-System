export interface EmployeeForm {
    name: string;
    address: string;
    email:string;
    password:string;
    phoneNumber:string;
    image: File | null;
    panNumber: string|null;
    position:string

  }