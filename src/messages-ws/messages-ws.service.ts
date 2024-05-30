import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ConnectedCLients {
    [id: string]: Socket
}

@Injectable()
export class MessagesWsService {

    private connnectClients : ConnectedCLients = {}


    registerCliente(client: Socket){
        this.connnectClients[client.id] = client;

    }

    removeClient(clientId: string){
        delete this.connnectClients[clientId];

    }

    getConnectClients() : string[] {

        return Object.keys(this.connnectClients);



    }

}
