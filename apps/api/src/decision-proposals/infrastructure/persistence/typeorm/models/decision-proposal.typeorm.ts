import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";

import { DecisionProposalOptionTypeOrm } from "./decision-proposal-option.typeorm";
import {
  OwnProperties,
  PersistenceEntity,
} from "src/common/persistence-entity";
import { CriticalityLevel } from "src/decision-proposals/domain";
import { UserTypeOrm } from "src/users/infrastructure/persistence/typeorm/models/user.typeorm";

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

  @ManyToOne(() => UserTypeOrm, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "creatorId" })
  creator: Relation<UserTypeOrm>;

  @Column({ type: "varchar", length: 125 })
  criticality: CriticalityLevel;

  @Column({ type: "uuid" })
  deciderId: string;

  @ManyToOne(() => UserTypeOrm, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "deciderId" })
  decider: Relation<UserTypeOrm>;

  @Column({ type: "timestamptz" })
  dueDate: Date;

  @Column({ type: "boolean", default: false })
  decided: boolean;

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
    props: OwnProperties<DecisionProposalTypeOrm> &
      Pick<DecisionProposalTypeOrm, "options">
  ): DecisionProposalTypeOrm {
    return Object.assign<
      DecisionProposalTypeOrm,
      OwnProperties<DecisionProposalTypeOrm>
    >(new DecisionProposalTypeOrm(), props);
  }
}
