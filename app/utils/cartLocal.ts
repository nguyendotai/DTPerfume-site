export function getLocalCart() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function addToLocalCart(variant_id: number, quantity = 1) {
  const cart = getLocalCart();
  const exist = cart.find((i: any) => i.variant_id === variant_id);

  if (exist) {
    exist.quantity += quantity;
  } else {
    cart.push({ variant_id, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearLocalCart() {
  localStorage.removeItem("cart");
}

export function getLocalCartCount() {
  return getLocalCart().reduce(
    (sum: number, i: any) => sum + i.quantity,
    0
  );
}
