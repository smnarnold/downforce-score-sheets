import formatMoney from "../../../helpers/formatMoney";
import './MoneyTag.scss';

function MoneyTag({ amount }) {
    return <strong className="money-tag">{formatMoney(amount)}</strong>;
}

export default MoneyTag;