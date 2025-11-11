export function classifySmtpError(err: any): {
  permanent: boolean;
  reason: string;
} {
  const code = Number(err?.responseCode);
  const msg = String(err?.message || err?.response || '');
  const permanentCodes = [550, 551, 552, 553, 554];

  const permanent =
    (code && permanentCodes.includes(code)) ||
    /user unknown|mailbox unavailable|invalid recipient|no such user/i.test(
      msg,
    );

  return { permanent, reason: msg || `SMTP_${code || 'unknown'}` };
}
