const { ccclass, property } = cc._decorator;
import BuilderListControl from './BuilderListControl'
import UserDateBean from '../bean/UserDateBean'
import RequiteChangeBuilder from '../bean/RequiteChangeBuilder'
import RequiteBuilderStatusBean from '../bean/RequiteBuilderStatusBean'
import BuilderStatusBean from '../bean/BuilderStatusBean'
import RequiteAddMoney from '../bean/RequiteAddMoney'
import RequitAddMoneyItem from '../bean/RequitAddMoneyItem'
import RequiteWxUserInfo from '../bean/RequiteWxUserInfo'
import RequiteMapInfoBean from '../bean/RequiteMapInfoBean'
import RequiteCost from '../bean/RequiteCost'
import HttpUtil from '../ultis/HttpUtil'
import SaleControl from './SaleControl'
import NumberToString from '../ultis/NumberToString'
@ccclass
export default class GameControl extends cc.Component {
	@property(cc.Label)
	allMeney: cc.Label = null;

	@property(cc.Label)
	mZuanshi: cc.Label = null;

	@property(cc.Label)
	aZichang: cc.Label = null;

	@property(cc.Sprite)
	mLevelImg: cc.Sprite = null;

	@property(cc.Node)
	mLevelCount: cc.Node = null;
	@property(cc.Node)
	mBaoxiang: cc.Node = null;
	@property(cc.Node)
	mShopping: cc.Node = null;
	@property(cc.Node)
	mTouchLayout: cc.Node = null;

	@property(cc.Label)
	eachMoney: cc.Label = null;


	@property(cc.Sprite)
	mBg: cc.Sprite = null;
	@property(cc.Sprite)
	mBg1: cc.Sprite = null;

	@property(cc.Sprite)
	mLoading: cc.Sprite = null;

	@property(cc.Label)
	mLevelUpCount: cc.Label = null;

	@property(cc.AudioClip)
	mCoinSource: cc.AudioClip = null;

	@property(cc.AudioClip)
	mLevelUpSource: cc.AudioClip = null;

	mEanMoney = 0;

	public mUserInfo: UserDateBean;
	public isInit = false;
	public isInited = false;
	public isShowlevel = false;

	levelUpCount = 1;

	start() {
	/*	let sysInfo = window.wx.getSystemInfoSync();
		console.log("sysInfo.screenWidth=" + sysInfo.screenWidth);
		console.log("sysInfo.screenHeight=" + sysInfo.screenHeight);

		var self = this;
		wx.login({
			success: function (r) {
				console.log('login success')
				var code = r.code;//登录凭证
				if (code) {
					wx.getSetting({
						success(res) {
							if (!res.authSetting['scope.userInfo']) {
								console.log("!res.authSetting['scope.userInfo']");
								//self.getUserInfo(self.usrId);
								try {
									var value = wx.getStorageSync('userId')
									if (value) {
										console.log("wx.getStrage = " + value);
										self.usrId = value;
										self.getUserInfo(self.usrId);
									} else {
										console.log("wx.getStrage = null");
										self.getUserInfo(self.usrId);
									}
								} catch (e) {
									console.log("wx.getStrage error= " + e);
								}



								let button = window.wx.createUserInfoButton({
									type: 'text',
									text: ' ',
									style: {
										left: 0,
										top: 0,
										width: sysInfo.screenWidth,
										height: sysInfo.screenHeight,
										backgroundColor: '#00000000',//最后两位为透明度
										color: '#ffffff',
										fontSize: 20,
										textAlign: "center",
										lineHeight: sysInfo.screenHeight,
									}
								});
								console.log("createUserInfoButton");
								button.onTap((res) => {
									console.log("button.onTap", res);
									if (res.userInfo) {
										console.log("res.userInfo:", res);
										wx.getUserInfo({
											success: function (res) {
												console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
												//3.请求自己的服务器，解密用户信息 获取unionId等加密信息
												var user = new RequiteWxUserInfo();
												user.encryptedData = res.encryptedData;
												user.iv = res.iv;
												user.code = code;
												HttpUtil.postGetUserInfo("wx", user, self,false);

											},
											fail: function () {
												console.log('获取用户信息失败')
											}
										})
										button.destroy();
									} else {
										console.log("!res.userInfo:", res);
									}
									
								});
								console.log("button.show();");
								button.show();				
							} else {
								console.log("res.authSetting['scope.userInfo']");
								wx.getUserInfo({
									success: function (res) {
										console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
										//3.请求自己的服务器，解密用户信息 获取unionId等加密信息
										var user = new RequiteWxUserInfo();
										user.encryptedData = res.encryptedData;
										user.iv = res.iv;
										user.code = code;
										HttpUtil.postGetUserInfo("wx", user, self,true);
									},
									fail: function () {
										console.log('获取用户信息失败')
									}
								})
							}
						}
					})
				}
			},
			fail: function () {
				console.log('login fail')
			}
		})*/
		this.getUserInfo(this.usrId);
		
	}

