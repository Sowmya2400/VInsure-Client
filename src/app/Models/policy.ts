export class Policy{
    priceOfPremium:number;
    policyPlan:string;
    insuranceType: string;
    maxClaim: number;
    insuranceFor: string;
    policyDuration: number;

    constructor(priceOfPremium: number,policyPlan: string, insuranceType: string, maxClaim: number, insuranceFor: string, policyDuration: number){
        this.priceOfPremium = priceOfPremium;
        this.policyPlan = policyPlan;
        this.insuranceType = insuranceType;
        this.maxClaim = maxClaim;
        this.insuranceFor = insuranceFor
        this.policyDuration = policyDuration
    }
}