import GameControl from "./GameControl";
import BuilderListControl from "./BuilderListControl";
import ShopControl from "./ShopControl";
import RequiteBuy from "../bean/RequiteBuy";
import HttpUtil from "../ultis/HttpUtil";


const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
	@property(cc.Node)
	mAll: cc.Node = null;
	@property(cc.Node)
	mUp: cc.Node = null;
	@property(cc.Node)
	mDown: cc.Node = null;
	@property(cc.Node)
	mLeft: cc.Node = null;
	@property(cc.Node)
	mRight: cc.Node = null;
	@property(cc.Node)
	mText: cc.Node = null;
	@property(cc.RichText)
	mStr: cc.RichText = null;
	@property(cc.Node)
	mGuideEnd: cc.Node = null;
	@property(cc.Sprite)
	mPoint: cc.Sprite = null;
	@property(cc.Label)
	mTip: cc.Label = null;
    // LIFE-CYCLE CALLBACKS:

	isInit = false;
	mGame: GameControl;
	isShow = false;
	nGuideIndex = 0;


	show(x: number, y: number, w: number, h: number, text: string, type: number, point: number) {//type:1234 上下左右 5678 左上 右上 左下 右下 point:1 右下角2 上3下4右
		this.mGame.mOutLineControl.close();

		if (h != 0 && w != 0) {
			this.mUp.setContentSize(720, 1280 / 2 - (y + h / 2));
			this.mDown.setContentSize(720, 1280 / 2 + (y - h / 2));
			this.mLeft.setContentSize(720 / 2 + (x - w / 2), h);
			this.mRight.setContentSize(720 / 2 - (x + w / 2), h);

			this.mUp.setPosition(0, y + h / 2);
			this.mDown.setPosition(0, y - h / 2);
			this.mLeft.setPosition(x - w / 2, y);
			this.mRight.setPosition(x + w / 2, y);


		} else {
			this.mUp.setContentSize(0, 0);
			this.mDown.setContentSize(0, 0);
			this.mLeft.setContentSize(0 , 0);
			this.mRight.setContentSize(0, 0);
		}

		if (type != 0) {
			if (type == 1) {
				this.mText.setPosition(x, y + h / 2 + this.mText.getContentSize().height / 2);
			}
			else if (type == 2) {

				this.mText.setPosition(x, y - h / 2 - this.mText.getContentSize().height / 2);
			}
			else if (type == 3) {

				this.mText.setPosition(x - w / 2 - this.mText.getContentSize().width / 2, y);
			}
			else if (type == 4) {

				this.mText.setPosition(x + w / 2 + this.mText.getContentSize().width / 2, y);
			}
			else if (type == 5) {

				this.mText.setPosition(x - w / 2 - this.mText.getContentSize().width / 2, y + h / 2 + this.mText.getContentSize().height / 2);
			}
			else if (type == 6) {

				this.mText.setPosition(x + w / 2 + this.mText.getContentSize().width / 2, y + h / 2 + this.mText.getContentSize().height / 2);
			}
			else if (type == 7) {

				this.mText.setPosition(x - w / 2 - this.mText.getContentSize().width / 2, y - h / 2 - this.mText.getContentSize().height / 2);
			}
			else if (type == 8) {

				this.mText.setPosition(x + w / 2 + this.mText.getContentSize().width / 2, y - h / 2 - this.mText.getContentSize().height / 2);
			}
		} else {
			this.mText.setPosition(-67, 297);
		}

		if (point == 0) {
			this.mPoint.node.setScale(0);
		} else {
			this.mPoint.node.setScale(1);
			if (point == 1) {
				this.mPoint.node.setPosition(x + w / 2 + this.mPoint.node.getContentSize().width / 2, y - h / 2 - this.mPoint.node.getContentSize().height / 2);
			}
			else if (point == 2) {
				this.mPoint.node.setPosition(x, y + h / 2 + this.mPoint.node.getContentSize().height / 2);
			}
			else if (point == 3) {
				this.mPoint.node.setPosition(x, y - h / 2 -  -  this.mPoint.node.getContentSize().height/ 2);
			}
			else if (point == 4) {
				this.mPoint.node.setPosition(x + w / 2 + this.mPoint.node.getContentSize().width / 2, y);
			}
		}

		this.mStr.string = text;
		this.node.setScale(1);
		this.isShow = true;
	}
	disShow() {
		this.node.setScale(0);
		this.mPoint.node.setScale(0);
		this.isShow = false;
	}
	isShowing() {
		return this.isShow;
	}
	init(game: GameControl) {
		this.mGame = game;
		this.isInit = true;
	}

	update(dt) {
		if (!this.isInit) {
			return;
		}
		if (this.mGame.mUserInfo.current_map != 10001 || this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).time > 0) {
			this.isInit = false;
		}
		if (this.isShow) {
			if (this.nGuideIndex == 1 && this.mGame.mUserInfo.mapBuilderStatus != null && this.mGame.mUserInfo.mapBuilderStatus.size == 1 &&
				this.mGame.mUserInfo.mapBuilderStatus.get(10001) != null && this.mGame.mUserInfo.mapBuilderStatus.get(10001).level == 1 &&
				this.mGame.mUserInfo.money == 0) {
				this.disShow();

			}
			else if (this.nGuideIndex == 2 && this.mGame.mUserInfo.money >= 10) {
				this.disShow();

			}
			else if (this.nGuideIndex == 3 && this.mGame.isShowlevel) {
				this.disShow();

			}
			else if (this.nGuideIndex == 4 && this.mGame.mUserInfo.mapBuilderStatus.get(10001).level >= 5) {

				this.disShow();
			}
			else if (this.nGuideIndex == 5 && !this.mGame.isShowlevel) {

				this.disShow();
			}
			else if (this.nGuideIndex == 6 && this.mGame.mUserInfo.money >= 45) {

				this.disShow();
			}
			else if (this.nGuideIndex == 7 && this.mGame.mUserInfo.mapBuilderStatus.size == 2) {
				this.disShow();
			}
			
			else if (this.nGuideIndex == 11 && this.mGame.mUserInfo.money >= 300) {
				this.disShow();
			}
			else if (this.nGuideIndex == 12 && this.mGame.isShowShop) {
				this.disShow();
			}
			else if (this.nGuideIndex == 13 && this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).buy.match("110001")) {
				this.mGame.clickShop();
				this.disShow();				
			}
			return;
		}

		if (this.nGuideIndex < 1) {
			if (this.mGame.mUserInfo.mapBuilderStatus == null || this.mGame.mUserInfo.mapBuilderStatus.size == 0) {		
				var builder1 = this.mGame.node.getComponentInChildren(BuilderListControl).mControlList.get(10001);
				if (builder1 != null) {
					var ui1 = builder1.mUi.mUnInit;
					this.show(ui1.node.parent.getPosition().x + ui1.node.getPosition().x + ui1.coinIcon.node.getPosition().x,
						ui1.node.parent.getPosition().y + ui1.node.getPosition().y + ui1.coinIcon.node.getPosition().y,
						ui1.coinIcon.node.getContentSize().width, ui1.coinIcon.node.getContentSize().height, this.mGame.mUserInfo.mString.get(1000019), 0,1);
					this.nGuideIndex == 1;
				}
				return;
			}
		}
		if (this.nGuideIndex < 2) {
			if ( this.mGame.mUserInfo.mapBuilderStatus != null && this.mGame.mUserInfo.mapBuilderStatus.size == 1 &&
				this.mGame.mUserInfo.mapBuilderStatus.get(10001) != null && this.mGame.mUserInfo.mapBuilderStatus.get(10001).level == 1 &&
				this.mGame.mUserInfo.money < 10) {
				var builder2 = this.mGame.node.getComponentInChildren(BuilderListControl).mControlList.get(10001);
				var coin2 = builder2.mUi.mCoinControl;
				this.show(coin2.node.parent.getPosition().x + coin2.node.getPosition().x + coin2.coinIcon.node.getPosition().x,
					coin2.node.parent.getPosition().y + coin2.node.getPosition().y + coin2.coinIcon.node.getPosition().y,
					coin2.coinIcon.node.getContentSize().width, coin2.coinIcon.node.getContentSize().height, this.mGame.mUserInfo.mString.get(1000020), 0,1);
				this.nGuideIndex = 2;
				return;
			}
		}
		if (this.nGuideIndex < 3) {
			if (this.mGame.mUserInfo.mapBuilderStatus != null && this.mGame.mUserInfo.mapBuilderStatus.size == 1 &&
				this.mGame.mUserInfo.mapBuilderStatus.get(10001) != null && this.mGame.mUserInfo.mapBuilderStatus.get(10001).level < 5) {
				var showLevel = cc.find("Canvas/Main Camera/gameUi/levelShow");
				this.show(showLevel.getPosition().x, showLevel.getPosition().y, showLevel.getContentSize().width, showLevel.getContentSize().height, this.mGame.mUserInfo.mString.get(1000021), 0,4);
				this.nGuideIndex = 3;
				return;
			}
		}
		if (this.nGuideIndex < 4) {
			if (this.mGame.mUserInfo.mapBuilderStatus != null && this.mGame.mUserInfo.mapBuilderStatus.size == 1 &&
				this.mGame.mUserInfo.mapBuilderStatus.get(10001) != null && this.mGame.mUserInfo.mapBuilderStatus.get(10001).level < 5) {
				var builder4 = this.mGame.node.getComponentInChildren(BuilderListControl).mControlList.get(10001);
				var level4 = builder4.mUi.mLevelUpControl;
				this.show(level4.node.parent.getPosition().x + level4.node.getPosition().x + level4.icon.node.getPosition().x,
					level4.node.parent.getPosition().y + level4.node.getPosition().y + level4.icon.node.getPosition().y,
					level4.icon.node.getContentSize().width, level4.icon.node.getContentSize().height, this.mGame.mUserInfo.mString.get(1000021), 0,1);
				this.nGuideIndex = 4;
				return;
			}
		}
		if (this.nGuideIndex < 5) {
			if (this.mGame.mUserInfo.mapBuilderStatus != null && this.mGame.mUserInfo.mapBuilderStatus.size == 1 &&
				this.mGame.mUserInfo.mapBuilderStatus.get(10001) != null && this.mGame.mUserInfo.mapBuilderStatus.get(10001).level >= 5 &&
				this.mGame.isShowlevel) {
				var showLevel = cc.find("Canvas/Main Camera/gameUi/levelShow");
				this.show(showLevel.getPosition().x, showLevel.getPosition().y, showLevel.getContentSize().width, showLevel.getContentSize().height, this.mGame.mUserInfo.mString.get(1000022), 0,4);
				this.nGuideIndex = 5;
				return;
			}
		}
		if (this.nGuideIndex < 6) {
			if (this.mGame.mUserInfo.mapBuilderStatus != null && this.mGame.mUserInfo.mapBuilderStatus.size == 1 &&
				this.mGame.mUserInfo.mapBuilderStatus.get(10001) != null && this.mGame.mUserInfo.mapBuilderStatus.get(10001).level >=5 &&
				this.mGame.mUserInfo.money < 45) {
				var builder2 = this.mGame.node.getComponentInChildren(BuilderListControl).mControlList.get(10001);
				var coin2 = builder2.mUi.mCoinControl;
				this.show(coin2.node.parent.getPosition().x + coin2.node.getPosition().x + coin2.coinIcon.node.getPosition().x,
					coin2.node.parent.getPosition().y + coin2.node.getPosition().y + coin2.coinIcon.node.getPosition().y,
					coin2.coinIcon.node.getContentSize().width, coin2.coinIcon.node.getContentSize().height, this.mGame.mUserInfo.mString.get(1000022), 0,1);
				this.nGuideIndex = 6;
				return;
			}
		}
		if (this.nGuideIndex < 7) {
			if (this.mGame.mUserInfo.mapBuilderStatus != null && this.mGame.mUserInfo.mapBuilderStatus.size == 1 &&
				this.mGame.mUserInfo.mapBuilderStatus.get(10001) != null && this.mGame.mUserInfo.mapBuilderStatus.get(10001).level >= 5 &&
				this.mGame.mUserInfo.money >= 45) {
				var builder1 = this.mGame.node.getComponentInChildren(BuilderListControl).mControlList.get(10002);
				if (builder1 != null) {
					var ui1 = builder1.mUi.mUnInit;
					this.show(ui1.node.parent.getPosition().x + ui1.node.getPosition().x + ui1.coinIcon.node.getPosition().x,
						ui1.node.parent.getPosition().y + ui1.node.getPosition().y + ui1.coinIcon.node.getPosition().y,
						ui1.coinIcon.node.getContentSize().width, ui1.coinIcon.node.getContentSize().height, this.mGame.mUserInfo.mString.get(1000022), 0,1);
					this.nGuideIndex =7;
				}
				return;
			}
		}
		
		if (this.nGuideIndex < 11) {
			if (this.mGame.mUserInfo.mapBuilderStatus != null && this.mGame.mUserInfo.mapBuilderStatus.size == 2 &&
				this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).buy != null &&
				!this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).buy.match("110001") && this.mGame.mUserInfo.money < 300) {
				this.show(0, 0, 0, 0, this.mGame.mUserInfo.mString.get(1000023), 0,0);
				this.nGuideIndex = 11;

				return;
			}
		}
		if (this.nGuideIndex < 12) {
			if (this.mGame.mUserInfo.mapBuilderStatus != null && this.mGame.mUserInfo.mapBuilderStatus.size == 2 &&
				(this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).buy == null ||
					!this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).buy.match("110001")) && this.mGame.mUserInfo.money >= 300 && !this.mGame.isShowShop) {
				var showLevel = cc.find("Canvas/Main Camera/gameUi/shopButton");
				this.show(showLevel.getPosition().x, showLevel.getPosition().y, showLevel.getContentSize().width, showLevel.getContentSize().height, this.mGame.mUserInfo.mString.get(1000024), 0,4);
				this.nGuideIndex = 12;
				return;
			}
		}
		if (this.nGuideIndex < 13) {
			if (this.mGame.mUserInfo.mapBuilderStatus != null && this.mGame.mUserInfo.mapBuilderStatus.size == 2 &&
				(this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).buy == null  ||
				!this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).buy.match("110001") )&& this.mGame.mUserInfo.money >= 300 && this.mGame.isShowShop) {
				this.show(-147, 100, 205, 70, this.mGame.mUserInfo.mString.get(1000024), 0, 1);
				
				this.nGuideIndex = 13;
				
				return;
			}
		}
		if (this.nGuideIndex == 13) {
			this.show(0, 0, 0, 0, this.mGame.mUserInfo.mString.get(1000025), 0, 0);
			this.nGuideIndex = 14;
			this.mAll.setScale(1);
			this.mTip.node.setScale(1);
			this.mGame.mUserInfo.zichang = 100;
			this.mGame.mUserInfo.money += 10000;
			this.mGame.aZichang.string = this.mGame.mUserInfo.zichang + "";
			this.mGame.allMeney.string = this.mGame.mUserInfo.money + "";
			this.mGame.node.getComponentInChildren(BuilderListControl).updateValue();

			var req = new RequiteBuy();
			req.type = 5;
			req.mapid = this.mGame.mUserInfo.current_map;
			req.allMoney = this.mGame.mUserInfo.money + "";
			req.allZichang = this.mGame.mUserInfo.zichang + "";
			req.histroy = this.mGame.mUserInfo.history + "";
			req.mapCreat = this.mGame.mUserInfo.mHaveMap.get(req.mapid).creat + "";
			req.mapCost = this.mGame.mUserInfo.mHaveMap.get(req.mapid).cost + "";
			req.user = this.mGame.usrId;
			req.zibenbeilv = this.mGame.mUserInfo.mHaveMap.get(req.mapid).zibenbeilv + "";
			req.moneybeilv = this.mGame.mUserInfo.mHaveMap.get(req.mapid).moneybeilv + "";
			req.timebeilv = this.mGame.mUserInfo.mHaveMap.get(req.mapid).timebeilv + "";
			HttpUtil.buy("buy", req);
			return;
		}
		this.isInit = false;
	}
	click() {
		if (this.nGuideIndex != 14) {
			return;
		}
		this.mAll.setScale(0);
		this.nGuideIndex = 15;
		this.mGuideEnd.setScale(1);

		this.disShow();
	}

	guideEnd() {
		this.mGuideEnd.setScale(0);
	}
}
