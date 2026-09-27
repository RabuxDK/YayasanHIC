/**
 * Folder: src/services/
 * Description: Formatting and WhatsApp helpers used by components. CMS content is read via rabuxCms.ts.
 * This file: cms.ts
 */

/**
 * Format numeric amount into standard Indonesian Rupiah currency string.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Build a sanitized WhatsApp click-to-chat URL with pre-filled message.
 */
export function buildWhatsAppUrl(phone: string = '', message: string = ''): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const normalizedPhone = cleanPhone.startsWith('0')
    ? '62' + cleanPhone.slice(1)
    : cleanPhone;

  const encodedMsg = encodeURIComponent(message.trim());
  return `https://wa.me/${normalizedPhone}${encodedMsg ? `?text=${encodedMsg}` : ''}`;
}
