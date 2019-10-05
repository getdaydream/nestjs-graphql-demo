import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Notification {
  // flash message ?
  @PrimaryColumn()
  id: number;
}
