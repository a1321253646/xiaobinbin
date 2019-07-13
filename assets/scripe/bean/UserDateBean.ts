const { ccclass, property } = cc._decorator;
import MapInfo from "./MapInfo"
import MapBuilderInfo from "./MapBuilderInfo"
import BuilderJsonInfo from "./BuilderJsonInfo"
import BuilderStatusBean from "./BuilderStatusBean"
import HaveMapInfo from "./HaveMapInfo"
import ShopItemInfoBean from "./ShopItemInfoBean"
@ccclass
export default class UserDateBean {
	money = 0;
	each_money = 0;
	zichang = 0;
	zuanshi = 0;
	current_map = 0;
	leave_time = 0;
	history = 0;

	mapInfo: Map<number, MapInfo> = new Map<number, MapInfo>();
	mapBuilderInfo: Map<number, MapBuilderInfo> = new Map<number, MapBuilderInfo>();
	mapBuilderLevelInfo: Map<number, Map<number, BuilderJsonInfo>> = new Map<number, Map<number, BuilderJsonInfo>>();
	mapBuilderStatus: Map<number, BuilderStatusBean> = new Map<number, BuilderStatusBean>();
	mHaveMap: Map<number, HaveMapInfo> = new Map<number, HaveMapInfo>();
	mShopItem: Map<number, ShopItemInfoBean> = new Map<number,ShopItemInfoBean>();

}