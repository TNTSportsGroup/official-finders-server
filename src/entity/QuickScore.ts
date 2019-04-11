import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("quickscores")
export class QuickScore extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 255, nullable: false })
  season: string;

  @Column("int", { nullable: false })
  year: number;

  @Column("json")
  data: Object;
}
