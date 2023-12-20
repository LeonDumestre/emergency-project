export type Fire = {
  id: number;
  longitude: number;
  latitude: number;
  intensity: number;
  triggerAt: Date;
};

export type NewFire = Omit<Fire, "id">;
