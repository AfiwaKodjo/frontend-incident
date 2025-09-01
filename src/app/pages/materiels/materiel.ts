import { Procedure } from "../procedures/procedure";
import { Utilisateurs } from "../utilisateurs/update-utilisateurs/utilisateurs";

export class Materiel {
    idMateriel!: number;
    nomMateriel!: string;
    quantiteMateriel!: number;
    numeroSerie!: string;
    typeMachine!: string;
    identifiMachine!:string;
    image!:Blob;
    procedure!: Procedure;
    utilisateur!: Utilisateurs;

}
