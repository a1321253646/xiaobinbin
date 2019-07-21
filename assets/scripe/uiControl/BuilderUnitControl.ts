const { ccclass, property } = cc._decorator;
import BuilderStatusBean from '../bean/BuilderStatusBean';
import BuilderUiControl from './BuilderUiControl';
import BuilderJsonInfo from './BuilderUiControl';
import GameControl from './GameControl';
import UinitCoinControl from './UinitCoinControl';
import NumberToString from '../ultis/NumberToString';
@ccclass
export default class NewClass extends cc.Component {


	@property(cc.Sprite)
	coinIcon: cc.Sprite = null;

	@property(cc.Label)
	coinTx: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
		
    }
	isEnable: boolean = false;

	mId : number;
	mGame: GameControl;
	unInit(id: number, game: GameControl) {
		this.isEnable = false;
		this.mId = id;;
		this.mGame = game;;

		//if (this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(0).level_up_cost != 0) {
			this.coinTx.string = NumberToString.numberToString(this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(0).level_up_cost );
	//	} else {
	//		this.coinTx.string = "";
//		}
		
		this.node.getComponentInChildren(UinitCoinControl).init(this);

		if (id == 10001 && game.mUserInfo.mHaveMap.get(game.mUserInfo.current_map).time == 0) {
			this.mGame.mGuideControl.show(this.node.parent.getPosition().x + this.node.getPosition().x + this.coinIcon.node.getPosition().x,
				this.node.parent.getPosition().y + this.node.getPosition().y + this.coinIcon.node.getPosition().y,
				this.coinIcon.node.getContentSize().width, this.coinIcon.node.getContentSize().height, "激活第一个建筑",1);
		}
	}

	isEable(): boolean {
		console.log("this.mGame.mUserInfo.money = " + this.mGame.mUserInfo.money);
		console.log("this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(0).level_up_cost = " + this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(0).level_up_cost);
		if (this.mGame.getAllMoney()  >= this.mGame.mUserInfo.mapBuilderLevelInfo.get(this.mId).get(0).level_up_cost) {
			return true;
		} else {
			return false;
		}
	}

	public gainMoney() {
		if (!this.isEnable && this.isEable()) {
			this.isEnable = true;
			this.mGame.enableBuilder(this.mId);
			if (this.mId == 10001 && this.mGame.mUserInfo.mHaveMap.get(this.mGame.mUserInfo.current_map).time == 0) {
				this.mGame.mGuideControl.disShow();
				this.mGame.guide(2);
			}

			return;
		}		
	}
}