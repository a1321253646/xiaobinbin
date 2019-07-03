const { ccclass, property } = cc._decorator;
import BuilderListControl from './BuilderListControl'
import UserDateBean from '../bean/UserDateBean'
import RequiteChangeBuilder from '../bean/RequiteChangeBuilder'
import RequiteBuilderStatusBean from '../bean/RequiteBuilderStatusBean'
import BuilderStatusBean from '../bean/BuilderStatusBean'
import RequiteAddMoney from '../bean/RequiteAddMoney'
import RequitAddMoneyItem from '../bean/RequitAddMoneyItem'
import RequiteMapInfoBean from '../bean/RequiteMapInfoBean'
import RequiteCost from '../bean/RequiteCost'
import HttpUtil from '../ultis/HttpUtil'
import SaleControl from './SaleControl'
@ccclass
export default class GameControl extends cc.Component {
	@property(cc.Label)
	allMeney: cc.Label = null;

	@property(cc.Label)
	mZuanshi: cc.Label = null;

	@property(cc.Label)
	aZichang: cc.Label = null;

	@property(cc.Label)
	mLevelTx: cc.Label = null;
	@property(cc.Label)
	eachMoney: cc.Label = null;


	@property(cc.Sprite)
	mBg: cc.Sprite = null;

	@property(cc.Sprite)
	mLoading: cc.Sprite = null;

	@property(cc.Label)
	mLevelUpCount: cc.Label = null;

	mEanMoney = 0;

	public mUserInfo: UserDateBean;
	public isInit = false;
	public isInited = false;
	public isShowlevel = false;

	levelUpCount = 1;

	start() {
		this.mUserInfo = new UserDateBean();
		HttpUtil.postLocal("getuser", { user: "world" },this);
		
	}
	update(dt) {
		if (!this.isInit) {
			return;
		}
		if (!this.isInited) {
			this.builderInit();
			this.isInited = true;
		}
	}

	builderInit() {
		this.mLoading.node.setScale(0, 0);
		var self = this;
		cc.loader.loadRes("bg/" + this.mUserInfo.mapInfo.get(this.mUserInfo.current_map).bg, cc.SpriteFrame, function (err, spriteFrame) {
			self.mBg.spriteFrame = spriteFrame;
		});

		this.node.getComponentInChildren(BuilderListControl).init(this);
		console.log(" builderInit  ");
		this.allMeney.string = this.mUserInfo.money + "";
		this.mZuanshi.string = this.mUserInfo.zuanshi + "";
		this.aZichang.string = this.mUserInfo.zichang + "";
		this.allMeney.string = this.mUserInfo.money + "";
		this.mUserInfo.mapBuilderStatus.forEach((value, key) => {
			this.mEanMoney += value.eachmoney;
		});
		this.eachMoney.string = this.mEanMoney + "";

	}

	gainMenoy(id: number, menoy: number) {
		console.log("this.mUserInfo.money = " + this.mUserInfo.money);
		console.log("menoy = " + menoy);
		this.mUserInfo.money += menoy;
		console.log("this.mUserInfo.money = " + this.mUserInfo.money);
		this.allMeney.string = this.mUserInfo.money + "";
		this.mUserInfo.mapBuilderStatus.get(id).allmoney = this.mUserInfo.mapBuilderStatus.get(id).allmoney + menoy;

		var req = new RequiteAddMoney();
		req.user = "world";
		var item = new RequitAddMoneyItem();
		item.builderId = id;
		item.money = menoy + "";
		req.data.push(item);
		this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).creat += menoy;
		HttpUtil.addMoney("addmoney", req);
	}

	jianqian(menoy: number) {
		this.mUserInfo.money -= menoy;
		this.allMeney.string = this.mUserInfo.money + "";
		var cost = new RequiteCost();
		cost.user = "world";
		cost.type = 1;
		cost.count = "" + menoy;
		this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).cost += menoy;
		HttpUtil.cost("cost", cost);
	}

	levelup(id: number, count: number,cost:number) {

		this.mEanMoney = this.mEanMoney - cost;

		var buidStatus = this.mUserInfo.mapBuilderStatus.get(id);
		buidStatus.level = buidStatus.level + count;
		this.node.getComponentInChildren(BuilderListControl).levelUpDeal(id);

		this.mEanMoney = this.mEanMoney + this.mUserInfo.mapBuilderStatus.get(id).eachmoney;
		this.eachMoney.string = this.mEanMoney + "";



		var req = new RequiteChangeBuilder();
		var req2 = new RequiteBuilderStatusBean();
		req2.copy(buidStatus);
		req.user = "world";
		req.date = req2;
		HttpUtil.addBuilder("changebuilder", req);
		this.jianqian(cost);
	}

	enableBuilder(id: number) {
		console.log("this.mUserInfo.money = " + this.mUserInfo.money);
		console.log(" this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost = " + this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost);
		if (this.mUserInfo.money > 0) {
			if (this.mUserInfo.money >= this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost) {
				this.mUserInfo.money -= this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost;
				this.allMeney.string = this.mUserInfo.money + "";
				this.jianqian(this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost)

			} else {
				//弹幕提示钱不够
				return;
			}
		}


		var buidStatus = new BuilderStatusBean();
		buidStatus.id = id;
		buidStatus.allmoney = 0;
		buidStatus.level = 1;
		buidStatus.money_pre = 10000;
		buidStatus.time_pre = 10000;
		buidStatus.eachmoney = 0;
		buidStatus.auto = 1;
		this.mUserInfo.mapBuilderStatus.set(id, buidStatus);

		var req = new RequiteChangeBuilder();
		var req2 = new RequiteBuilderStatusBean();
		req2.copy(buidStatus);
		req.user = "world";
		req.date = req2;
		HttpUtil.addBuilder("changebuilder", req);
		this.node.getComponentInChildren(BuilderListControl).enableBuilder(id);
		this.mEanMoney = this.mEanMoney + this.mUserInfo.mapBuilderStatus.get(id).eachmoney;
		this.eachMoney.string = this.mEanMoney+"";

	}




	showLoaded(id:number) {
		this.node.getComponentInChildren(BuilderListControl).showLoaded(id);
	}
	showLoading(id: number) {
		console.log("showLoading = " + id);
		this.node.getComponentInChildren(BuilderListControl).showLoading(id);
		var req = new RequiteMapInfoBean();
		req.id = id;
		req.level = this.mUserInfo.mapBuilderStatus.get(id).level;
		console.log("id  = " + req.id + " level=" + req.level);
		HttpUtil.getMap("getbuilderinfo", req, this);
	}

	showLevelUp() {
		if (this.isShowlevel) {
			this.mLevelTx.string = "升级";
			this.isShowlevel = false;
			this.mLevelUpCount.string = "商场" ;
		} else {
			this.mLevelTx.string = "金币";
			this.isShowlevel = true;
			this.mLevelUpCount.string = "x" + this.levelUpCount;

		}
		
		this.node.getComponentInChildren(BuilderListControl).showLevelUp();
	}

	clickSecondButton() {
		if (this.isShowlevel) {
			this.levelUpCount++;
			if (this.levelUpCount == 10) {
				this.levelUpCount = 1;
			}
			this.mLevelUpCount.string = "x" + this.levelUpCount;
		}
	}
	showSale() {
		this.node.getComponentInChildren(SaleControl).show();
	}

	reStart() {
		this.isInit = false;
		this.isInited = false;
		this.mUserInfo = new UserDateBean();
		HttpUtil.postLocal("getuser", { user: "world" }, this);
	}

	showChange() {
		this.mLoading.node.setScale(1, 1);
	}
}
