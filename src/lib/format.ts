/** Fixed locale so server and client render the same string (avoids hydration mismatch). */
export function formatNumber(value: number): string {
  return value.toLocaleString("en-US")
}

export function formatCurrency(value: number): string {
  return `₹${formatNumber(value)}`
}
