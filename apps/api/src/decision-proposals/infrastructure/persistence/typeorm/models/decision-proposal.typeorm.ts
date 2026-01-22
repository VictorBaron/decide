import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";

import { DecisionProposalOptionTypeOrm } from "./decision-proposal-option.typeorm";
import { PersistenceEntity } from "src/common/persistence-entity";
import { CriticalityLevel } from "src/decision-proposals/domain";

@Entity("decisionProposal")
export class DecisionProposalTypeOrm extends PersistenceEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "varchar", length: 10000, nullable: true })
  context: string | null;

  @Column({ type: "uuid" })
  creatorId: string;

  @Column({ type: "varchar", length: 10000 })
  criticality: CriticalityLevel;

  @Column({ type: "uuid" })
  deciderId: string;

  @Column({ type: "date" })
  dueDate: Date;

  @OneToMany(() => DecisionProposalOptionTypeOrm, (option) => option.proposal, {
    cascade: true,
    eager: true,
  })
  options: Relation<DecisionProposalOptionTypeOrm[]>;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  static build(
    props: Partial<DecisionProposalTypeOrm>
  ): DecisionProposalTypeOrm {
    return Object.assign<
      DecisionProposalTypeOrm,
      Partial<DecisionProposalTypeOrm>
    >(new DecisionProposalTypeOrm(), props);
  }
}
