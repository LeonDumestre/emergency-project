type Truck = {
  plate: string;
  acquisition: Date;
  type: number;
  capacity: number;
};

type Firefighter = {
  id: number;
  name: string;
  birthDate: number;
  grade: string;
};

export type BaseFireStation = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

export type FireStation = BaseFireStation & {
  trucks: Truck[];
  firefighters: Firefighter[];
};
