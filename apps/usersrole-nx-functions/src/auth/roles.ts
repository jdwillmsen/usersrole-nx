// A role claim carries privilege, so promotion has to be gated on who is
// asking, not on which record is being touched. Kept free of the shared Role
// type on purpose: it reads res.locals.roles, which is whatever the verified
// ID token carried, so the guard must hold for any shape, not only well-typed
// arrays.
export function isAdmin(roles: unknown): boolean {
  return Array.isArray(roles) && roles.includes('admin');
}
