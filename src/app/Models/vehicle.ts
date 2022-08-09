export class Vehicle{
    vehicleType:string;
    vehicleCompany:string;
    vehicleModel:string;
    purchaseDate:Date;
    licenseNo:string;
    registrationNo:string;
    registrationFile: string;
    engineNo:string;
    chassisNo:string;
    price: number;

    constructor(vehicleType,vehicleCompany,vehicleModel,purchaseDate,licenseNo,registrationNo, registrationFile,engineNo,chassisNo, price){
        this.vehicleType=vehicleType;
        this.vehicleCompany=vehicleCompany;
        this.vehicleModel=vehicleModel;
        this.purchaseDate=purchaseDate;
        this.licenseNo=licenseNo;
        this.registrationNo=registrationNo;
        this.registrationFile = registrationFile
        this.engineNo=engineNo;
        this.chassisNo=chassisNo;
        this.price = price;
    }
}