export function formatAdress([city, street, house, flat]: string[]) {
  return `г. ${city}, ул. ${street}, д. ${house}, кв. ${flat}`;
}
//деструктуризация
