export class Customer{
    name: string;
    email: string;
    password: string;
    dateOfBirth: string;
    phone: string;
    address: string;

    aadharCard: string;
    panCard: string;
    
    constructor(fullName, email, password, dateOfBirth, contactNumber, address){
        this.name = fullName;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.phone = contactNumber;
        this.address = address;
    }
}