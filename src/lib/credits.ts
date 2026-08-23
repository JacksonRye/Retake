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
export async function deductCreditIfRequired(user: { id: string; email: string; user_metadata?: any } | null, isApiRequest = false): Promise<{ success: boolean; remainingCredits: number; message?: string }> {
  if (isApiRequest) {
    return { success: true, remainingCredits: 999999, message: 'API unlimited access' };
  }

  if (!user || !user.id || !user.email) {
    // In local dev without session, allow pass-through
    return { success: true, remainingCredits: 999999, message: 'Local dev pass-through' };
  }

  const email = user.email.toLowerCase();
  if (ADMIN_EMAILS.includes(email)) {
    return { success: true, remainingCredits: 999999, message: 'Admin unlimited pass-through' };
  }

  const supabase = createAdminClient();
  const currentCredits = typeof user.user_metadata?.credits === 'number' 
    ? user.user_metadata.credits 
    : 1;

  if (currentCredits <= 0) {
    return {
      success: false,
      remainingCredits: 0,
      message: 'You have 0 credits remaining. Please upgrade or purchase more credits.'
    };
  }

  const newCredits = currentCredits - 1;

  // Atomically update user metadata in Supabase
  const { error } = await supabase.auth.admin.updateUserById(user.id, {
    user_metadata: {
      ...user.user_metadata,
      credits: newCredits
    }
  });

  if (error) {
    console.error('[Credit Deduction Error]:', error);
    return {
      success: false,
      remainingCredits: currentCredits,
      message: `Failed to deduct credit: ${error.message}`
    };
  }

  console.log(`[Credits] Deducted 1 credit for ${email}. Remaining: ${newCredits}`);

  return {
    success: true,
    remainingCredits: newCredits
  };
}
