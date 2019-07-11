const {ccclass, property} = cc._decorator;
import BuilderStatusBean from '../bean/BuilderStatusBean';
import GameControl from '../uiControl/GameControl';
import BuilderUiControl from './BuilderUiControl';
import BuilderJsonInfo from './BuilderUiControl';
import NumberToString from '../ultis/NumberToString';
@ccclass
export default class NewClass extends cc.Component {
	@property(cc.ProgressBar)
	prigressBar: cc.ProgressBar = null;


	@property(cc.Sprite)
	icon: cc.Sprite = null;

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
	}
	showLoad() {
		this.icon.node.off(cc.Node.EventType.TOUCH_START);
		this.icon.node.off(cc.Node.EventType.TOUCH_END);

	}

	
	update(dt) {
		if (this.isTouch) {
			this.mTime += dt;
			if (this.mTime > 1) {
				this.mTime -= 1;
				this.levelup(this.mGame.levelUpCount,false);
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
		this.tx.string ="Lv"+ this.mBean.level;
		this.cost.string = NumberToString.numberToString(this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level).level_up_cost );
	}

	touchStart(event) {
		this.isTouch = true;
		this.mTime = 0;
		this.levelup(this.mGame.levelUpCount,true);
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
			if (this.mGame.mUserInfo.money > this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level + i).level_up_cost + cost) {
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
	//	this.cost.string = NumberToString.numberToString(this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level).level_up_cost);
	}

	changeUpCount(game: GameControl) {
		var count = this.mMax - this.mMin;
		var coat = 0;
		console.log("game  =" + game);
		if (game.levelUpCount < count) {
			count = game.levelUpCount;
		}
		for (var i = 0; i < count; i++) {
			if (this.mBean.level + i > this.mMax) {
				break;
			}
			coat += game.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level+i).level_up_cost;
		}
		this.cost.string = NumberToString.numberToString(coat);
	}
}
