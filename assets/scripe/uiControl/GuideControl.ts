import GameControl from "./GameControl";
import BuilderListControl from "./BuilderListControl";
import ShopControl from "./ShopControl";


const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
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
	@property(cc.Label)
	mStr: cc.Label = null;
    // LIFE-CYCLE CALLBACKS:

	isInit = false;
	mGame: GameControl;
	isShow = false;
	nGuideIndex = 0;


	show(x: number, y: number, w: number, h: number, text: string, type: number) {//type:1234 上下左右 5678 左上 右上 左下 右下 
		this.mUp.setContentSize(720, 1280 / 2 - (y + h / 2));
		this.mDown.setContentSize(720, 1280 / 2 + (y - h / 2));
		this.mLeft.setContentSize(720 / 2 + (x - w / 2),h);
		this.mRight.setContentSize(720 / 2 - (x + w / 2), h);

		this.mUp.setPosition(0, y+h/2);
		this.mDown.setPosition(0, y -h/2);
		this.mLeft.setPosition(x-w/2,y );
		this.mRight.setPosition(x + w / 2, y);

		if (type == 1) {
			this.mText.setPosition(x, y + h / 2 + this.mText.getContentSize().height/2);
		}
		else if (type == 2){

			this.mText.setPosition(x, y - h / 2 - this.mText.getContentSize().height / 2);
		}
		else if (type == 3) {

			this.mText.setPosition(x - w / 2 - this.mText.getContentSize().width/2, y);
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
		this.mStr.string = text;
		this.node.setScale(1);
		this.isShow = true;
	}
	disShow() {
		this.node.setScale(0);
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
			else if (this.nGuideIndex == 8 && this.mGame.isShowShop) {
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
						ui1.coinIcon.node.getContentSize().width, ui1.coinIcon.node.getContentSize().height, "激活第一个建筑", 1);
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
					coin2.coinIcon.node.getContentSize().width, coin2.coinIcon.node.getContentSize().height, "收钱收到10金币", 1);
				this.nGuideIndex = 2;
				return;
			}
		}
		if (this.nGuideIndex < 3) {
			if (this.mGame.mUserInfo.mapBuilderStatus != null && this.mGame.mUserInfo.mapBuilderStatus.size == 1 &&
				this.mGame.mUserInfo.mapBuilderStatus.get(10001) != null && this.mGame.mUserInfo.mapBuilderStatus.get(10001).level < 5) {
				var showLevel = cc.find("Canvas/Main Camera/gameUi/levelShow");
				this.show(showLevel.getPosition().x, showLevel.getPosition().y, showLevel.getContentSize().width, showLevel.getContentSize().height, "打开升级界面", 1);
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
					level4.icon.node.getContentSize().width, level4.icon.node.getContentSize().height, "升级到5级", 1);
				this.nGuideIndex = 4;
				return;
			}
		}
		if (this.nGuideIndex < 5) {
			if (this.mGame.mUserInfo.mapBuilderStatus != null && this.mGame.mUserInfo.mapBuilderStatus.size == 1 &&
				this.mGame.mUserInfo.mapBuilderStatus.get(10001) != null && this.mGame.mUserInfo.mapBuilderStatus.get(10001).level >= 5 &&
				this.mGame.isShowlevel) {
				var showLevel = cc.find("Canvas/Main Camera/gameUi/levelShow");
				this.show(showLevel.getPosition().x, showLevel.getPosition().y, showLevel.getContentSize().width, showLevel.getContentSize().height, "关闭升级界面", 1);
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
					coin2.coinIcon.node.getContentSize().width, coin2.coinIcon.node.getContentSize().height, "收钱收到45金币", 1);
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
						ui1.coinIcon.node.getContentSize().width, ui1.coinIcon.node.getContentSize().height, "激活第二个建筑", 3);
					this.nGuideIndex =7;
				}
				return;
			}
		}
		if (this.nGuideIndex < 8) {
			if (this.mGame.mUserInfo.mapBuilderStatus != null && this.mGame.mUserInfo.mapBuilderStatus.size == 2 &&
				(this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).buy == null || !this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).buy.match("120001"))) {
				var showLevel = cc.find("Canvas/Main Camera/gameUi/shopButton");
				this.show(showLevel.getPosition().x, showLevel.getPosition().y, showLevel.getContentSize().width, showLevel.getContentSize().height, "打开商场界面", 1);
				this.nGuideIndex = 8;
				return;
			}
		}
		if (this.nGuideIndex < 9) {
			if (this.mGame.mUserInfo.mapBuilderStatus != null && this.mGame.mUserInfo.mapBuilderStatus.size == 2 &&
				(this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).buy == null || !this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).buy.match("120001"))) {
				var shopItem = this.mGame.node.getComponentInChildren(ShopControl).mControlList.get(120001);
				var v9: cc.Vec2 = shopItem.mButton.node.convertToWorldSpace(cc.Vec2.ZERO);
				this.show(v9.x, v9.y, shopItem.node.getContentSize().width, shopItem.node.getContentSize().height, "购买第一个资产商品", 2);
				this.nGuideIndex = 9;
				return;
			}
		}
	}
}
