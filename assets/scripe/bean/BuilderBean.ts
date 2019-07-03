const { ccclass, property } = cc._decorator;

@ccclass
export default class BuilderBean {
	level = 0;
	eachAddMoney = "";
	addMoneyTime = 0;
	sprite = "defule";
	time_pre = 0.0;
	money_pre = 0.0;
	levelCost = "";
	id = 0;
	nextSkill = 0;
}