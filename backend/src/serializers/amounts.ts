import {CURRENCIES} from "../lib/constants";

export function amount_formatted(currency: string, amount: number) {

    let formattedAmount = `${CURRENCIES[currency].symbol}${amount}`;

    return formattedAmount;
}
