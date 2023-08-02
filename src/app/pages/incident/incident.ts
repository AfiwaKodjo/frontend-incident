import { Agence } from "../agences/agence";
import { Client } from "../clients/client";
import { Procedure } from "../procedures/procedure";
import { Utilisateurs } from "../utilisateurs/update-utilisateurs/utilisateurs";
import { MesCanaux } from "./mes-canaux";
import { MesPriorites } from "./mes-priorites";
import { MesStatuts } from "./mes-statuts";


export class Incident {
    idIncident!: number;
    nomIncident!:string;
    descriptionIncident!:string;
    dateCreationIncident!:Date;
    dateClotureIncident!:Date;
    prioriteIncident!: MesPriorites;
    statutIncident!:MesStatuts;
    canalIncident!:MesCanaux;
    utilisateur!:Utilisateurs;
    procedure!:Procedure;
    client!: Client;
    agence!: Agence;
}
