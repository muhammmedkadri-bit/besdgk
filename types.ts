
export interface Flower {
  id: string;
  emoji: string;
  name: string;
  color: string;
}

export interface PlacedFlower {
  instanceId: string;
  flowerId: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export interface BouquetState {
  flowers: PlacedFlower[];
  paperColor: string;
  ribbonColor: string;
  sender: string;
}
