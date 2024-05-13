import dayjs from 'dayjs'

export const billListData = {
  expense: [
    {
      type: 'foods',
      list: [
        { type: 'food' },
        { type: 'drinks' },
        { type: 'dessert' },
      ],
    },
    {
      type: 'taxi',
      list: [
        { type: 'taxi' },
        { type: 'longdistance' },
      ],
    },
    {
      type: 'recreation',
      list: [
        { type: 'bodybuilding' },
        { type: 'game' },
        { type: 'audio' },
        { type: 'travel' },
      ],
    },
    {
      type: 'daily',
      list: [
        { type: 'clothes' },
        { type: 'bag' },
        { type: 'book' },
        { type: 'promote' },
        { type: 'home' },
      ],
    },
    {
      type: 'other',
      list: [{ type: 'community' }],
    },
  ],
  income: [
    {
      type: 'professional',
      list: [
        { type: 'salary' },
        { type: 'overtimepay' },
        { type: 'bonus' },
      ],
    },
    {
      type: 'other',
      list: [
        { type: 'financial' },
        { type: 'cashgift' },
      ],
    },
  ],
}

export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
  billListData[key].forEach(bill => {
    bill.list.forEach(item => {
      prev[item.type] = item.name
    })
  })
  return prev
}, {})

export const getOverview = (data = []) => {
  return data.reduce(
    (prev, item) => {
      return {
        ...prev,
        date: item.date,
        [item.type]: prev[item.type] + +item.money,
      }
    },
    { pay: 0, income: 0, date: null }
  )
}

export const getMonthOverview = (data, month) => {
  // There may be multiple bills for a certain month
  const bill = data.filter(item => {
    return month === dayjs(item.date).get('month')
  })
  return getOverview(bill)
}
