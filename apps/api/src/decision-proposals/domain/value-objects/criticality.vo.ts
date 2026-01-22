export enum CriticalityLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export class Criticality {
  constructor(private readonly value: CriticalityLevel) {
    if (!Object.values(CriticalityLevel).includes(value as CriticalityLevel)) {
      throw new Error(`Invalid criticality level: ${value}`);
    }
  }

  static create(value: string): Criticality {
    return new Criticality(value as CriticalityLevel);
  }

  static get low(): Criticality {
    return new Criticality(CriticalityLevel.LOW);
  }

  static get medium(): Criticality {
    return new Criticality(CriticalityLevel.MEDIUM);
  }

  static get high(): Criticality {
    return new Criticality(CriticalityLevel.HIGH);
  }

  static get critical(): Criticality {
    return new Criticality(CriticalityLevel.CRITICAL);
  }

  getValue(): CriticalityLevel {
    return this.value;
  }

  equals(other: Criticality): boolean {
    return this.value === other.value;
  }

  isUrgent(): boolean {
    return (
      this.value === CriticalityLevel.HIGH ||
      this.value === CriticalityLevel.CRITICAL
    );
  }

  isMoreUrgentThan(other: Criticality): boolean {
    const levels = [
      CriticalityLevel.LOW,
      CriticalityLevel.MEDIUM,
      CriticalityLevel.HIGH,
      CriticalityLevel.CRITICAL,
    ];

    return levels.indexOf(this.value) > levels.indexOf(other.getValue());
  }
}
