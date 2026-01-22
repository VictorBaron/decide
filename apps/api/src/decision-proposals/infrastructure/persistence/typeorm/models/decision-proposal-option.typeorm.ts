import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";

import { PersistenceEntity } from "src/common/persistence-entity";
import { DecisionProposalTypeOrm } from "./decision-proposal.typeorm";

@Entity("decisionProposalOption")
export class DecisionProposalOptionTypeOrm extends PersistenceEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 1000 })
  text: string;

  @Column({ type: "int8" })
  order: number;

  @Column({ type: "uuid" })
  proposalId: string;

  @ManyToOne(() => DecisionProposalTypeOrm, (proposal) => proposal.options, {
    onDelete: "CASCADE",
  })
  proposal: Relation<DecisionProposalTypeOrm>;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  static build(
    props: Partial<DecisionProposalOptionTypeOrm>
  ): DecisionProposalOptionTypeOrm {
    return Object.assign<
      DecisionProposalOptionTypeOrm,
      Partial<DecisionProposalOptionTypeOrm>
    >(new DecisionProposalOptionTypeOrm(), props);
  }
}
