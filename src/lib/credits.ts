import { createAdminClient } from './supabase/admin';

// Admin emails with permanent unlimited video generation privileges
const ADMIN_EMAILS = [
  'chijiokejackson35@gmail.com',
  ...(process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase()) : [])
];

export interface CreditStatus {
  isUnlimited: boolean;
  credits: number;
  email?: string;
  userId?: string;
  role: 'admin' | 'user' | 'api';
}

/**
 * Checks whether a user or API request has unlimited video creation access.
 */
export function isUnlimitedAccess(email?: string | null, isApiRequest?: boolean): boolean {
  if (isApiRequest) return true;
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * Retrieves the live credit balance and status for a user.
 */
export async function getCreditStatus(user: { id?: string; email?: string; user_metadata?: any } | null, isApiRequest = false): Promise<CreditStatus> {
  if (isApiRequest) {
    return {
      isUnlimited: true,
      credits: 999999,
      role: 'api'
    };
  }

  if (!user || !user.email) {
    // Local / unauthenticated fallback
    return {
      isUnlimited: true, // Default local dev mode
      credits: 999999,
      role: 'admin'
    };
  }

  const email = user.email.toLowerCase();
  const isSuperAdmin = ADMIN_EMAILS.includes(email);

  if (isSuperAdmin) {
    return {
      isUnlimited: true,
      credits: 999999,
      email: user.email,
      userId: user.id,
      role: 'admin'
    };
  }

  const currentCredits = typeof user.user_metadata?.credits === 'number' 
    ? user.user_metadata.credits 
    : 1;

  return {
    isUnlimited: false,
    credits: currentCredits,
    email: user.email,
    userId: user.id,
    role: 'user'
  };
}

/**
 * Deducts 1 video credit from a standard user upon generation dispatch.
 * Admin users and API calls bypass deduction automatically.
 */
export async function deductCreditIfRequired(user: { id?: string; email?: string; user_metadata?: any } | null, isApiRequest = false): Promise<{ success: boolean; remainingCredits: number; message?: string }> {
  if (isApiRequest) {
    return { success: true, remainingCredits: 999999, message: 'API unlimited access' };
  }

  if (!user || !user.email) {
    return {
      success: false,
      remainingCredits: 0,
      message: 'Authentication required. Please log in to use video credits.'
    };
  }

  const email = user.email.toLowerCase();
  if (isUnlimitedAccess(email)) {
    return {
      success: true,
      remainingCredits: 999999,
      message: 'Admin unlimited access'
    };
  }

  try {
    const supabase = createAdminClient();
    let currentCredits = 1;
    let existingMeta = {};

    if (user.id) {
      const { data: userData, error: fetchErr } = await supabase.auth.admin.getUserById(user.id);
      if (!fetchErr && userData?.user) {
        existingMeta = userData.user.user_metadata || {};
        currentCredits = typeof userData.user.user_metadata?.credits === 'number'
          ? userData.user.user_metadata.credits
          : 1;
      }
    } else if (typeof user.user_metadata?.credits === 'number') {
      currentCredits = user.user_metadata.credits;
      existingMeta = user.user_metadata;
    }

    if (currentCredits <= 0) {
      return {
        success: false,
        remainingCredits: 0,
        message: 'You have 0 credits remaining. Please purchase or add more credits to generate videos.'
      };
    }

    const newCredits = Math.max(0, currentCredits - 1);

    if (user.id) {
      await supabase.auth.admin.updateUserById(user.id, {
        user_metadata: {
          ...existingMeta,
          credits: newCredits
        }
      });
    }

    console.log(`[Credits] Deducted 1 credit for ${email}. Remaining: ${newCredits}`);

    return {
      success: true,
      remainingCredits: newCredits
    };
  } catch (err: any) {
    console.error('Credit deduction error:', err);
    return { success: true, remainingCredits: 0 };
  }
}
