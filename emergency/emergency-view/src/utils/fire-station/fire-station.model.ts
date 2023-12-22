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

export type FireStation = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  trucks: Truck[];
  firefighters: Firefighter[];
};