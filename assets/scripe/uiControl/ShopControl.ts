const { ccclass, property } = cc._decorator;

import GameControl from './GameControl';
import ShopItemControl from './ShopItemControl';

@ccclass
export default class NewClass extends cc.Component {
	mGame: GameControl


	@property(cc.Prefab)
	myPrefab: cc.Prefab = null;

	@property(cc.Layout)
	mLayout: cc.Layout = null;

	mControlList: Map<number, ShopItemControl> = new Map<number, ShopItemControl>();

	init(game: GameControl) {
		console.log("ShopControl init");
		this.mGame = game;
		var childs = this.mLayout.node.getComponentsInChildren(ShopItemControl);
		if (childs != null && childs.length > 0) {
			childs.forEach((value, key) => {
				value.reset();
			});
		}
		var loadobj = null;
		var control: ShopItemControl  = null;
		var keyTmp = 0;
		this.mControlList.clear();
		if (childs != null && childs.length > 0) {
			loadobj = childs[0].node;
			control = childs[0];
		} else {
			loadobj = cc.instantiate(this.myPrefab);
			this.mLayout.node.addChild(loadobj);
			control = loadobj.getComponent(ShopItemControl);			
		}
		this.getid(1, control);
		this.mControlList.set(control.mId, control);

		var loadobj2 = null;
		var control2: ShopItemControl = null;
		if (childs != null && childs.length >=2) {
			loadobj2 = childs[1].node;
			control2 = childs[1];
		} else {
			loadobj2 = cc.instantiate(this.myPrefab);
			this.mLayout.node.addChild(loadobj2);
			control2 = loadobj2.getComponent(ShopItemControl);
		}
		this.getid(2, control2);
		this.mControlList.set(control2.mId, control2);

	}

	getid(type: number, control: ShopItemControl) {
		var maxId = 0;
		var back = 0;
		var had = this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map);
		if (had.buy == null || had.buy.length == 0) {
			maxId = 0;
		} else {
			var buy = had.buy.split(",");
			buy.forEach((value, inde) => {
				var tmp = Number(value);
				if (this.mGame.mUserInfo.mShopItem.get(tmp).costtype == type) {
					if (tmp > maxId) {
						maxId = tmp;
					}
				}
			});
		}
		this.mGame.mUserInfo.mShopItem.forEach((value, key) => {
			if (value.costtype == type) {
				if (key > maxId) {
					if (back == 0) {
						back = key;
					} else if(key < back){
						back = key;
					}
				}
			}
		});
		var isHaveNext = true;
		if (back == 0) {
			back = maxId;
			isHaveNext = false;
		}
		control.init(this.mGame, back,isHaveNext);
	}
	show() {
		this.mGame.isShowShop = true;
		this.mControlList.forEach((value, key) => {
			value.updateValue();
		});
		this.node.setScale(1, 1);
	}
	disShow() {
		this.mGame.isShowShop = false;
		this.node.setScale(0, 0);
	}
}
