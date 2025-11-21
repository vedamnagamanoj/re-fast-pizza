export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "INR",
  }).format(amount / 100);
}

type MonthType = Intl.DateTimeFormatOptions["month"];

export function formatDate(dateStr: string | Date, monthType: MonthType = "short") {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: monthType,
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function calcMinutesLeft(dateStr: Date | string): number {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / (60 * 1000));
}

export function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// export const generateOrderId = () => {
//   const timeStamp = Date.now();
//   const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();

//   return `RFP${timeStamp}${randomPart}`;
// };

export const getEstimatedDelivery = (
  items: number,
  isPriority: boolean = false,
): Date => {
  const minutesPerItem = isPriority ? 5 : 10;
  const deliveryTime = items * minutesPerItem * 60 * 1000;

  return new Date(Date.now() + deliveryTime);
};
