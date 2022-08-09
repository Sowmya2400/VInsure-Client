export class OtpWrapper{
    email: string;
    otp: number;
    password: string;

    constructor(email, otp, password){
        this.email = email
        this.otp = otp
        this.password = password
    }
}