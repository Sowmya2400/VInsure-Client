export class AdminDashboardClaims{

    claimId: string;
    policyNo: number;
    claimAmount: number;
    claimDate: Date;
    claimReason: string;
    registrationFile: any;

   constructor( 
       claimId:number,
    policyNo: number,
    claimAmount : number,
    claimDate: Date,
    claimReason:string,
    registrationFile: any
){
    this.claimId=String(claimId);
    this.policyNo= policyNo;
    this.claimAmount=claimAmount;
    this.claimDate=claimDate;
    this.claimReason=claimReason;
    this.registrationFile = registrationFile
}

}