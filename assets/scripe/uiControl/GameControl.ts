const { ccclass, property } = cc._decorator;
import BuilderListControl from './BuilderListControl'
import UserDateBean from '../bean/UserDateBean'
import RequiteChangeBuilder from '../bean/RequiteChangeBuilder'
import RequiteBuilderStatusBean from '../bean/RequiteBuilderStatusBean'
import BuilderStatusBean from '../bean/BuilderStatusBean'
import RequiteAddMoney from '../bean/RequiteAddMoney'
import RequiteAddMap from '../bean/RequiteAddMap'
import ShopItemInfoBean from '../bean/ShopItemInfoBean'
import RequitAddMoneyItem from '../bean/RequitAddMoneyItem'
import RequiteWxUserInfo from '../bean/RequiteWxUserInfo'
import RequiteMapInfoBean from '../bean/RequiteMapInfoBean'
import RequiteCost from '../bean/RequiteCost'
import RequiteBuyDaoju from '../bean/RequiteBuyDaoju'
import HttpUtil from '../ultis/HttpUtil'
import SaleControl from './SaleControl'
import MapItenListControl from './MapItenListControl'
import OtherSettingControl from './OtherSettingControl'
import NumberToString from '../ultis/NumberToString'
import UnlockMapView from './UnlockMapView'
import ShopControl from './ShopControl'
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
	mLevelUpTip: cc.Node = null;
	@property(cc.Node)
	mTouchLayout: cc.Node = null;

	@property(cc.Label)
	eachMoney: cc.Label = null;


	@property(cc.Sprite)
	mBg: cc.Sprite = null;
	@property(cc.Sprite)
	mBg1: cc.Sprite = null;

	@property(cc.Sprite)
	mTest: cc.Sprite = null;

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
		
		this.mBg1.node.on(cc.Node.EventType.TOUCH_START, this.back2Click, this);
		this.getUserInfo(this.usrId);
		
	}

	back2Click(event) {
		this.node.getComponentInChildren(MapItenListControl).disShow();
		this.node.getComponentInChildren(OtherSettingControl).disShow();
	}

	//usrId = "default";
	usrId = "xXC5RbZkP";
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

		cc.loader.load("http://120.79.249.55/images/item_money_bg.png", function (err, texture) {
			var sprite = new cc.SpriteFrame(texture);
			self.mTest.spriteFrame = sprite;
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

		var buystr = this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).buy;
		console.log("buystr= " + buystr);
		this.mMapTimePre = 10000;
		this.mMapMoneyPre = 10000;
		this.mMapZichang = 0;
		if (buystr != null && buystr.length > 0) {
			var buyList = buystr.split(",");
			this.dealBeforeBuy(buyList);
		}


		this.node.getComponentInChildren(BuilderListControl).init(this);
		console.log(" builderInit  ");
		this.mZuanshi.string = NumberToString.numberToString(this.mUserInfo.zuanshi);
		this.aZichang.string = NumberToString.numberToString(this.mUserInfo.zichang);
		this.allMeney.string = NumberToString.numberToString(this.mUserInfo.money);
		this.getEachMoney();
		this.eachMoney.string = NumberToString.numberToString(this.mEanMoney);
		this.node.getComponentInChildren(MapItenListControl).init(this)
		this.isLoading = true;
		this.initShop();
	}

	getEachMoney() {
		this.mEanMoney = 0;
		console.log("getEachMoney " );
		this.mUserInfo.mapBuilderStatus.forEach((value, key) => {
			this.mEanMoney += value.eachmoney;
			console.log("getEachMoney value.eachmoney = " + value.eachmoney);
		});
	}


	mMapTimePre = 10000;
	mMapMoneyPre = 10000;
	mMapZichang = 0;
	dealBeforeBuy(buyList: string[]) {
		this.mMapTimePre = 10000;
		this.mMapMoneyPre = 10000;
		this.mMapZichang = 0;
		this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).zibenbeilv = 0;
		buyList.forEach((value, index) => {
			console.log("dealBeforeBuy value = " + value);
			var buy = Number(value);
			var buybean = this.mUserInfo.mShopItem.get(buy);
			if (buybean.dealtype == 1) {
				var id = buybean.parame;
				this.mUserInfo.mapBuilderStatus.get(id).auto = 1;
			} else if (buybean.dealtype == 2) {
				var builderList = this.mUserInfo.mapInfo.get(this.mUserInfo.current_map).builde_id.split(",");
				this.mMapTimePre = (this.mMapTimePre * (1 - buybean.parame / 10000)) >> 0;
				console.log("dealBeforeBuy this.mMapTimePre = " + this.mMapTimePre);
			} else if (buybean.dealtype == 3) {
				this.mMapZichang += buybean.parame;
				console.log("dealBeforeBuy this.mMapZichang = " + this.mMapZichang);
			} else if (buybean.dealtype == 4) {
				console.log("dealBeforeBuy this.mMapMoneyPre = " + buybean.parame);
				this.mMapMoneyPre = (this.mMapMoneyPre * (1 + buybean.parame / 10000)) >> 0;
				console.log("dealBeforeBuy this.mMapMoneyPre = " + this.mMapMoneyPre);
			}
			
			
			
		});
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

		
		this.getEachMoney();
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

	initShop() {
		this.node.getComponentInChildren(ShopControl).init(this);
	}

	enableBuilder(id: number) {
		console.log("this.mUserInfo.money = " + this.mUserInfo.money);
		console.log(" this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost = " + this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost);
	//	if (this.mUserInfo.money > 0) {
			if (this.mUserInfo.money >= this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost) {
			//	this.mUserInfo.money -= this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost;
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
		buidStatus.auto = 0;
		this.mUserInfo.mapBuilderStatus.set(id, buidStatus);


		this.node.getComponentInChildren(BuilderListControl).enableBuilder(id);
		var req = new RequiteChangeBuilder();
		var req2 = new RequiteBuilderStatusBean();
		req2.copy(buidStatus);
		req.user = this.usrId;
		req.date = req2;
		HttpUtil.addBuilder("changebuilder", req);
		this.getEachMoney();
		this.eachMoney.string = NumberToString.numberToString(this.mEanMoney);
		this.initShop();
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
			this.mLevelUpTip.setScale(0, 0);
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
			this.mLevelUpTip.setScale(1, 1	);

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

	buy(bean: ShopItemInfoBean): boolean{
		console.log(" bean.costtype   = " + bean.costtype);
		console.log(" bean.parame   = " + bean.parame);
		console.log(" this.mUserInfo.zichang   = " + this.mUserInfo.zichang);
		console.log(" this.mUserInfo.money   = " + this.mUserInfo.money);
		if (bean.costtype == 1) {
			if (this.mUserInfo.money < bean.cost) {
				return false;
			}
			this.mUserInfo.money -= bean.cost;
		} else if (bean.costtype == 2) {
			if (this.mUserInfo.zichang < bean.cost) {
				return false;
			}
			this.mUserInfo.zichang -= bean.cost;
		}
		var req = new RequiteBuyDaoju();
		req.user = this.usrId;
		req.costcount = bean.parame + "";
		req.costtype = bean.costtype;
		req.id = bean.id;
		req.mapId = this.mUserInfo.current_map;
		HttpUtil.buy("daoju", req);

		if (bean.dealtype == 1) {
			var id = bean.parame;
			this.mUserInfo.mapBuilderStatus.get(id).auto = 1;
		}else if (bean.dealtype == 2) {
			//var builderList = this.mUserInfo.mapInfo.get(this.mUserInfo.current_map).builde_id.split(",");
			this.mMapTimePre = (this.mMapTimePre * (1 - bean.parame / 10000)) >> 0;
		} else if (bean.dealtype == 3) {
			this.mMapZichang += bean.parame;
		} else if (bean.dealtype == 4) {
			this.mMapMoneyPre = (this.mMapMoneyPre * (bean.parame / 10000)) >> 0;
		}
		this.node.getComponentInChildren(BuilderListControl).updateValue();

		this.aZichang.string = NumberToString.numberToString(this.mUserInfo.zichang);
		this.allMeney.string = NumberToString.numberToString(this.mUserInfo.money);
		this.getEachMoney();
		this.eachMoney.string = NumberToString.numberToString(this.mEanMoney);
		var buystr = this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).buy;
		if (buystr != null && buystr.length > 0) {
			buystr = buystr + "," + bean.id;
		} else {
			buystr = "" + bean.id;
		}
		this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).buy = buystr;
		this.initShop();
		return true;
	}

	openMap(id: number) {
		if (id == this.mUserInfo.current_map) {
			return;
		}
		var map = this.mUserInfo.mHaveMap.get(id);
		if (map == null) {
			console.log("lock id= " + id);
			this.node.getComponentInChildren(UnlockMapView).show(this, id);
			return;
		}
		console.log("open id= " + id);
		var bean = new RequiteAddMap();
		bean.user = this.usrId;
		bean.cost = "0";
		bean.mapid = id;
		bean.isnew = 0;
	
		HttpUtil.addMap("addmap", bean);
	}
	reStart() {
		this.isInit = false;
		this.isInited = false;
		this.getUserInfo(this.usrId);
	}

	showChange() {
		this.mLoading.node.setScale(1, 1);
	}
	isShowShop = false;
	clickShop() {
		if (this.isShowShop) {
			this.isShowShop = false;
			this.node.getComponentInChildren(ShopControl).disShow();
		} else {
			this.isShowShop = true;
			this.node.getComponentInChildren(ShopControl).show();
		}
	}



}
