const { ccclass, property } = cc._decorator;
import BuilderStatusBean from '../bean/BuilderStatusBean';
import BuilderUiControl from './BuilderUiControl';
import BuilderJsonInfo from './BuilderUiControl';
import GameControl from './GameControl';
@ccclass
export default class NewClass extends cc.Component {

	@property(cc.ProgressBar)
	prigressBar: cc.ProgressBar = null;


	@property(cc.Sprite)
	coinIcon: cc.Sprite = null;

	@property(cc.Label)
	coinTx: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
		
    }



	isInit: boolean = false;
	isEnable: boolean = false;
	isAdd: boolean = true;
	mTime= 0;
	mMoney= 0;


	mBean: BuilderStatusBean;
	mId : number;
	mCreateTime : number;
	mCreateMoney : number;
	mGame: GameControl;
	unInit() {
		this.mGame = null;
		this.mId = 0;
		this.isInit = false;
		this.isEnable = false;
		this.isAdd = true;
		this.mMoney = 0;
		this.mTime = 0;
		this.prigressBar.progress = 0;
		this.mCreateMoney = 0;
		this.mCreateTime = 0;
		this.mBean = null;
		this.coinIcon.node.off(cc.Node.EventType.TOUCH_START);
		this.coinIcon.node.off(cc.Node.EventType.TOUCH_MOVE);
	}
	public init(id: number, game: GameControl) {

		this.mGame = game;
		this.mId = id;
		this.mBean = this.mGame.mUserInfo.mapBuilderStatus.get(this.mId);
		this.coinIcon.node.setScale(1, 1);
		this.coinTx.node.setScale(1, 1);
		this.prigressBar.node.setScale(0, 0);

		this.prigressBar.progress = 0;
		this.isInit = true;
		this.isEnable = false;;
		this.isAdd = true;

		this.coinIcon.node.on(cc.Node.EventType.TOUCH_START, this.gainMoney,this);
		this.coinIcon.node.on(cc.Node.EventType.TOUCH_MOVE, this.gainMoney, this);
		if (this.mBean == null) {
			this.coinTx.string = this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(0).level_up_cost + "";
		} else {
			this.coinTx.string = this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level).level_up_cost + "";
		}
		
		
	}
	public setEnable() {
		this.mBean = this.mGame.mUserInfo.mapBuilderStatus.get(this.mId);
		this.isEnable = true;
		this.mCreateTime = this.mBean.time_pre/10000 * this.mGame.mUserInfo.mapBuilderInfo.get(this.mId).creattime;
		this.mCreateTime = this.mCreateTime / 1000;

		this.mCreateMoney = this.mBean.money_pre / 10000 * this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level).creatBase;

		if (this.mBean.eachmoney == 0) {
			this.mBean.eachmoney = this.mCreateMoney * (60 / this.mCreateTime);
			this.mBean.eachmoney = this.mBean.eachmoney >> 0;
		}
		if (this.mBean.lastime != 0) {
			//TODO 计算出离线的前
		}

		this.prigressBar.node.setScale(1, 1);
		this.coinIcon.node.setScale(0, 0);
	}

	levelUpDeal() {
		this.gainMoney(null);
		this.mBean = this.mGame.mUserInfo.mapBuilderStatus.get(this.mId);
		var json = this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level);
		if (json.skill != 0) {
			if (json.skill == 1) {
				this.mBean.money_pre = this.mBean.money_pre + json.param ;
				
			} else if (json.skill == 2) {
				this.mCreateTime = this.mCreateTime / this.mBean.time_pre;
				this.mBean.time_pre = this.mBean.time_pre + json.param ;
				this.mCreateTime = this.mCreateTime * this.mBean.time_pre / 10000;
			
			}
		}
		this.mCreateMoney = this.mBean.money_pre / 10000 * this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level).creatBase;
		this.mCreateMoney = this.mCreateMoney >> 0;
		this.mBean.eachmoney = this.mCreateMoney * (60 / this.mCreateTime);
		this.mBean.eachmoney = this.mBean.eachmoney >> 0;
	}

	update(dt) {
		
		if (!this.isInit || !this.isEnable) {
			return;
		}
		if (!this.isAdd) {
			return;
		}
		this.mTime += dt;
		if (this.mTime >= this.mCreateTime) {
			this.mTime -= this.mCreateTime;
			this.prigressBar.progress = 1;
			this.addMoney();
			//if (this.mMoney == 0) {
				this.coinIcon.node.setScale(1, 1);
			//	}
			if (this.mBean.auto != 1) {
				this.isAdd = false;
			}
		}
		else{
			this.prigressBar.progress = this.mTime / this.mCreateTime;
		}

	}
	private addMoney() {
		this.mMoney += this.mCreateMoney ;
		this.coinTx.string = this.mMoney + "";
	}
	public getMoney() {
		return this.mMoney;
	}


	public gainMoney(event) {
		if (!this.isEnable) {
			this.mGame.enableBuilder(this.mId);
			return;
		}
		this.isAdd = true;
		console.log("gainMoney");
		this.isAdd = true;

		this.mGame.gainMenoy(this.mId, this.mMoney);
		
		this.mMoney = 0;
		this.coinTx.string = this.mMoney + "";
		this.coinIcon.node.setScale(0, 0);
		
	}
}