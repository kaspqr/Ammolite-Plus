import { SerializedError } from "@reduxjs/toolkit";

export interface EntityState<T> {
  entities: T[];
  entity: T;
  error: SerializedError | null;
  loading: boolean;
}
