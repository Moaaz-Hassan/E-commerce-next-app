export function currencyFormat(num : number|undefined){
  return new Intl.NumberFormat("en-us" , {
    style : "currency" ,
    currency : "EGP"
  }).format(num ?? 0)
}