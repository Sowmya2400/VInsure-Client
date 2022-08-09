export class AdminDashboardCustomers{
    customerId: string;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    noOfPolicies: number;

    constructor(customerId: number,
        name: string,
        email: string,
        phone: string,
        dateOfBirth: Date,
        noOfPolicies: number){
            this.customerId = String(customerId);
            this.name = name;
            this.email = email;
            this.phone = phone;
            this.dateOfBirth = dateOfBirth;
            this.noOfPolicies = noOfPolicies;
        }
}