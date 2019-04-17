import { Service, createCache } from "rc-service";
import {
  Normalized,
  normalizeCreate,
  denormalize,
  normalize,
  normalizeSet,
  normalizeDelete
} from "../utils/normalize";

const apiUrl = "http://localhost:4000/areas";

export interface Area {
  id?: number;
  name: string;
  area: number | string;
  crop: string;
  device: string;
}

export interface AreaState {
  areas: Normalized<number, Area>;
}

const getAreas = () =>
  fetch(`${apiUrl}`).then(r => r.json()) as Promise<Area[]>;

const getArea = (id: number) =>
  fetch(`${apiUrl}/${id}`).then(r => r.json()) as Promise<Area>;

const addArea = (area: Area) =>
  fetch(`${apiUrl}`, {
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json"
    }),
    method: "POST",
    body: JSON.stringify(area)
  }).then(r => r.json());

const updateArea = (area: Area) =>
  fetch(`${apiUrl}/${area.id}`, {
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json"
    }),
    method: "PUT",
    body: JSON.stringify(area)
  }).then(r => r.json());

const deletesArea = (id: any): Promise<Boolean> =>
  fetch(`${apiUrl}/${id}`, {
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json"
    }),
    method: "DELETE"
  }).then(r => r.ok);

export class AreaService extends Service<AreaState> {
  static serviceName = "AreaService";
  state = {
    areas: normalizeCreate<number, Area>()
  };
  areas = createCache<null, Area[]>(
    () => denormalize(this.state.areas),
    () => getAreas(),
    areas => this.setState({ areas: normalize(areas) })
  );

  area = createCache<number, Area>(
    id => this.state.areas.byId[id],
    id => getArea(id),
    area => this.setState({ areas: normalizeSet(this.state.areas, area) }),
    { cacheFirst: true }
  );

  async createArea(area: Area) {
    try {
      const areaCreated = await addArea(area);
      if (areaCreated) {
        console.log("areaCreated", areaCreated);
      this.setState({ areas: normalizeSet(this.state.areas, areaCreated) });
      } 
    } catch (error) {
      console.log("error", error);
    }
  }

  async changeArea(area: Area) {
    try {
      const areaChanged = await updateArea(area);
      if (areaChanged) {
        this.setState({
          areas: normalizeSet(this.state.areas, areaChanged)
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async deleteArea(id: any) {
    try {
      const areaDeleted = await deletesArea(id);
      if (areaDeleted) {
        this.setState({
          areas: normalizeDelete(this.state.areas, id)
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }
}
