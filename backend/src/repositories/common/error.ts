export class NonexistentRecordError extends Error {} // 404

export class DeletedRecordError extends Error {} // 404

export class WrongOwnershipError extends Error {} // 403

export class UnauthorizedError extends Error {} // 401

export class AlreadyVerified extends Error {} // 400

export class RoleError extends Error {} // 400

export class TechnicianNotVerifiedError extends Error {} // 403

export class AlreadyAssigned extends Error {} // 403
