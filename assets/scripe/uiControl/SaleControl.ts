const { ccclass, property } = cc._decorator;
import GameControl from './GameControl';
import HaveMapInfo from '../bean/HaveMapInfo';
import RequiteAddMoney from '../bean/RequiteAddMoney';
import RequiteZichang from '../bean/RequiteZichang';
import RequitAddMoneyItem from '../bean/RequitAddMoneyItem';
import RequiteBuy from '../bean/RequiteBuy';
import ZichangToJinbinBean from '../bean/ZichangToJinbinBean';
import HttpUtil from '../ultis/HttpUtil';
import NumberToString from '../ultis/NumberToString';
@ccclass
export default class NewClass extends cc.Component {



	@property(cc.Label)
	mCoin: cc.Label = null
	@property(cc.Label)
	mZiBen: cc.Label = null
	@property(cc.Label)
	mDeleteCoin: cc.Label = null
	@property(cc.Label)
	mDeleteBuilder: cc.Label = null
	@property(cc.Label)
	mDeleteDaoju: cc.Label = null
	@property(cc.Label)
	mWaiteTime: cc.Label = null

	@property(cc.Button)
	mFriend: cc.Button = null

	@property(cc.Button)
	mSaleBt: cc.Button = null
	@property(cc.Label)
	mSaleTx: cc.Label = null
	// LIFE-CYCLE CALLBACKS:

	// onLoad () {}

	mGame: GameControl;
	mCoint = 0;
	mDeleteCoint = 0;
	mDeleteBuilderCount = 0;
	mDeleteDaojuCount = 0;
	mZichang = 0;
	isCanSure = true;
	leftTime = 0;
	mTime = 0;
	mIsShow = false;

	show() {
		this.mSaleBt.node.setScale(0, 0);
		this.node.setScale(1, 1);

		this.mGame = cc.find("Canvas").getComponent(GameControl);
		this.mCoint = 0;
		this.mDeleteCoint =0;
		this.mDeleteBuilderCount = 0;
		this.mDeleteDaojuCount = 0;
		this.mZichang = 0;

		var list: String[] = this.mGame.mUserInfo.mapInfo.get(this.mGame.mUserInfo.current_map).builde_id.split(",");
		for (var i = 0; i < list.length; i++) {
			var key = Number(list[i]);
			console.log(" this.mGame.mUserInfo.mapBuilderInfo key=  " + key);
			var status = this.mGame.mUserInfo.mapBuilderStatus.get(key);
			if (status != null) {
				this.mDeleteBuilderCount++;
//				this.mCoint += status.allmoney;
			}
		}



/*		if (this.mGame.mUserInfo.mapBuilderStatus.size != 0) {
			var list: String[] = this.mGame.mUserInfo.mapInfo.get(this.mGame.mUserInfo.current_map).builde_id.split(",");
			for (var i = 0; i < list.length; i++) {
				var key = Number(list[i]);
				console.log(" this.mGame.mUserInfo.mapBuilderInfo key=  " + key);
				var status = this.mGame.mUserInfo.mapBuilderStatus.get(key);
				if (status != null) {
					this.mDeleteBuilderCount++;
					this.mCoint += status.allmoney;
				}
			}
		}
		console.log("this.mCoint=  " + this.mCoint);*/
		var map = this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map)
		var coin = map.creat - map.cost;
		if (coin < 0) {
			coin = 0;
		}
		this.mDeleteCoint = coin;
		var buy = map.buy;
		if (buy == null || buy.length == 0) {
			this.mDeleteDaojuCount = 0;
		} else {
			this.mDeleteDaojuCount = buy.split(",").length;
		}
		var tmp1: number = 0;
		this.mZichang = 0;
		for (var i = 0; i < this.mGame.mUserInfo.mZichangToJingbin.length; i++) {
			var jingbin = this.mGame.mUserInfo.mZichangToJingbin[i];

			if (map.creat > jingbin.value) {
				this.mZichang += ((jingbin.value - tmp1) / jingbin.beilv);
				tmp1 = jingbin.value;
			} else{
				this.mZichang +=((map.creat - tmp1) / jingbin.beilv);
				break;
			}
		}

