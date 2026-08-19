export const CONSENT_BANNER_MINIMIZE_AFTER_MS = 5_000;

export function shouldMinimizeConsentBanner(args: {
  hasStoredPreferences: boolean;
  isOpen: boolean;
  isCustomizing: boolean;
  hasInteracted: boolean;
}) {
  return (
    !args.hasStoredPreferences &&
    args.isOpen &&
    !args.isCustomizing &&
    !args.hasInteracted
  );
}
