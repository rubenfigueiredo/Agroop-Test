import { Service, createCache } from "rc-service";
import {
  Normalized,
  normalizeCreate,
  denormalize,
  normalize,
  normalizeSet
} from "../utils/normalize";

const apiUrl = "https://api-device.agroop.net/devices";
const username = "ruben";
const password = "testpassapi";
const token = btoa(`${username}:${password}`);

const getDevices = () =>
  fetch(`${apiUrl}`, {
    method: "GET",
    headers: { Authorization: `Basic ${token}` }
  }).then((r) => r.json()) as Promise<String[]>;

export interface DeviceState{
  devices: String[]
}

export class DeviceService extends Service<DeviceState> {
  static serviceName = "DeviceService";
  state = {
    devices: []
  };
  devices = createCache<null, String[]>(
    () => this.state.devices,
    () => getDevices(),
    (devices: String[]) => this.setState({ devices })
  );
}
