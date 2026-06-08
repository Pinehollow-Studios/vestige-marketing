import "server-only";
import { render } from "@react-email/render";
import WelcomeEmail from "@/emails/welcome";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Transactional email sends. Renders a React Email template to HTML + text at
 * call time and posts it to Resend. Self-contained error handling: a failed
 * send is logged but never thrown, so it can't break the signup it follows.
 */

const RESEND_API = "https://api.resend.com";
// Cloudflare fronts api.resend.com and 403s bot-like User-Agents. (See resend.ts.)
const USER_AGENT = "vestige-marketing/1.0 (+https://vestige.golf)";

export async function sendWelcomeEmail(email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // dev/no-key: silently skip

  try {
    const [html, text] = await Promise.all([
      render(<WelcomeEmail />),
      render(<WelcomeEmail />, { plainText: true }),
    ]);

    const res = await fetch(`${RESEND_API}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "User-Agent": USER_AGENT,
      },
      body: JSON.stringify({
        from: `${siteConfig.brandName} <hello@${siteConfig.domain}>`,
        to: email,
        reply_to: siteConfig.contactEmail,
        subject: `You're on the list — welcome to ${siteConfig.brandName}`,
        html,
        text,
        headers: {
          "List-Unsubscribe": `<mailto:${siteConfig.contactEmail}?subject=Unsubscribe>`,
        },
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[welcome-email:error]", res.status, body);
    }
  } catch (err) {
    console.error("[welcome-email:exception]", err);
  }
}
