import { Login } from "./login";
import { Policy } from "./policy";
import { Travel } from "./travel";
import { Vehicle } from "./vehicle";

export class AddPolicyWrapper{
    email: string;
    password: string;

    priceOfPremium:number;
    policyPlan:string;
    insuranceType: string;
    maxClaim: number;
    insuranceFor: string;
    policyDuration: number;

    vehicleType:string;
    vehicleCompany:string;
    vehicleModel:string;
    purchaseDate:Date;
    licenseNo:string;
    registrationNo:string;
    engineNo:string;
    chassisNo:string;
    price: number;
    registrationFile: string;

    departureDate:string;
    returnDate:string;
    placeOfVisit:string;
    numberOfPeople:number;

    constructor(login: Login, policy: Policy, vehicle: Vehicle, travel: Travel){
        this.email = login.email
        this.password = login.password

        this.priceOfPremium = policy.priceOfPremium
        this.policyPlan = policy.policyPlan
        this.insuranceType = policy.insuranceType
        this.maxClaim = policy.maxClaim
        this.insuranceFor = policy.insuranceFor
        this.policyDuration = policy.policyDuration

        this.vehicleType = vehicle.vehicleType
        this.vehicleCompany = vehicle.vehicleCompany
        this.vehicleModel = vehicle.vehicleModel
        this.purchaseDate = vehicle.purchaseDate
        this.licenseNo = vehicle.licenseNo
        this.registrationNo = vehicle.registrationNo
        if(policy.insuranceFor=="VEHICLE"){
            this.registrationFile = vehicle.registrationFile
        }
        else if(policy.insuranceFor=="TRAVEL"){
            this.registrationFile = travel.ticketFile
        }
        
        this.engineNo = vehicle.engineNo
        this.chassisNo = vehicle.chassisNo
        this.price = vehicle.price

        this.departureDate = travel.departureDate
        this.returnDate = travel.returnDate
        this.placeOfVisit = travel.placeOfVisit
        this.numberOfPeople = travel.numberOfPeople
    }
    
}