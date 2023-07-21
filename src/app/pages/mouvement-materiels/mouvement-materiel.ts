import { Incident } from "../incident/incident";
import { Materiel } from "../materiels/materiel";
import { MesMouvements } from "./mes-mouvements";

export class MouvementMateriel {
    idMouvement_Materiel!: number;
    libelleMouvement_materiel!:MesMouvements;
    quantiteMouvement_materiel!: number;
    materiel!: Materiel;
    incident!: Incident;



}
