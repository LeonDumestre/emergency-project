export type Fire = {
  id: number;
  longitude: number;
  latitude: number;
  intensity: number;
  triggerAt: Date;
};

export type FireWithCircle = Fire & {
  circle: L.Circle;
};
