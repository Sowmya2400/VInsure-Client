export class Claims{

claimId: number;
    policyNo: number;
    claimAmount: number;
    claimDate: Date;
    approvalStatus: string;
    claimReason: string;


    constructor(claimId,
        policyNo,
        claimAmount,
        claimDate,
        approvalStatus,
        claimReason){

            this.claimId=claimId;
            this.policyNo=policyNo;
            this.claimAmount=claimAmount;
            this.claimDate=claimDate;
            this.approvalStatus=approvalStatus;
            this.claimReason=claimReason;
        }
}