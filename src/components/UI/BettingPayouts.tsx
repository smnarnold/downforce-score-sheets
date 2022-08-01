import { formatMoney } from '../helpers';
import styled from "styled-components";

const StyledBettingPayouts = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 50%;
    padding: var(--spacer);
    margin: 0;
  }

  table {
    position: relative;
    width: 100%;
  }

  tbody {
    position: relative;
    width: 100%;
  }

  tr {
    width: 100%;
    text-align: center;
  }

  td {
    border: solid 1px var(--grey-light);
    border-collapse: collapse;
  }

  .pos {
    flex: 0 1 25%;
  }

  .price {
    flex: 1 1 75%;
    text-align: center;
  }
`;

interface BettingPayoutsProps {
  arr: any[];
  title: string;
}

interface PayoutObj {
  label: string;
  value: number;
}

function BettingPayouts({ arr = [], title = "" }: BettingPayoutsProps) {
  const rows = arr.map((payout: PayoutObj) => {
    return (
      <tr key={payout.label}>
        <td className="pos">{payout.label}</td>
        <td className="price">{formatMoney(payout.value)}</td>
      </tr>
    );
  });

  return (
    <StyledBettingPayouts>
      <h3 className="title">{title}</h3>
      <table>
        <tbody>{rows}</tbody>
      </table>
    </StyledBettingPayouts>
  );
}

export default BettingPayouts;