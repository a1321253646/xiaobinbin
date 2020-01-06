const {ccclass, property} = cc._decorator;
import BuilderStatusBean from '../bean/BuilderStatusBean';
import GameControl from '../uiControl/GameControl';
import BuilderUiControl from './BuilderUiControl';
import BuilderJsonInfo from './BuilderUiControl';
import LevelEnableControl from './LevelEnableControl';
import GuideControl from './GuideControl';
import NumberToString from '../ultis/NumberToString';
@ccclass
export default class NewClass extends cc.Component {
	@property(cc.ProgressBar)
	prigressBar: cc.ProgressBar = null;


	@property(cc.Sprite)
	icon: cc.Sprite = null;

	@property(cc.Sprite)
	mBack: cc.Sprite = null;

	@property(cc.Label)
	tx: cc.Label = null;

	@property(cc.Label)
	cost: cc.Label = null;


	mBean: BuilderStatusBean;
	mGame: GameControl;
	mId: number;
	mMax: number = 0;
	mMin: number = 99999;
	mTime = 0;
	isTouch = false;

	showLoaded() {
		this.icon.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
		this.icon.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
		this.setEnable();
		this.changeUpCount(this.mGame);
	}
	showLoad() {
		this.icon.node.off(cc.Node.EventType.TOUCH_START);
		this.icon.node.off(cc.Node.EventType.TOUCH_END);

	}

	mCost = 0;
	isCanUp = true;

	mLevelIconStatus = 0;//0为正常状态，1为放大中，2为放大结束，3为缩小中
	mIconChangeTime = 0;
	update(dt) {
		if (this.isTouch) {
			this.mTime += dt;
			if (this.mTime >= 0.5) {
				this.mTime -= 0.5;
				this.levelup(this.mGame.levelUpCount,false);
			}
		}
		if (this.mGame != null) {

			if (this.mGameMoney != this.mGame.getAllMoney()) {
				this.changeUpCount(this.mGame);
			}
			if (this.mGame.getAllMoney() < this.mCost && this.isCanUp) {
				this.changeUpCount(this.mGame);
				if (this.mGame.getAllMoney() < this.mCost && this.isCanUp) {

					this.icon.setState(1);
					this.isCanUp = false;
					this.icon.node.off(cc.Node.EventType.TOUCH_START);
					this.icon.node.off(cc.Node.EventType.TOUCH_END);
					this.isTouch = false;
				}

				
			} else if (this.mGame.getAllMoney() >= this.mCost && !this.isCanUp) {
				this.changeUpCount(this.mGame);
				if (this.mGame.getAllMoney() >= this.mCost && !this.isCanUp) {
					this.icon.setState(0);
					this.isCanUp = true;
					this.icon.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
					this.icon.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
				}

			}
		}
		if (this.mLevelIconStatus == 1) {
			this.mIconChangeTime += dt;
			if (this.mIconChangeTime >= 0.1) {
				this.mIconChangeTime = 0.1;
			}
			this.icon.node.setScale(1 + 0.2 * (this.mIconChangeTime / 0.1));
			if (this.mIconChangeTime == 0.1) {
				this.mLevelIconStatus = 2;
				this.mIconChangeTime = 0;
			}
			return;
		}
		if (this.mLevelIconStatus == 2 && !this.isTouch) {
			this.mLevelIconStatus = 3;
		}
		if (this.mLevelIconStatus == 3) {
			this.mIconChangeTime += dt;
			if (this.mIconChangeTime >= 0.1) {
				this.mIconChangeTime = 0.1;
			}

			this.icon.node.setScale(1.2 - 0.2 * (this.mIconChangeTime / 0.1));
			if (this.mIconChangeTime == 0.1) {
				this.mLevelIconStatus = 0;
				this.mIconChangeTime = 0;
			}
		}
	}
	unInit() {
		this.mBean = null;
		this.mGame = null;
		this.mId = 0;
		this.mMax= 0;
		this.mMin = 99999;
		this.mTime = 0;
		this.isTouch = false;
	}

