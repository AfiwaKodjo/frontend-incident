import { Client } from "../clients/client";

export class Agence {
    idAgence!: number;
    lieuAgence!: string;
    telephoneAgence!: string;
    client!: Client;
}
