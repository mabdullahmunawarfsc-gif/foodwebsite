export function formatPrice(price) {
  return `Rs. ${price.toLocaleString('en-PK')}`
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function generateOrderNumber() {
  return `FH${Date.now().toString().slice(-8)}`
}
