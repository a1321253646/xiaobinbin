const {ccclass, property} = cc._decorator;
import GameControl from './GameControl';
import HaveMapInfo from '../bean/HaveMapInfo';
import RequiteAddMap from '../bean/RequiteAddMap';
import NumberToString from '../ultis/NumberToString';
import HttpUtil from '../ultis/HttpUtil';

@ccclass
export default class NewClass extends cc.Component {

	mGame: GameControl;
	mId: number;
	@property(cc.Node)
	mIconRoot: cc.Node = null;

	@property(cc.Label)
	mIconTx: cc.Label = null;

	@property(cc.Label)
	mTitle: cc.Label = null;

	@property(cc.Sprite)
	mLockIm: cc.Sprite = null;

	@property(cc.Node)
	mButton: cc.Node = null;

	@property(cc.Node)
	mBack: cc.Node = null;

	start() {
		this.mBack.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
	}

	touchStart(event) {
		this.dishow();
	}


	show(game: GameControl, id: number) {
		this.mGame = game;
		this.mId = id;
		var preMap = 0;
		var preMapId = 0;
		this.mGame.mUserInfo.mapInfo.forEach((value, key)=>{
			if (key == id) {
				preMapId = preMap;
			} else {
				preMap = key;
			}
		});

		var getmap = this.mGame.mUserInfo.mHaveMap.get(preMapId);
		var lock = true;
		if (getmap) {
			if (getmap.unlock == 1) {
				lock = false;
			}
		}

		if (!lock) {
			this.mIconRoot.setScale(1, 1);
			var cost = Number(this.mGame.mUserInfo.mapInfo.get(id).cost);
			this.mIconTx.node.setScale(1, 1);
			this.mIconTx.string = NumberToString.numberToString(cost);
			this.mTitle.string = "进军" + this.mGame.mUserInfo.mapInfo.get(id).name + ",需要消耗考察费用:";
			this.mLockIm.node.setScale(0, 0);
			this.mButton.setScale(1, 1);
		} else {
			this.mIconRoot.setScale(0, 0);
			this.mTitle.string = "收购" + this.mGame.mUserInfo.mapInfo.get(preMapId).name + ",才可进军" + this.mGame.mUserInfo.mapInfo.get(id).name;
			this.mLockIm.node.setScale(1, 1);
			this.mButton.setScale(0, 0);
		}
		this.node.setScale(1, 1);
	}
	dishow() {
		this.node.setScale(0,0)
	}
	sure() {
		this.mGame.showChange();
		var bean = new RequiteAddMap();
		bean.user = this.mGame.usrId;
		bean.cost = this.mGame.mUserInfo.mapInfo.get(this.mId).cost + "";
		bean.mapid = this.mId;
		bean.isnew = 1;
		HttpUtil.addMap("addmap", bean);

	}
}
