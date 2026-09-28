export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePhone(phone) {
  const re = /^(\+92|0)?[0-9]{10}$/
  return re.test(phone.replace(/[\s-]/g, ''))
}

export function validateRequired(value) {
  return value && value.trim().length > 0
}

export function validateMinLength(value, min) {
  return value && value.trim().length >= min
}
