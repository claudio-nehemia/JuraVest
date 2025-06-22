import { UsahaBaru } from './usaha-baru';
import { UsahaOngoing } from './usaha-ongoing';

export * from './usaha-baru';
export * from './usaha-ongoing';

export type UsahaBaruOngoing = UsahaBaru | UsahaOngoing;
