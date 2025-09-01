import { Incident } from "../incident/incident";
import { Materiel } from "../materiels/materiel";
import { MesMouvements } from "./mes-mouvements";

export class MouvementMateriel {
    idMouvement_Materiel!: number;
    libelleMouvement_Materiel!:string;
    quantiteMouvement_Materiel!: number;
    date!: Date;
    objet!:string;
    motifRejet!:string;
    statut: string = "En attente de validation";
    materiel!: Materiel;
    incident!: Incident;



}
