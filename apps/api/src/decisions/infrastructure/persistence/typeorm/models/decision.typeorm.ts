import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { PersistenceEntity } from "src/common/persistence-entity";

@Entity("decision")
export class DecisionTypeOrm extends PersistenceEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", unique: true })
  proposalId: string;

  @Column({ type: "uuid" })
  selectedOptionId: string;

  @Column({ type: "uuid" })
  decidedByUserId: string;

  @Column({ type: "text", nullable: true })
  rationale: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static build(props: Partial<DecisionTypeOrm>): DecisionTypeOrm {
    return Object.assign<DecisionTypeOrm, Partial<DecisionTypeOrm>>(
      new DecisionTypeOrm(),
      props
    );
  }
}
