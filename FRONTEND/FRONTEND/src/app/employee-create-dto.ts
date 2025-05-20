export interface EmployeeCreateDto {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    phoneNumber: string;
    address: string;
    image: string;
    dateOfEmployment: Date;
    serviceIDs?: string[] | null;
}
