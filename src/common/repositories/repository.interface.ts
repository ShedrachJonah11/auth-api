export interface Repository<T, ID = string> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(input: Partial<T>): Promise<T>;
  update(id: ID, patch: Partial<T>): Promise<T | null>;
  delete(id: ID): Promise<void>;
}
