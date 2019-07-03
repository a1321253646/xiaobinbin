const { ccclass, property } = cc._decorator;
import RequitAddMoneyItem from "./RequitAddMoneyItem"
@ccclass
export default class RequiteAddMoney {
	user = "";
	data: Array<RequitAddMoneyItem> = new Array<RequitAddMoneyItem>();
}