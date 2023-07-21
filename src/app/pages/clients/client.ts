import { Agence } from "../agences/agence";
import { Utilisateurs } from "../utilisateurs/update-utilisateurs/utilisateurs";

export class Client {
    idClient!: number;
    nomClient!: string;
    adresseClient!: string;
    contactClient!: string;
    emailClient!: string;
    utilisateur!: Utilisateurs;
    agences!: Agence[];

}
