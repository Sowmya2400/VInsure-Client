import { Login } from "./login";
import { Policy } from "./policy";

export class policyLogin{
    policyDto:Policy;
    loginDto:Login;
    constructor(policyDto:Policy,loginDto:Login){
        this.policyDto=policyDto;
        this.loginDto=loginDto;
    }
}