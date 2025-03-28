export class User {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;
    id: string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : "";
        this.lastName = obj ? obj.lastName : "";
        this.email = obj ? obj.email : "";
        this.birthDate = obj ? obj.birthDate : "";
        this.street = obj ? obj.street : "";
        this.zipCode = obj ? obj.zipCode : "";
        this.city = obj ? obj.city : "";
        this.id = obj ? obj.id : "";
    }

    
}
