// Formats a numeric value into an INR currency string (e.g., ₹1,250.00).
export const formatNumberToPrice = (amount: number, decimal = 2): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: decimal,
  }).format(amount);
};
