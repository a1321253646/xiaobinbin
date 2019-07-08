const { ccclass, property } = cc._decorator;
import GameControl from './GameControl';
import HaveMapInfo from '../bean/HaveMapInfo';
import RequiteAddMoney from '../bean/RequiteAddMoney';
import RequiteZichang from '../bean/RequiteZichang';
import RequitAddMoneyItem from '../bean/RequitAddMoneyItem';
import HttpUtil from '../ultis/HttpUtil';
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

	// LIFE-CYCLE CALLBACKS:

	// onLoad () {}

	mGame: GameControl;
	mCoint = 0;
	mDeleteCoint = 0;
	mDeleteBuilderCount = 0;
	mDeleteDaojuCount = 0;
	mZichang = 0;


	show() {
		this.mSaleBt.node.setScale(0, 0);
		this.node.setScale(1, 1);

		this.mGame = cc.find("Canvas").getComponent(GameControl);
		this.mCoint = 0;
		this.mDeleteCoint =0;
		this.mDeleteBuilderCount = 0;
		this.mDeleteDaojuCount = 0;
		this.mZichang = 0;



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
		this.mZichang = (map.creat * 0.01) >> 0;
		this.mCoin.string = map.creat + "";
		this.mDeleteBuilder.string = this.mDeleteBuilderCount + "";
		this.mZiBen.string = this.mZichang + "";
		this.mDeleteDaoju.string = this.mDeleteDaojuCount + "";
		this.mDeleteCoin.string = this.mDeleteCoint + "";
		console.log(" this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).time =  " + this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).time);
		var time123 = new Date().getTime();
		console.log(" time =  " + time123);
		if (this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).time == 0) {
			this.mWaiteTime.string = "现在可以出售资产";
		}

	}


	start() {

	}

	close() {
		this.mSaleBt.node.setScale(1, 1);
		this.node.setScale(0, 0);
	}

	sure() {
		this.mGame.showChange();
		var req = new RequiteZichang();
		req.user = this.mGame.usrId;
		req.zichang = this.mZichang + "";
		req.money = this.mDeleteCoint + "";
		HttpUtil.addZichang("addzichang", req);
	}
	friend() {

	}
	// update (dt) {}
}
