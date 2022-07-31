import { formatMoney } from "../helpers";
import styled from "styled-components";

const StyledMoneyTag = styled.strong`
    background-color: var(--black);
    color: #fff;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    font-style: normal;
    min-width: 4em;
    padding: 0.25em 0.5em;
    margin-left: 0.5em;
`;

function MoneyTag({ amount }: { amount: number }) {
    return <StyledMoneyTag>{formatMoney(amount)}</StyledMoneyTag>;
}

export default MoneyTag;