export class DashboardPolicy {
    policyNumber: string;
    duration: number;
    price: number;
    issueDate: Date;
    approvalStatus: string;
    plan: string;
    type: string;
    maxClaim: number;

    constructor(policyNumber: number,
        price: number,
        duration: number,
        issueDate: Date,
        approvalStatus: string,
        plan: string,
        maxClaim: number,
        type: string
        ) {

        this.policyNumber = String(policyNumber);
        this.duration = duration
        this.price = price
        this.issueDate =  issueDate
        this.approvalStatus =  approvalStatus
        this.plan =  plan
        this.maxClaim = maxClaim
        this.type = type
    }


}
