import { UserModel } from "./UserModel";

export class UserResponseModel {
    constructor(public ResponseCode?: string, public Message?: string, public User?: UserModel,) { }
}