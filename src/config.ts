export const FREE_QUOTA = {
  maxEventsPerMonth: 100,
  maxEventCategories: 3,
} as const

export const PRO_QUOTA = {
  maxEventsPerMonth: 10000,
  maxEventCategories: 100,
} as const