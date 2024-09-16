import { ClientModel } from "./ClientModel";

export class ClientResponseModel {
    constructor(public ResponseCode?: string, public Message?: string,
        public Client?: ClientModel, public Clients?: ClientModel[],) { }
}