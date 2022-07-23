import formatMoney from '../../helpers/formatMoney';
import './BettingPayouts.scss'

export default function BettingPayouts({ arr = [], title = "" }) {
  const pfx = "betting-payouts";
  const rows = arr.map((payout) => {
    return (
      <tr key={payout.label} className={`${pfx}__row`}>
        <td className={`${pfx}__pos`}>{payout.label}</td>
        <td className={`${pfx}__price`}>{formatMoney(payout.value)}</td>
      </tr>
    );
  });

  return (
    <div className={pfx}>
      <h3 className={`${pfx}__title`}>{title}</h3>
      <table className={`${pfx}__table`}>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}