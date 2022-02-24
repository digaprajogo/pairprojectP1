function formatDate(value) {
  let formatted
  let year = `${value.getFullYear()}`
  let month = `${value.getMonth() + 1}`
  let date = `${value.getDate()}`

  if (month.length === 1) {
    month = `0${month}`
  }
  if (date.length === 1) {
    date = `0${date}`
  }
  formatted = `${year}-${month}-${date}`
  return formatted
}

module.exports = formatDate