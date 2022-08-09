export class CustomerUpdateWrapper{
    fullName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    contactNumber: string;
    address: string;

    oldEmail: string;
    oldPassword: String;

    constructor(fullName, email, password, dateOfBirth, contactNumber, address, oldEmail, oldPassword) {
        this.fullName = fullName
        this.email = email
        this.password = password
        this.dateOfBirth = dateOfBirth
        this.contactNumber = contactNumber
        this.address = address
        this.oldEmail = oldEmail
        this.oldPassword = oldPassword
    }
}