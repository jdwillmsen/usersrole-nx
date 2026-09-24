import { isSignupAllowed } from './signup-allowlist';

describe('isSignupAllowed', () => {
  it('rejects everyone when the list is empty', () => {
    expect(isSignupAllowed('ada@example.com', '')).toBe(false);
    expect(isSignupAllowed('ada@example.com', ' , ')).toBe(false);
  });

  it('rejects a missing email', () => {
    expect(isSignupAllowed(undefined, '@example.com')).toBe(false);
    expect(isSignupAllowed('', '@example.com')).toBe(false);
  });

  it('matches exact addresses case-insensitively', () => {
    const list = 'ada@example.com, grace@example.org';
    expect(isSignupAllowed('Ada@Example.com', list)).toBe(true);
    expect(isSignupAllowed('grace@example.org', list)).toBe(true);
    expect(isSignupAllowed('alan@example.com', list)).toBe(false);
  });

  it('matches a whole domain but not a lookalike one', () => {
    const list = '@example.com';
    expect(isSignupAllowed('anyone@example.com', list)).toBe(true);
    expect(isSignupAllowed('anyone@notexample.com', list)).toBe(false);
    expect(isSignupAllowed('anyone@example.com.evil.test', list)).toBe(false);
  });
});