	public init(id: number, game: GameControl) {
		this.icon.node.setScale(1, 1);
		this.tx.node.setScale(1, 1);
		this.prigressBar.node.setScale(0, 0);
		this.mId = id;
		this.mGame = game;

		this.icon.node.on(cc.Node.EventType.TOUCH_START, this.touchStart,this);
		this.icon.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);

	}

	public setEnable() {
		this.mMin = 999999;
		this.mBean = this.mGame.mUserInfo.mapBuilderStatus.get(this.mId);
		this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).forEach((value, key) => {
			if (key > this.mMax) {
				this.mMax = key;
			}
			if (key < this.mMin){
				this.mMin = key;
			}
		});
		console.log("this.mBean.level =" + this.mBean.level + " this.mMax = " + this.mMax);
		this.prigressBar.node.setScale(1, 1);
		this.prigressBar.progress = (this.mBean.level - this.mMin) / (this.mMax - this.mMin);
		this.tx.string = "Lv" + this.mBean.level;
		this.mCost = this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level).level_up_cost;
		this.cost.string = NumberToString.numberToString(this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level).level_up_cost );
	}
	touchStart(event) {
		this.isTouch = true;
		this.mTime = 0;
		this.levelup(this.mGame.levelUpCount, true);
		this.mLevelIconStatus = 1;
		this.mIconChangeTime = 0;



	}
	touchEnd(event) {
		this.isTouch = false;
	}

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

	}
	levelup(count: number,isPlaySource:boolean) {
		if (this.mBean.level + count > this.mMax) {
			count = this.mMax - this.mBean.level;
		}
		var level = 0;
		var cost = 0;
		var isAllUp = true;
		for (var i = 0; i < count; i++) {
			if (this.mBean.level + i > this.mMax) {
				isAllUp = false;
				break;
			}
			if (this.mGame.getAllMoney() >= this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level + i).level_up_cost + cost) {
				level++;
				cost += this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level + i).level_up_cost;		
			} else {
				isAllUp = false;
				break;
			}
		}
		console.log("this.mBean.level  =" + this.mBean.level + " level=" + level + " this.mMax=" + this.mMax);
		if (level > 0) {
			this.mGame.levelup(this.mId, level, cost, isPlaySource);
			console.log("this.mBean.level + levell  =" + (this.mBean.level + level) +  " this.mMax=" + this.mMax);
			if (this.mBean.level == this.mMax) {
				this.icon.node.off(cc.Node.EventType.TOUCH_START);
				this.icon.node.off(cc.Node.EventType.TOUCH_END);
				this.isTouch = false;
				this.mGame.showLoading(this.mId);
			}
		} else {
			//TODO 金币不足提示
		}
	}

	levelUpDeal() {
		if (this.mMax == 0) {
			this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).forEach((value, key) => {
				if (key > this.mMax) {
					this.mMax = key;
				}
				if (key < this.mMin) {
					this.mMin = key;
				}
			});
		}
		this.mBean = this.mGame.mUserInfo.mapBuilderStatus.get(this.mId);
		this.prigressBar.progress = (this.mBean.level - this.mMin) / (this.mMax - this.mMin);
		this.tx.string = "Lv" + this.mBean.level;
		this.changeUpCount(this.mGame);
		var binfo = this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level);
	//	this.cost.string = NumberToString.numberToString(this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level).level_up_cost);
	}
	mGameMoney = 0;
	changeUpCount(game: GameControl) {
		this.mGameMoney = game.getAllMoney();
		var count = this.mMax - this.mMin;
		var coat = 0;
		if (game.levelUpCount < count) {
			count = game.levelUpCount;
		}
		var coatShow = 0;
		for (var i = 0; i < count; i++) {
			if (this.mBean.level + i >= this.mMax) {
				break;
			}
			coat += game.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level + i).level_up_cost;
			coatShow += game.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level + i).level_up_cost;
			
			if (game.levelUpCount > 100 && coat > game.getAllMoney()) {
				if (coat != game.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level + i).level_up_cost) {
					coat -= game.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level + i).level_up_cost;
				}
			//	break;
			}
		}
		this.cost.string = NumberToString.numberToString(coatShow);
		console.log("coat  =" + coat + " game.mUserInfo.money=" + game.mUserInfo.money);
		this.mCost = coat;
		
	}
}
