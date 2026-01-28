import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";

import {
  OwnProperties,
  PersistenceEntity,
} from "src/common/persistence-entity";
import { UserTypeOrm } from "src/users/infrastructure/persistence/typeorm/models/user.typeorm";
import { DecisionProposalTypeOrm } from "src/decision-proposals/infrastructure/persistence/typeorm/models/decision-proposal.typeorm";
import { DecisionProposalOptionTypeOrm } from "src/decision-proposals/infrastructure/persistence/typeorm/models/decision-proposal-option.typeorm";

@Entity("decision")
export class DecisionTypeOrm extends PersistenceEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", unique: true })
  proposalId: string;

  @ManyToOne(() => DecisionProposalTypeOrm, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "proposalId" })
  proposal: Relation<DecisionProposalTypeOrm>;

  @Column({ type: "uuid" })
  selectedOptionId: string;

  @ManyToOne(() => DecisionProposalOptionTypeOrm, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "selectedOptionId" })
  selectedOption: Relation<DecisionProposalOptionTypeOrm>;

  @Column({ type: "uuid" })
  decidedByUserId: string;

  @ManyToOne(() => UserTypeOrm, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "decidedByUserId" })
  decidedBy: Relation<UserTypeOrm>;

  @Column({ type: "text", nullable: true })
  rationale: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static build(props: OwnProperties<DecisionTypeOrm>): DecisionTypeOrm {
    return Object.assign<DecisionTypeOrm, Partial<DecisionTypeOrm>>(
      new DecisionTypeOrm(),
      props
    );
  }
}
