const {ccclass, property} = cc._decorator;
import GameControl from './GameControl';
import ShopItemInfoBean from '../bean/ShopItemInfoBean';
import NumberToString from '../ultis/NumberToString';
@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Label)
	mCostCount: cc.Label = null;

	@property(cc.Sprite)
	mCostIcon: cc.Sprite = null;

	@property(cc.Sprite)
	icon: cc.Sprite = null;

	@property(cc.Label)
	desc: cc.Label = null;
	@property(cc.Button)
	mButton: cc.Button = null;

	mGame: GameControl;
	mId: number;
	mBean: ShopItemInfoBean;
	init(game: GameControl, id: number,isHaveNext:boolean) {
		if (!isHaveNext) {
			this.mButton.interactable = false;
		}
		this.mGame = game;
		this.mId = id;
		var self = this;
		this.node.setScale(1, 1);
		console.log(" this.mBean.icon id  = " + this.mId);
		this.mBean = this.mGame.mUserInfo.mShopItem.get(id);
		console.log(" this.mBean.icon = " + this.mBean.icon);
		console.log(" this.mBean.icon cost  = " + this.mBean.cost);
		cc.loader.load("http://120.79.249.55/images/shopItemIcon/" + this.mBean.icon + ".png", function (err, texture) {
			var sprite = new cc.SpriteFrame(texture);
			self.icon.spriteFrame = sprite;
		});

		this.desc.string = this.getString();
		var iconPath = "";
		if (this.mBean.costtype == 1) {
			iconPath = "sub_itembig01";
		} else if(this.mBean.costtype == 2){
			iconPath = "sub_itembig02";
		}
		cc.loader.loadRes(iconPath, cc.SpriteFrame, function (err, spriteFrame) {
			self.mCostIcon.spriteFrame = spriteFrame;
		});

		
		this.mCostCount.string = NumberToString.numberToString(this.mBean.cost);
		
		if (this.mBean.dealtype == 1) {
			var b = this.mGame.mUserInfo.mapBuilderStatus.get(this.mBean.parame);
			if (b == null) {
				this.mButton.interactable = false;
			} else {
				this.mButton.interactable = true;

			}
		}
	}


	updateValue() {
		if (this.mBean.costtype == 1) {
			if (this.mGame.getAllMoney() >= this.mBean.cost) {
				this.mButton.interactable = true;
			} else {
				this.mButton.interactable = false;
			}
		} else if (this.mBean.costtype == 2) {
			if (this.mGame.mUserInfo.zichang >= this.mBean.cost) {
				this.mButton.interactable = true;
			} else {
				this.mButton.interactable = false;
			}
		}
	}



	getString(): string {
		console.log(" this.mBean.des  = " + this.mBean.desc);
		//console.log(" this.mBean.des  = " + this.mBean.des);
		var back = this.mGame.mUserInfo.mString.get(this.mBean.desc);
		console.log(" this.mBean.des  back= " + back);
		if (back.match("&n")) {
			console.log(" back.match( & n) ");
			var b = this.mGame.mUserInfo.mapBuilderStatus.get(this.mBean.parame);
			var level = 0;
			if (b != null) {
				level = this.mGame.mUserInfo.mapBuilderStatus.get(this.mBean.parame).level;
			}
			var resource = this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mBean.parame).get(level).icon
			console.log(" resource =  " + resource);
			
			var name = this.mGame.mUserInfo.mString.get(this.mGame.mUserInfo.mapBuilderInfo.get(resource).name);
			console.log(" name =  " + name);
			back = back.replace("&n", name);
		}
		if (back.match("&p")) {
			console.log(" back.match( & p) ");
			var newStr = "";
			var b2 = this.mBean.parame / 100;
			if (b2 > 100) {
				b2 = b2 / 100;
			}
			var b2str = b2.toFixed(2);
			b2 = Number(b2str);
			back = back.replace("&p", b2+"");
		}
		back = back.replace("\\n","\n");
		console.log("end this.mBean.des  = " + back);
		return back;
	}


	buy() {
		console.log(" buy id   = " + this.mBean.id);
		this.mGame.buy(this.mBean)
	}
	reset() {
		this.mId = 0;
		this.node.setScale(0, 0);
	}

}
