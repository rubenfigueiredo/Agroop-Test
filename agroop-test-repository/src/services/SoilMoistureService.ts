import { Service, createCache } from "rc-service";
import {
    Normalized,
    normalizeCreate,
    denormalize,
    normalize,
    normalizeSet
} from "../utils/normalize";
import { apiUrl, token } from "../utils/consts";

export interface SoilMoistureParams {
    beginDate: number,
    deviceID: number,
    endDate: number
}
export interface SoilMoisture {
    S1T: number,
    S2T: number,
    S3T: number,
    S4T: number,
    S5T?: number,
    S6T?: number,
    timestamp: number
}

export interface SoilMoistureState {
    soilMoisture: SoilMoisture[] | undefined
}

const fetchSoilMoisture = (params: SoilMoistureParams) => 
    fetch(`${apiUrl}/devices/${params.deviceID}/soilMoisture?beginDate=${params.beginDate}&deviceID=${params.deviceID}&endDate=${params.endDate}`, {
        method: "GET",
        headers: { Authorization: `Basic ${token}` },
    }).then( (r) => r.json() as Promise<SoilMoisture[]> )
    

export class SoilMoistureService extends Service<SoilMoistureState> {
    static serviceName = "SoilMoistureService";
    state = {
        soilMoisture: []
    };
    async getSoilMoisture(params: SoilMoistureParams){
        try {
            const results = await fetchSoilMoisture(params);
            if(results){
                this.setState({soilMoisture: results});
            }
        } catch (error) {
            console.log(error);
        }
    }
}