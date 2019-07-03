const { ccclass, property } = cc._decorator;
import BuilderStatusBean from "./BuilderStatusBean"
@ccclass
export default class RequiteBuilderStatusBean {
	allmoney = "";
	id = 0;
	level = 0;
	time_pre = 1;
	money_pre = 1;
	eachmoney = "";
	lastime = 0;
	isAuto = 0;

	copy(pa: BuilderStatusBean) {
		this.allmoney = "" + pa.allmoney;
		this.id = pa.id;
		this.level = pa.level;
		this.time_pre = pa.time_pre;
		this.money_pre = pa.money_pre;
		this.eachmoney = "" + pa.eachmoney;
		this.lastime = pa.lastime;
		this.isAuto = pa.auto;
	}
}