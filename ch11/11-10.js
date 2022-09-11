export function charge(customer, usage, provider) {
 const baseCharge = customer.baseCharge * usage;
 return baseCharge + provider.connectionCharge;
}
