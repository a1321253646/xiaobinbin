const { ccclass, property } = cc._decorator;
import BuilderStatusBean from '../bean/BuilderStatusBean';
import ShopItemInfoBean from '../bean/ShopItemInfoBean';
import BuilderUiControl from './BuilderUiControl';
import BuilderJsonInfo from './BuilderUiControl';
import GameControl from './GameControl';
import CoinControl from './CoinControl';
import NumberToString from '../ultis/NumberToString';
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
	mCointControl: CoinControl;
	start() {
		this.mCointControl = this.node.getComponentInChildren(CoinControl);
		this.mCointControl.init(this);
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


		this.mMoney = 0;
		this.mTime = 0;


		this.coinIcon.node.on(cc.Node.EventType.TOUCH_START, this.gainMoney, this);
		
		this.coinIcon.node.on(cc.Node.EventType.TOUCH_MOVE, this.gainMoney, this);
		if (this.mBean == null) {
			this.coinTx.string = NumberToString.numberToString(this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(0).level_up_cost);
		} else {
			this.coinTx.string = NumberToString.numberToString(this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level).level_up_cost);
		}
		
		
	}
	public setEnable() {
		console.log("setEnable");
		this.mBean = this.mGame.mUserInfo.mapBuilderStatus.get(this.mId);
		this.isEnable = true;
		this.updateValue();
		this.mMoney = 0;

		this.prigressBar.node.setScale(1, 1);

		if (this.mCointControl == null) {
			this.mCointControl = this.node.getComponentInChildren(CoinControl);
			this.mCointControl.init(this);
		}
		this.coinIcon.node.setScale(0, 0);
		this.mCointControl.disShow();
		console.log("outline builderid=" + this.mId + " this.mBean.lastime = " + this.mBean.lastime);
		if (this.mBean.lastime != 0) {
			var time = this.mGame.mUserInfo.net_time;
			console.log("outline time  date.getTime= " + time);
			
			console.log("outline  this.mCreateMoney = " + this.mCreateMoney);
			console.log("outline  this.mCreateTime = " + this.mCreateTime);

			time = (time - this.mBean.lastime)/1000;
			console.log("outline time = " + time);
			if (time > this.mCreateTime) {


				var tmp = (time / this.mCreateTime + "").split(".");
				if (this.mBean.auto == 1) {
					var tmp2 = Number(tmp[0]);
					this.mMoney = this.mCreateMoney * tmp2;
					this.mTime = time - tmp2 * this.mCreateTime; 
				} else {
					this.mMoney = this.mCreateMoney;
					this.mTime = this.mCreateTime;

				}				
				console.log("outline time money = " + this.mMoney);
				this.coinTx.string = NumberToString.numberToString(this.mMoney);
				this.mCointControl.show();
				return;
			} else {
				this.mTime = time;
				this.mCointControl.disShow();
			}

		}
		this.coinTx.string = "";

	}

	levelUpDeal() {
		
		console.log("levelUpDeal" );
	//	this.gainMoney(null);
		this.mBean = this.mGame.mUserInfo.mapBuilderStatus.get(this.mId);
		var json = this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level);
		if (json.skill != 0) {
			this.dealJiacheng(json.skill, json.param, this.mBean);
		}
		this.updateValue();
	}


	isChangePro = true;
	update(dt) {

		if (!this.isInit || !this.isEnable) {
			return;
		}
		//if ( this.prigressBar.progress == 1) {
	//		
//		}
		
		if (!this.isAdd) {
			return;
		}
		this.mTime += dt;
		if (this.mTime >= this.mCreateTime) {
			this.mTime -= this.mCreateTime;
			this.prigressBar.progress = 1;
			if (this.mCreateTime < 0.2) {
				this.isChangePro = false;
			}
			this.addMoney();
			this.mCointControl.show();
			if (this.mBean.auto != 1) {
				this.isAdd = false;
			}
		}
		else if (this.isChangePro){
			this.prigressBar.progress = this.mTime / this.mCreateTime;
		}

	}
	private addMoney() {
		this.mMoney += this.mCreateMoney;
	//	console.log(" this.mMoney=" + this.mMoney);
		this.coinTx.string = NumberToString.numberToString(this.mMoney);
	}
	public getMoney() {
		return this.mMoney;
	}

	public gainMoney() {
		this.isAdd = true;
		console.log("gainMoney");
		this.isAdd = true;

		this.mGame.gainMenoy(this.mId, this.mMoney);
		this.mGame.flyCoin(this.node.parent.position.x, this.node.parent.position.y, this.mMoney);
		this.mMoney = 0;
		this.coinTx.string = "";
		this.isChangePro = true;
		this.mCointControl.disShow();
		

	}
	updateValue() {
		//console.log("this.mGame = " + this.mGame);
		if (this.mGame == null) {
			return;
		}
		var countCreat = 0;
		if (this.mMoney > 0) {
			var countCreat = this.mMoney / this.mCreateMoney;
		}
		
		console.log("this.mGame.mUserInfo.zichang = " + this.mGame.mUserInfo.zichang);
		console.log("this.mGame.mMapZichang = " + this.mGame.mMapZichang);
		var beilv = this.mGame.mUserInfo.zichang * (0.02 +
			this.mGame.mMapZichang / 10000);
		//console.log("beilv = " + beilv);
		beilv = beilv +1;
		console.log("beilv = " + beilv);
		var icon = this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level).icon;
		var info = this.mGame.mUserInfo.mapBuilderInfo.get(icon);
		/*console.log("info.creattime = " + info.creattime);
		console.log(" this.mBean.time_pre = " + this.mBean.time_pre);
		console.log("this.mGame.mMapTimePre = " + this.mGame.mMapTimePre);*/
		this.mCreateTime = info.creattime * (this.mBean.time_pre / 10000) * (this.mGame.mMapTimePre / 10000); 
		//console.log("this.mCreateTime = " + this.mCreateTime);
		this.mCreateTime = this.mCreateTime / 1000;
		//console.log("this.mCreateTime = " + this.mCreateTime);


	/*	console.log("this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level).creatBase = " + this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level).creatBase);
		console.log("this.mBean.money_pre = " + this.mBean.money_pre);
		console.log("this.mGame.mMapMoneyPre = " + this.mGame.mMapMoneyPre);
		console.log("(this.mBean.money_pre / 10000) = " + (this.mBean.money_pre / 10000));*/
		console.log("(this.mGame.mMapMoneyPre / 10000) = " + (this.mGame.mMapMoneyPre / 10000));


		this.mCreateMoney = this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(this.mBean.level).creatBase * (this.mBean.money_pre / 10000) * (this.mGame.mMapMoneyPre / 10000);
		console.log("this.mCreateMoney = " + this.mCreateMoney);
		this.mCreateMoney = this.mCreateMoney * beilv;
		console.log("this.mCreateMoney = " + this.mCreateMoney);
		this.mCreateMoney = Math.round(this.mCreateMoney);
		console.log("this.mCreateMoney = " + this.mCreateMoney);
		this.mBean.eachmoney = this.mCreateMoney * (1 / this.mCreateTime);
		//console.log("this.mBean.eachmoney = " + this.mBean.eachmoney);
		this.mBean.eachmoney = Math.round(this.mBean.eachmoney);

		this.mMoney = countCreat * this.mCreateMoney;
		this.coinTx.string = NumberToString.numberToString(this.mMoney);

		//console.log("this.mBean.eachmoney = " + this.mBean.eachmoney);
		if (this.mBean.auto == 1 && !this.isAdd) {
			this.isAdd = true;
		}
	}

	dealJiacheng(type: number, param: number, bean: BuilderStatusBean) {
	//	console.log("dealJiacheng");
		if (type == 4) {
			bean.money_pre = (bean.money_pre * (param / 10000)) >> 0;
		} else if (type == 2) {
			bean.time_pre = (bean.time_pre * (1 - param / 10000)) >> 0;
		}
		
	}
}