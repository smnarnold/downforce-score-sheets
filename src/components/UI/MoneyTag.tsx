import formatMoney from "../../helpers/formatMoney";
import styled from "styled-components";

const StyledMoneyTag = styled.strong`
    background-color: var(--black);
    color: #fff;
    font-weight: bold;
    font-style: normal;
    padding: 0.25em 0.5em;
    margin-left: 0.5em;
`;

function MoneyTag({ amount }: { amount: number }) {
    return <StyledMoneyTag className="money-tag">{formatMoney(amount)}</StyledMoneyTag>;
}

export default MoneyTag;