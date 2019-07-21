const { ccclass, property } = cc._decorator;
import RequiteBuilderStatusBean from "../bean/RequiteBuilderStatusBean"
@ccclass
export default class RequiteBuy {
	//1 为购买建筑 2为升级建筑  3 购买道具 4 为购买地图 5为数值更新 6 为购买宝箱
	type = 0;
	mapid = 0;
	allMoney = "";
	allZichang = "";
	histroy = "";
	mapCreat = "";
	mapCost = "";
	user = "";
	builderInfo: RequiteBuilderStatusBean = null;
	daojuInfo = "";
	buyMapId = 0;
	unlock = 0;
	zibenbeilv = "";
	moneybeilv = "";
	timebeilv = "";
}