	usrId = "default";
	getUserInfo(user2: string) {
		this.usrId = user2;
		this.mUserInfo = new UserDateBean();
		HttpUtil.postLocal("getuser", { user: user2 }, this);
	}
	isLoading = false;
	isLoadingCount = 0;
	update(dt) {
		if (!this.isInit) {
			return;
		}
		if (this.isLoading && this.isLoadingCount == 0) {
			this.isLoading = false;
			this.mLoading.node.setScale(0, 0);
		}

		if (!this.isInited) {
			this.builderInit();
			this.isInited = true;
		}
	}

	builderInit() {
		
		var self = this;
		console.log("this.mUserInfo.mapInfo.get(this.mUserInfo.current_map).bg= " + this.mUserInfo.mapInfo.get(this.mUserInfo.current_map).bg);
		var maps: string[] = this.mUserInfo.mapInfo.get(this.mUserInfo.current_map).bg.split(",");
		console.log("maps[0]= " + maps[0]);
		console.log("maps[1]= " + maps[1]);
		this.isLoadingCount++;
		
		cc.loader.load("http://120.79.249.55/images/map/" + maps[0] + ".png", function (err, texture) {
			var sprite = new cc.SpriteFrame(texture);
			self.mBg.spriteFrame = sprite;
			self.isLoadingCount--;
			console.log("this.isLoadingCoun= " + self.isLoadingCount);
			console.log(" maps[0] = " + maps[0] );
		});
		console.log("this.isLoadingCoun= " + this.isLoadingCount);
		this.isLoadingCount++;
		cc.loader.load("http://120.79.249.55/images/map/" + maps[1] + ".png", function (err, texture) {
			var sprite = new cc.SpriteFrame(texture);
			self.mBg1.spriteFrame = sprite;
			self.isLoadingCount--;
			console.log("this.isLoadingCoun= " + self.isLoadingCount);
			console.log(" maps[1] = " + maps[1]);
		});
		console.log("this.isLoadingCoun= " + this.isLoadingCount);
		
		this.node.getComponentInChildren(BuilderListControl).init(this);
		console.log(" builderInit  ");
		this.allMeney.string = NumberToString.numberToString(this.mUserInfo.money) ;
		this.mZuanshi.string = NumberToString.numberToString(this.mUserInfo.zuanshi);
		this.aZichang.string = NumberToString.numberToString(this.mUserInfo.zichang);
		this.allMeney.string = NumberToString.numberToString(this.mUserInfo.money);
		this.mEanMoney = 0;
		this.mUserInfo.mapBuilderStatus.forEach((value, key) => {
			this.mEanMoney += value.eachmoney;
		});
		this.eachMoney.string = NumberToString.numberToString(this.mEanMoney);
		this.isLoading = true;
	}

