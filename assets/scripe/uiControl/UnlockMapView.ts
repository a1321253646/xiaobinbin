const {ccclass, property} = cc._decorator;
import GameControl from './GameControl';
import HaveMapInfo from '../bean/HaveMapInfo';
import RequiteAddMap from '../bean/RequiteAddMap';
import RequiteBuy from '../bean/RequiteBuy';
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
			var str = this.mGame.mUserInfo.mString.get(1000026);
			str = str.replace("&n", this.mGame.mUserInfo.mString.get(this.mGame.mUserInfo.mapInfo.get(id).name));
			this.mTitle.string = str;
			this.mLockIm.node.setScale(0, 0);
			this.mButton.setScale(1, 1);
		} else {
			this.mIconRoot.setScale(0, 0);
			var str = this.mGame.mUserInfo.mString.get(1000027);
			str = str.replace("&n1", this.mGame.mUserInfo.mString.get(this.mGame.mUserInfo.mapInfo.get(preMapId).name) );
			str = str.replace("&n2", this.mGame.mUserInfo.mString.get(this.mGame.mUserInfo.mapInfo.get(id).name));
			this.mTitle.string = str;
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

		this.mGame.mUserInfo.money -= this.mGame.mUserInfo.mapInfo.get(this.mId).cost;
		this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).cost += this.mGame.mUserInfo.mapInfo.get(this.mId).cost;

		var req = new RequiteBuy();
		req.type = 4;
		req.mapid = this.mGame.mUserInfo.current_map;
		req.allMoney = this.mGame.mUserInfo.money + "";
		req.allZichang = this.mGame.mUserInfo.zichang + "";
		req.histroy = this.mGame.mUserInfo.history + "";
		req.mapCreat = this.mGame.mUserInfo.mHaveMap.get(req.mapid).creat + "";
		req.mapCost = this.mGame.mUserInfo.mHaveMap.get(req.mapid).cost + "";
		req.user = this.mGame.usrId;
		req.buyMapId = this.mId;
		req.zibenbeilv = this.mGame.mUserInfo.mHaveMap.get(req.mapid).zibenbeilv + "";
		req.moneybeilv = this.mGame.mUserInfo.mHaveMap.get(req.mapid).moneybeilv + "";
		req.timebeilv = this.mGame.mUserInfo.mHaveMap.get(req.mapid).timebeilv + "";
		HttpUtil.map("buy", req);

	}
}
