const { ccclass, property } = cc._decorator;
import BuilderStatusBean from "../bean/BuilderStatusBean"
@ccclass
export default class RequiteBuy {
	//1 为购买建筑 2为升级建筑  3 购买道具 4 为购买地图 5为数值更新 6 为购买宝箱
	type = 0;
	mapid = 0;
	allMoney = 0;
	allZichang = 0;
	histroy = 0;
	mapCreat = 0;
	mapCost = 0;
	user = "";
	builderInfo: BuilderStatusBean = null;
	daojuInfo = "";
	buyMapId = 0;
	unlock = 0;

}