	gainMenoy(id: number, menoy: number) {
		console.log("this.mUserInfo.money = " + this.mUserInfo.money);
		console.log("menoy = " + menoy);
		this.mUserInfo.money += menoy;
		console.log("this.mUserInfo.money = " + this.mUserInfo.money);
		this.allMeney.string = NumberToString.numberToString(this.mUserInfo.money );
		this.mUserInfo.mapBuilderStatus.get(id).allmoney = this.mUserInfo.mapBuilderStatus.get(id).allmoney + menoy;
		this.mUserInfo.mapBuilderStatus.get(id).lastime = new Date().getTime();
		var req = new RequiteAddMoney();
		req.user = this.usrId;
		var item = new RequitAddMoneyItem();
		item.builderId = id;
		item.money = menoy + "";
		req.data.push(item);
		this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).creat += menoy;
		HttpUtil.addMoney("addmoney", req);
		cc.audioEngine.play(this.mCoinSource, false,1);

	}

	jianqian(menoy: number) {
		this.mUserInfo.money -= menoy;
		this.allMeney.string = NumberToString.numberToString( this.mUserInfo.money );
		var cost = new RequiteCost();
		cost.user = this.usrId;
		cost.type = 1;
		cost.count = "" + menoy;
		this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).cost += menoy;
		HttpUtil.cost("cost", cost);
	}

	levelup(id: number, count: number,cost:number,isPlaySource:boolean) {
		var buidStatus = this.mUserInfo.mapBuilderStatus.get(id);
		buidStatus.level = buidStatus.level + count;
		this.node.getComponentInChildren(BuilderListControl).levelUpDeal(id);

		this.mEanMoney = 0;
		this.mUserInfo.mapBuilderStatus.forEach((value, key) => {
			this.mEanMoney += value.eachmoney;
		});
		this.eachMoney.string = NumberToString.numberToString(this.mEanMoney );



		var req = new RequiteChangeBuilder();
		var req2 = new RequiteBuilderStatusBean();
		req2.copy(buidStatus);
		req.user = this.usrId;
		req.date = req2;
		HttpUtil.addBuilder("changebuilder", req);
		this.jianqian(cost);
		cc.audioEngine.play(this.mLevelUpSource, false,1);

	}

	enableBuilder(id: number) {
		console.log("this.mUserInfo.money = " + this.mUserInfo.money);
		console.log(" this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost = " + this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost);
	//	if (this.mUserInfo.money > 0) {
			if (this.mUserInfo.money >= this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost) {
				this.mUserInfo.money -= this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost;
				this.allMeney.string = NumberToString.numberToString(this.mUserInfo.money );
				this.jianqian(this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost)

			} else {
				//弹幕提示钱不够
				return;
			}
//		}


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
		req.user = this.usrId;
		req.date = req2;
		HttpUtil.addBuilder("changebuilder", req);
		this.node.getComponentInChildren(BuilderListControl).enableBuilder(id);
		this.mEanMoney = 0;
		this.mUserInfo.mapBuilderStatus.forEach((value, key) => {
			this.mEanMoney += value.eachmoney;
		});
		this.eachMoney.string = NumberToString.numberToString(this.mEanMoney);

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
			var self = this;
			cc.loader.loadRes("levelup/open_lvup" , cc.SpriteFrame, function (err, spriteFrame) {
				self.mLevelImg.spriteFrame = spriteFrame;
			});
			this.isShowlevel = false;
			this.mTouchLayout.setScale(1, 1);
			this.mBaoxiang.setScale(1, 1);
			this.mShopping.setScale(1, 1);
			this.mLevelCount.setScale(0, 0);
		} else {
			var self = this;
			cc.loader.loadRes("levelup/close_lvup", cc.SpriteFrame, function (err, spriteFrame) {
				self.mLevelImg.spriteFrame = spriteFrame;
			});
			this.isShowlevel = true;
			this.mTouchLayout.setScale(0, 0);
			this.mBaoxiang.setScale(0, 0);
			this.mShopping.setScale(0, 0);
			this.mLevelCount.setScale(1, 1	);

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
			this.node.getComponentInChildren(BuilderListControl).changeUpCount(this);
			this.mLevelUpCount.string = "x" + this.levelUpCount;
		}
	}
	showSale() {
		this.node.getComponentInChildren(SaleControl).show();
	}

	reStart() {
		this.isInit = false;
		this.isInited = false;
		this.getUserInfo(this.usrId);
	}

	showChange() {
		this.mLoading.node.setScale(1, 1);
	}
}
