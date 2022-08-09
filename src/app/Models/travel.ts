export class Travel{
    departureDate:string;
    returnDate:string;
    ticketFile: any
    placeOfVisit:string;
    numberOfPeople:number;

    constructor(departureDate,returnDate, ticketFile,placeOfVisit,numberOfPeople){
        this.departureDate=departureDate;
        this.returnDate=returnDate;
        this.ticketFile = ticketFile
        this.placeOfVisit=placeOfVisit;
        this.numberOfPeople=numberOfPeople;
    }
}