		this.mZichang = Math.round(this.mZichang);
		this.mCoin.string = NumberToString.numberToString(map.creat );
		this.mDeleteBuilder.string = this.mDeleteBuilderCount + "";
		this.mZiBen.string = NumberToString.numberToString(this.mZichang);
		this.mDeleteDaoju.string = this.mDeleteDaojuCount + "";
		this.mDeleteCoin.string = NumberToString.numberToStringToFour(this.mDeleteCoint); 
		console.log("salezichang this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).time =  " + this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).time);
		var time123 = new Date().getTime();
		console.log("salezichang time123 =  " + time123);
		console.log(" time =  " + time123);
		if (this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).time == 0) {
			this.mWaiteTime.string = "现在可以出售产业";
			this.mSaleTx.string = "出售产业"
			this.isCanSure = true;
		} else {
			var left = time123 - this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).time -
				this.mGame.mUserInfo.mapInfo.get(this.mGame.mUserInfo.current_map).salecd * 60 * 60 * 1000;
			if (left > 0) {
				this.mWaiteTime.string = "现在可以出售产业";
				this.mSaleTx.string = "出售产业";
				this.isCanSure = true;
			} else {
				this.isCanSure = false;
				this.leftTime = Math.round(-left/1000);
				console.log("salezichang leftTime =  " + this.leftTime);
			}
		}
		this.mIsShow = true;
	}

	update(dt) {
		if (!this.mIsShow) {
			return;
		}
		if (!this.isCanSure) {
			this.mTime += dt;
			if (this.mTime > 1) {
				this.mTime -= 1;
				this.leftTime -= 1;
				var left = this.leftTime;
				console.log("salezichang left =  " + left);
				var day = Number(((left / (24 * 60 * 60))+"").split(".")[0]);//计算整数天数
				console.log("salezichang day =  " + day);
				left = left - day * 24 * 60 * 60;//取得算出天数后剩余的秒数

				var hour = Number((left / (60 * 60)).toFixed(2).split(".")[0]);//计算整数小时数
				console.log("salezichang hour =  " + hour);
				left = left - hour * 60 * 60;//取得算出小时数后剩余的秒数

				var min = Number(((left / 60) + "").split(".")[0]); //计算整数分
				console.log("salezichang min =  " + min);
				var afterMin = left - min * 60;//取得算出分后剩余的秒数
				console.log("salezichang afterMin =  " + afterMin);
				if (day == 0 && hour == 0 && min == 0 && afterMin == 0) {
					this.mWaiteTime.string = "现在可以出售产业";
					this.mSaleTx.string = "出售产业";
					this.isCanSure = false;
				
				} else {
					var h = day * 24 + hour;
					this.mWaiteTime.string = "" + (h == 0 ? "" : (h + "h")) +
						(min == 0 ? (h == 0 ? "" : "00m") : (min < 10 ? ("0" + min + "m") : (min + "m"))) + (afterMin == 0 ? ("00s") : (afterMin < 10 ? ("0" + afterMin + "s") : (afterMin + "s"))) +
						"之后可以出售产业\n你也可以立即出售";
					this.mSaleTx.string = "立即出售";
				}
			}

		}
	}

	start() {

	}

	close() {
		this.mSaleBt.node.setScale(1, 1);
		this.node.setScale(0, 0);
		this.mIsShow = false;
	}

	sure() {
		this.mGame.showChange();


		var unlock = this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).unlock == 1;
		console.log("unlock =" + unlock);
		if (!unlock) {
			unlock = true;
			var map = this.mGame.mUserInfo.mapInfo.get(this.mGame.mUserInfo.current_map);
			var builders = map.builde_id.split(",");

			for (var i = 0; i < builders.length; i++) {
				var id = Number(builders[i]);
				console.log("id =" + id);
				if (this.mGame.mUserInfo.mapBuilderStatus.get(id) == null) {
					unlock = false;
					break;
				}
			}

		}
		this.mGame.mUserInfo.money -= this.mDeleteCoint;
		this.mGame.mUserInfo.zichang += this.mZichang;

		var req = new RequiteBuy();
		req.type = 1;
		req.mapid = this.mGame.mUserInfo.current_map;
		req.allMoney = this.mGame.mUserInfo.money + "";
		req.allZichang = this.mGame.mUserInfo.zichang + "";
		req.histroy = this.mGame.mUserInfo.history + "";
		req.mapCreat = this.mGame.mUserInfo.mHaveMap.get(req.mapid).creat + "";
		req.mapCost = this.mGame.mUserInfo.mHaveMap.get(req.mapid).cost + "";
		req.user = this.mGame.usrId;
		req.unlock = unlock ? 1 : 0;
		req.zibenbeilv = this.mGame.mUserInfo.mHaveMap.get(req.mapid).zibenbeilv + "";
		req.moneybeilv = this.mGame.mUserInfo.mHaveMap.get(req.mapid).moneybeilv + "";
		req.timebeilv = this.mGame.mUserInfo.mHaveMap.get(req.mapid).timebeilv + "";
		HttpUtil.sale("sale", req);
		this.close();
	}
	friend() {

	}
	// update (dt) {}
}
