const { ccclass, property } = cc._decorator;
import BuilderListControl from './BuilderListControl'
import UserDateBean from '../bean/UserDateBean'
import RequiteChangeBuilder from '../bean/RequiteChangeBuilder'
import RequiteBuilderStatusBean from '../bean/RequiteBuilderStatusBean'
import BuilderStatusBean from '../bean/BuilderStatusBean'
import RequiteAddMoney from '../bean/RequiteAddMoney'
import RequiteAddMap from '../bean/RequiteAddMap'
import ShopItemInfoBean from '../bean/ShopItemInfoBean'
import RequiteZichang from '../bean/RequiteZichang'
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
import FlyTextControl from './FlyTextControl'
import FlyCoinControl from './FlyCoinControl'
import OutlineControl from './OutlineControl'
import GuideControl from './GuideControl'
import LevelEnableControl from './LevelEnableControl'

import RequiteBuy from '../bean/RequiteBuy'
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
	mLoading: cc.Sprite = null;

	@property(cc.Label)
	mLevelUpCount: cc.Label = null;

	@property(cc.AudioClip)
	mCoinSource: cc.AudioClip = null;

	@property(cc.AudioClip)
	mLevelUpSource: cc.AudioClip = null;

	@property(cc.ProgressBar)
	mLoadingBar: cc.ProgressBar = null;

	@property(cc.Label)
	mLoadingTx: cc.Label = null;

	@property(cc.Prefab)
	mFlyCoin: cc.Prefab = null;
	@property(cc.Prefab)
	mFlyText: cc.Prefab = null;

	@property(OutlineControl)
	mOutLineControl: OutlineControl = null;

	@property(cc.Canvas)
	mCanvas: cc.Canvas = null;

	@property(LevelEnableControl)
	mLevelEnableControl: LevelEnableControl = null;
	@property(GuideControl)
	mGuideControl: GuideControl = null;

	mEanMoney = 0;

	public mUserInfo: UserDateBean;
	public isInit = false;
	public isInited = false;
	public isShowlevel = false;

	levelUpCount = 1;
	start() {

		var windowSize = cc.view.getFrameSize();
		var w = Number((windowSize.width + "").split(".")[0]);
		var h = Number((windowSize.height + "").split(".")[0]);
		cc.log("width=" + w + ",height=" + h);

		if (h/ 1280 > w / 720) {
			this.mCanvas.fitHeight = false;
			this.mCanvas.fitWidth = true;
		} else{
			this.mCanvas.fitHeight = true;
			this.mCanvas.fitWidth = false;
		}



		//>>>>>>>>>>>>>>>>>>>>>>微信
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
		})
		wx.onShow(function (res) {
			console.log("weixin onShow");
			if (!self.isAppShow) {
				self.showChange();
				
				self.reStart();
			}
			self.isAppShow = true;
		})

		wx.onHide(function (res) {
			console.log("weixin onHide");
			self.isAppShow = false;
			self.showChange();
		})*/
		//<<<<<<<<<<<<<<<<<<<<<<<微信
		this.mBg1.node.on(cc.Node.EventType.TOUCH_START, this.back2Click, this);
		//>>>>>>>>>>>>>>>>>>>>>>>>>cocos
		this.getUserInfo(this.usrId);
		//<<<<<<<<<<<<<<<<<<<<<<<cocos

	}
	isAppShow = true;
	back2Click(event) {
		this.node.getComponentInChildren(MapItenListControl).disShow();
		this.node.getComponentInChildren(OtherSettingControl).disShow();
	}
	//>>>>>>>>>>>>>>>>>>>>>>微信
	//usrId = "default";
	//<<<<<<<<<<<<<<<<<<<<<<<微信
	//>>>>>>>>>>>>>>>>>>>>>>>>>cocos
	usrId = "xXC5RbZkP";
	//<<<<<<<<<<<<<<<<<<<<<<<cocos
	getUserInfo(user2: string) {
		this.usrId = user2;
	//	if (this.mUserInfo == null) {
			this.mUserInfo = new UserDateBean();
	//	} 
		HttpUtil.postLocal("getuser", { user: user2 }, this);
	}
	isLoading = false;
	isLoadingCount = 0;
	isLoadingCountMax = 0;

	mLoadingTime = 0;
	update(dt) {
		if (!this.isInit) {
			return;
		}



		if (this.isLoading) {
			this.mLoadingTime += dt;
			if (this.mLoadingTime >= 3) {
				this.mLoadingTime = 0;
				this.mLoadingTx.string = "加载中."
			} else if (this.mLoadingTime >= 2) {
				this.mLoadingTx.string = "加载中..."
			} else if (this.mLoadingTime >= 1) {
				this.mLoadingTx.string = "加载中.."
			} else if (this.mLoadingTime >= 2) {
				this.mLoadingTx.string = "加载中."
			}

			if (this.isLoadingCount == 0) {
				this.isLoading = false;
				this.mLoading.node.setScale(0, 0);
			} else {
				this.mLoadingBar.progress = (this.isLoadingCountMax - this.isLoadingCount) / this.isLoadingCountMax;
			}
			

		}

		if (!this.isInited) {
			this.builderInit();
			this.isInited = true;
		}
	}

	builderInit() {
		this.mLoadingTime = 0;
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

		var buystr = this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).buy;
		console.log("buystr= " + buystr);
		this.mMapTimePre = this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).timebeilv;
		this.mMapMoneyPre = this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).moneybeilv;
		this.mMapZichang = this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).zibenbeilv;



		this.node.getComponentInChildren(BuilderListControl).init(this);
		console.log(" builderInit  ");
		this.mZuanshi.string = NumberToString.numberToString(this.mUserInfo.zuanshi);
		this.aZichang.string = NumberToString.numberToString(this.mUserInfo.zichang);
		this.changeAllMoneyCount();
		this.getEachMoney();
		this.node.getComponentInChildren(MapItenListControl).init(this)
		this.isLoading = true;
		this.initShop();
		this.isLoadingCountMax = this.isLoadingCount;
		this.mOutLineControl.show(this);
	}

	getEachMoney() {
		this.mEanMoney = 0;
		console.log("getEachMoney ");


		this.mUserInfo.mHaveMap.forEach((value, key) => {
			var zichangBl = value.zibenbeilv;
			var moneyBl = value.moneybeilv;
			var timeBl = value.timebeilv;
			var beilv = this.mUserInfo.zichang * (0.02 +
				zichangBl / 10000);
			beilv = beilv + 1;
			var strs: string[] = this.mUserInfo.mapInfo.get(key).builde_id.split(",");
			for (var i = 0; i < strs.length; i++) {
				var builderid = Number(strs[i]);
				var b = this.mUserInfo.mapBuilderStatus.get(builderid);
				if (b != null) {
					var money = b.creatBase * (b.money_pre / 10000) * beilv * (moneyBl / 10000);
					var time = (b.creatTime / 1000) * (b.time_pre / 10000) * (timeBl / 10000);
					console.log("getEachMoney time = " + time + " b.creatTime=" + b.creatTime + " timeBl=" + timeBl + " b.time_pre= " + b.time_pre); 
					this.mEanMoney += (money * (1 / time));
				}
			}
		});
		this.mEanMoney = Math.round(this.mEanMoney);
		this.eachMoney.string = NumberToString.numberToString(this.mEanMoney) + "/s";
	}


	mMapTimePre = 10000;
	mMapMoneyPre = 10000;
	mMapZichang = 0;


	levelup(id: number, count: number,cost:number,isPlaySource:boolean) {
		var buidStatus = this.mUserInfo.mapBuilderStatus.get(id);

		buidStatus.level = buidStatus.level + count;
		this.node.getComponentInChildren(BuilderListControl).levelUpDeal(id);

		
		this.getEachMoney();
		this.mUserInfo.money -= cost;
		this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).cost += cost;

		var req2 = new RequiteBuilderStatusBean();
		req2.copy(buidStatus);
		var req = new RequiteBuy();
		req.type = 2;
		req.mapid = this.mUserInfo.current_map;
		req.allMoney = this.mUserInfo.money+"";
		req.allZichang = this.mUserInfo.zichang + "";
		req.histroy = this.mUserInfo.history + "";
		req.mapCreat = this.mUserInfo.mHaveMap.get(req.mapid).creat + "";
		req.mapCost = this.mUserInfo.mHaveMap.get(req.mapid).cost + "";
		req.zibenbeilv = this.mUserInfo.mHaveMap.get(req.mapid).zibenbeilv + "";
		req.moneybeilv = this.mUserInfo.mHaveMap.get(req.mapid).moneybeilv + "";
		req.timebeilv = this.mUserInfo.mHaveMap.get(req.mapid).timebeilv + "";
		req.user = this.usrId;
		req.builderInfo = req2;
		HttpUtil.buy("buy", req);
		this.changeAllMoneyCount();
		cc.audioEngine.play(this.mLevelUpSource, false,0.5);

	}

	initShop() {
		this.node.getComponentInChildren(ShopControl).init(this);
	}

	enableBuilder(id: number) {
		console.log("this.mUserInfo.money = " + this.mUserInfo.money);
		console.log(" this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost = " + this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost);
		//	if (this.mUserInfo.money > 0) {
		if (this.getAllMoney() < this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost) {
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
		buidStatus.auto = 0;
		this.mUserInfo.mapBuilderStatus.set(id, buidStatus);
		this.node.getComponentInChildren(BuilderListControl).enableBuilder(id);
		this.mUserInfo.money -= this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost;
		this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).cost += this.mUserInfo.mapBuilderLevelInfo.get(id).get(0).level_up_cost;
		if (id == 10002 && this.mUserInfo.zichang == 0) {
			this.mUserInfo.zichang = 100;
			this.aZichang.string = this.mUserInfo.zichang + "";
			this.node.getComponentInChildren(BuilderListControl).updateValue();
		}

		var req2 = new RequiteBuilderStatusBean();
		req2.copy(buidStatus);
		var req = new RequiteBuy();
		req.type = 1;
		req.mapid = this.mUserInfo.current_map;
		req.allMoney = this.mUserInfo.money + "";
		req.allZichang = this.mUserInfo.zichang + "";
		req.histroy = this.mUserInfo.history + "";
		req.mapCreat = this.mUserInfo.mHaveMap.get(req.mapid).creat + "";
		req.mapCost = this.mUserInfo.mHaveMap.get(req.mapid).cost + "";
		req.zibenbeilv = this.mUserInfo.mHaveMap.get(req.mapid).zibenbeilv + "";
		req.moneybeilv = this.mUserInfo.mHaveMap.get(req.mapid).moneybeilv + "";
		req.timebeilv = this.mUserInfo.mHaveMap.get(req.mapid).timebeilv + "";
		req.user = this.usrId;
		req.builderInfo = req2;
		HttpUtil.buy("buy", req);
		this.changeAllMoneyCount();

		this.getEachMoney();
		
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

			if (this.levelUpCount == 10000) {
				this.mLevelUpCount.string = "max";
			} else {
				this.mLevelUpCount.string = "x" + this.levelUpCount;
			}
		}
		
		this.node.getComponentInChildren(BuilderListControl).showLevelUp();
	}

	clickSecondButton() {
		if (this.isShowlevel) {
			if (this.levelUpCount == 1) {
				this.levelUpCount = 5;
				this.mLevelUpCount.string = "x5" ;
			}
			else if(this.levelUpCount == 5) {
				this.levelUpCount = 10;
				this.mLevelUpCount.string = "x10" ;
			}
			else if (this.levelUpCount == 10) {
				this.levelUpCount = 10000;
				this.mLevelUpCount.string = "max" ;
			}
			else if (this.levelUpCount == 10000) {
				this.levelUpCount = 1;
				this.mLevelUpCount.string = "x1";
			}
			this.node.getComponentInChildren(BuilderListControl).changeUpCount(this);
			
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
			if (this.getAllMoney() < bean.cost) {
				return false;
			}
			this.mUserInfo.money -= bean.cost;
			this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).cost += bean.cost;

		} else if (bean.costtype == 2) {
			if (this.mUserInfo.zichang < bean.cost) {
				return false;
			}
			this.mUserInfo.zichang -= bean.cost;
		}

		var req = new RequiteBuy();
		if (bean.dealtype == 1) {
			var id = bean.parame;
			this.mUserInfo.mapBuilderStatus.get(id).auto = 1;
			var reqb = new RequiteBuilderStatusBean();
			reqb.copy(this.mUserInfo.mapBuilderStatus.get(id));
			req.builderInfo = reqb;
		}else if (bean.dealtype == 2) {
			//var builderList = this.mUserInfo.mapInfo.get(this.mUserInfo.current_map).builde_id.split(",");
			this.mMapTimePre = (this.mMapTimePre * (1 - bean.parame / 10000)) >> 0;
			this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).timebeilv = this.mMapTimePre;
		} else if (bean.dealtype == 3) {
			this.mMapZichang += bean.parame;
			this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).zibenbeilv = this.mMapZichang;
		} else if (bean.dealtype == 4) {
			this.mMapMoneyPre = (this.mMapMoneyPre * (bean.parame / 10000)) >> 0;
			this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).moneybeilv = this.mMapMoneyPre;
		}
		this.node.getComponentInChildren(BuilderListControl).updateValue();

		this.aZichang.string = NumberToString.numberToString(this.mUserInfo.zichang);
		this.changeAllMoneyCount();
		this.getEachMoney();
		var buystr = this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).buy;
		if (buystr != null && buystr.length > 0) {
			buystr = buystr + "," + bean.id;
		} else {
			buystr = "" + bean.id;
		}
		this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).buy = buystr;
		
		req.type = 3;
		req.mapid = this.mUserInfo.current_map;
		req.allMoney = this.mUserInfo.money + "";
		req.allZichang = this.mUserInfo.zichang + "";
		req.histroy = this.mUserInfo.history + "";
		req.mapCreat = this.mUserInfo.mHaveMap.get(req.mapid).creat + "";
		req.mapCost = this.mUserInfo.mHaveMap.get(req.mapid).cost + "";
		req.user = this.usrId;
		req.daojuInfo = this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).buy;
		req.zibenbeilv = this.mUserInfo.mHaveMap.get(req.mapid).zibenbeilv + "";
		req.moneybeilv = this.mUserInfo.mHaveMap.get(req.mapid).moneybeilv + "";
		req.timebeilv = this.mUserInfo.mHaveMap.get(req.mapid).timebeilv + "";
		HttpUtil.buy("buy", req);

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

		var req = new RequiteBuy();
		req.type = 4;
		req.mapid = id;
		req.allMoney = this.mUserInfo.money + "";
		req.allZichang = this.mUserInfo.zichang + "";
		req.histroy = this.mUserInfo.history + "";
		req.mapCreat = this.mUserInfo.mHaveMap.get(req.mapid).creat + "";
		req.mapCost = this.mUserInfo.mHaveMap.get(req.mapid).cost + "";
		req.user = this.usrId;
		req.buyMapId = 0;
		req.zibenbeilv = this.mUserInfo.mHaveMap.get(req.mapid).zibenbeilv + "";
		req.moneybeilv = this.mUserInfo.mHaveMap.get(req.mapid).moneybeilv + "";
		req.timebeilv = this.mUserInfo.mHaveMap.get(req.mapid).timebeilv + "";
		HttpUtil.map("buy", req);
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
			this.node.getComponentInChildren(ShopControl).disShow();
		} else {
			this.node.getComponentInChildren(ShopControl).show();
		}
	}

	gainMenoy(id: number, menoy: number) {
		console.log("this.mUserInfo.money = " + this.mUserInfo.money);
		console.log("menoy = " + menoy);
		this.mUserInfo.money += menoy;
		console.log("this.mUserInfo.money = " + this.mUserInfo.money);
		this.mUserInfo.mapBuilderStatus.get(id).allmoney = this.mUserInfo.mapBuilderStatus.get(id).allmoney + menoy;
		this.mUserInfo.mapBuilderStatus.get(id).lastime = new Date().getTime();

		this.mUserInfo.mHaveMap.get(this.mUserInfo.current_map).creat += menoy;
		this.mUserInfo.history += menoy;
		var req = new RequiteBuy();

		var reqb = new RequiteBuilderStatusBean();
		reqb.copy(this.mUserInfo.mapBuilderStatus.get(id));
		req.builderInfo = reqb;
		req.type = 5;
		req.mapid = this.mUserInfo.current_map;
		req.allMoney = this.mUserInfo.money + "";
		req.allZichang = this.mUserInfo.zichang + "";
		req.histroy = this.mUserInfo.history + "";
		req.mapCreat = this.mUserInfo.mHaveMap.get(req.mapid).creat + "";
		req.mapCost = this.mUserInfo.mHaveMap.get(req.mapid).cost + "";
		req.user = this.usrId;
		req.zibenbeilv = this.mUserInfo.mHaveMap.get(req.mapid).zibenbeilv + "";
		req.moneybeilv = this.mUserInfo.mHaveMap.get(req.mapid).moneybeilv + "";
		req.timebeilv = this.mUserInfo.mHaveMap.get(req.mapid).timebeilv + "";
		HttpUtil.buy("buy", req);
		cc.audioEngine.play(this.mCoinSource, false, 0.5);
	}

	mFlyCoinList: Array<FlyCoinControl> = new Array<FlyCoinControl>();
	mFlyCount = 0;
	flyCoin(x: number, y: number, count: number) {
		var coin: FlyCoinControl;
		if (this.mFlyCoinList.length == 0) {
			var loadobj = cc.instantiate(this.mFlyCoin);
			cc.find("Canvas/Main Camera/builderUi").addChild(loadobj);
			coin = loadobj.getComponent(FlyCoinControl);
			this.mFlyCoinList.push(coin);
		}
		if (coin == null) {
			for (var i = 0; i < this.mFlyCoinList.length; i++) {
				if (!this.mFlyCoinList[i].isInit) {
					coin = this.mFlyCoinList[i];
					break;
				}
			}
			if (coin == null) {
				var loadobj2 = cc.instantiate(this.mFlyCoin);
				cc.find("Canvas/Main Camera/builderUi").addChild(loadobj2);
				coin = loadobj2.getComponent(FlyCoinControl);
				this.mFlyCoinList.push(coin);
			}
		}
		this.mFlyCount += count;
		coin.node.setPosition(x+30, y-30);
		coin.init(count, this);
		this.flyCountTx(x, y, count);

	}
	flyCoinEnd(count: number) {
		this.mFlyCount -= count;
		this.changeAllMoneyCount();
	}
	changeAllMoneyCount() {
		this.allMeney.string = NumberToString.numberToStringToFour(this.mUserInfo.money - this.mFlyCount );
	}
	getAllMoney(): number {
		return this.mUserInfo.money - this.mFlyCount;
	}

	mFlyTextList: Array<FlyTextControl> = new Array<FlyTextControl>();
	flyCountTx(x: number, y: number, count: number) {
		var coin: FlyTextControl;
		if (this.mFlyTextList.length == 0) {
			var loadobj = cc.instantiate(this.mFlyText);
			cc.find("Canvas/Main Camera/builderUi").addChild(loadobj);
			coin = loadobj.getComponent(FlyTextControl);
			this.mFlyTextList.push(coin);
		}
		if (coin == null) {
			for (var i = 0; i < this.mFlyTextList.length; i++) {
				console.log(" this.mFlyTextList.length =" + this.mFlyTextList.length);
				console.log("i =" + i);
				console.log("this.mFlyTextList[i] =" + this.mFlyTextList[i]);
				if (!this.mFlyTextList[i].isInit) {
					coin = this.mFlyTextList[i];
					break;
				}
			}
			if (coin == null) {
				var loadobj2 = cc.instantiate(this.mFlyText);
				cc.find("Canvas/Main Camera/builderUi").addChild(loadobj2);
				coin = loadobj2.getComponent(FlyTextControl);
				this.mFlyTextList.push(coin);
			}
		}
		coin.node.setPosition(x, y+45.5);
		coin.init(count);
	}
	testAddZichang() {
/*		this.mUserInfo.zichang += 100;
		this.aZichang.string = this.mUserInfo.zichang + "";
		var req = new RequiteBuy();
		req.type = 1;
		req.mapid = this.mUserInfo.current_map;
		req.allMoney = this.mUserInfo.money + "";
		req.allZichang = this.mUserInfo.zichang + "";
		req.histroy = this.mUserInfo.history + "";
		req.mapCreat = this.mUserInfo.mHaveMap.get(req.mapid).creat + "";
		req.mapCost = this.mUserInfo.mHaveMap.get(req.mapid).cost + "";
		req.zibenbeilv = this.mUserInfo.mHaveMap.get(req.mapid).zibenbeilv + "";
		req.moneybeilv = this.mUserInfo.mHaveMap.get(req.mapid).moneybeilv + "";
		req.timebeilv = this.mUserInfo.mHaveMap.get(req.mapid).timebeilv + "";
		req.user = this.usrId;
		HttpUtil.buy("buy", req);
		this.node.getComponentInChildren(BuilderListControl).updateValue();*/
	}


	guide(index: number) {
		if (index == 2) {
		}
		else if (index == 3) {
			var showLevel = cc.find("Canvas/Main Camera/gameUi/levelShow");
			this.mGuideControl.show(showLevel.getPosition().x, showLevel.getPosition().y, showLevel.getContentSize().width, showLevel.getContentSize().height, "打开升级界面", 1);
		}
		else if (index == 4) {
			this.node.getComponentInChildren(BuilderListControl).guide(3);
		}
	}
}
