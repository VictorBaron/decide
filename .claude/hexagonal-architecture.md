# Hexagonal Architecure

This is an hexagonal architecture styled project.

## Module structure

/[module_name]
├── /application/ # Core documentation
├── use-cases/
├── [usecase-name]/
├── [usecase-name].controller.ts
├── [usecase-name].usecase.ts
└── [usecase-name].test.ts
├── /event-handlers
├── /ports
├── /queries
└── /services
├── /domain
├── /errors
├── /events
└── /model
└── /infrastructure

## Constraints

Every use case should be represented as an interface in the /app/port/driving folder.

Use case implementations should be in the /app/service folder.

Make sure, at all costs, not to leak any framework or library classes details into the port and service folders.
