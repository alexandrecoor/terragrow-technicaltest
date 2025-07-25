import { Band } from "./band.model";

export interface Plot {
    id: string;
    name: string;
    length: number;
    width: number;
    bandCount?: number;
    bands?: Band[];
}
