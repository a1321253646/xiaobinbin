const { ccclass, property } = cc._decorator;
import RequiteBuilderStatusBean from "../bean/RequiteBuilderStatusBean"
@ccclass
export default class RequiteBuy {
	//1 Ϊ������ 2Ϊ��������  3 ������� 4 Ϊ�����ͼ 5Ϊ��ֵ���� 6 Ϊ������
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