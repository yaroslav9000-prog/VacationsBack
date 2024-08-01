export class ClientsErrors{
    public status: number;
    public message: string;

    constructor(status: number, message: string){
        this.status = status;
        this.message = message;
    }
}

export class RouteNotFound extends ClientsErrors{
    constructor(route: string){
        super(404, `route ${route} was not found`);
    }
}

export class UserNotLogged extends ClientsErrors{
    constructor(){
        super(401, `user is not authorized`);
    }
}
export class VacationNotFound extends ClientsErrors{
    constructor(){
        super(404, `sorry the vacation is not found`);
    }
}