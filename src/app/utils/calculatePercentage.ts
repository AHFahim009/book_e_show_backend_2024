


export const calculatePercentage = (currentMonth: number, previousMonth: number) => {
  if (previousMonth === 0) return currentMonth * 100
  const result = (currentMonth / previousMonth) * 100

  return Number(result)

}