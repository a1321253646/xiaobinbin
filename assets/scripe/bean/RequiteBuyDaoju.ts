const { ccclass, property } = cc._decorator;
import BuilderStatusBean from "../bean/BuilderStatusBean"
@ccclass
export default class RequiteBuy {
	//1 Ϊ������ 2Ϊ��������  3 ������� 4 Ϊ�����ͼ 5Ϊ��ֵ���� 6 Ϊ������
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