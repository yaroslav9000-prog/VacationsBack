//External dependencies
import {ObjectId} from "mongodb";

interface Role{
    role: "user" | "admin";
}
//Class
class User{
    public firstName: string;
    public lastName: string;
    public email: string;
    public pwd: string;
    public role: Role;

    constructor(firstName: string, lastName: string, email: string, pwd: string, role: Role, public id?: ObjectId){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.pwd = pwd;
        this.role = role;
    }
}
export {
    User,
    Role
}