import { areDatesEqual, getToday, isToday, toDate } from "./date"

describe("toDate", () => {
  test("should parse date string to DateObject", () => {
    const date = toDate("14/1")
    expect(date).toEqual({ day: 14, month: 1 })
  })

  test("should throw error for invalid date format", () => {
    expect(() => toDate("14-1")).toThrow("Invalid date format: 14-1")
  })

  test("should throw error for invalid day", () => {
    expect(() => toDate("32/1")).toThrow("Invalid day: 32")
  })

  test("should throw error for invalid month", () => {
    expect(() => toDate("14/13")).toThrow("Invalid month: 13")
  })
})

describe("getToday", () => {
  test("should return today's date", () => {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth() + 1
    expect(getToday()).toEqual({ day, month })
  })
})

describe("isToday", () => {
  test("should return true for same dates", () => {
    const today = getToday()
    expect(isToday(today)).toBe(true)
  })

  test("should return false for different dates", () => {
    const tomorrow = getToday()
    tomorrow.day++
    expect(isToday(tomorrow)).toBe(false)
  })
})

describe("areDatesEqual", () => {
  test("should return true for same dates", () => {
    const date = { day: 14, month: 1 }
    expect(areDatesEqual(date, date)).toBe(true)
  })

  test("should return false for different dates", () => {
    const date1 = { day: 14, month: 1 }
    const date2 = { day: 15, month: 1 }
    expect(areDatesEqual(date1, date2)).toBe(false)
  })
})
