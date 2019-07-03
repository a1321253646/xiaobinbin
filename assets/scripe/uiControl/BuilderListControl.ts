const {ccclass, property} = cc._decorator;
import GameControl from './GameControl';
import MapBuilderInfo from '../bean/MapBuilderInfo'
import BuilderBean from '../bean/BuilderBean';
import BuilderStatusBean from '../bean/BuilderStatusBean';
import BuilderControl from './BuilderControl';
@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Prefab)
	myPrefab: cc.Prefab = null;

	mGame: GameControl;
	mBean: BuilderBean;
	mBuilderBeanList: Map<number, MapBuilderInfo>
	mControlList: Map<number, BuilderControl> = new Map<number, BuilderControl>();
	init(game: GameControl) {
		console.log("BuilderListControl  init  ");
		this.mGame = game;
		this.mBuilderBeanList = this.mGame.mUserInfo.mapBuilderInfo;
		console.log("BuilderListControl  this.mBuilderBeanList size = " + this.mBuilderBeanList.size);
		var isInit = true;

		if (this.mControlList.size > 0) {
			this.mControlList.forEach((value, key) => {
				value.unInit();
			});
		}
		var noCreat = false;
		this.mBuilderBeanList.forEach((value, key) => {
			var loadobj = null;
			var control = null;
			var info = value;
			if (this.mControlList.size > 0) {
				this.mControlList.forEach((value, key) => {
					if (value.mId == 0) {
						loadobj = value.node;
						control = value;
					}
				});
			}
			if (loadobj == null) {
				noCreat = true;
				loadobj = cc.instantiate(this.myPrefab);
				this.node.addChild(loadobj);
				control = loadobj.getComponent(BuilderControl);
				this.mControlList.set(info.builderId, control);
			}

			var x = Number(info.position.split(",")[0]);
			var y = Number(info.position.split(",")[1]);
			console.log("BuilderListControl  info localid=" + info.localid + " x=" + x + " y=" + y);
			loadobj.setPosition(cc.p(x, y));
			
			control.init(info.builderId, this.mGame, isInit);
			if (this.mGame.mUserInfo.mapBuilderStatus.get(info.builderId) == null) {
				isInit = false;
			}
		});
	}


	showLoaded(id: number) {
		this.mControlList.get(id).showLoaded();
	}


	showLoading(id: number) {
		this.mControlList.get(id).showLoading();
	}

	enableBuilder(id: number) {
		var control = this.mControlList.get(id);
		control.enableBuilder();
		var isHave = false;
		this.mBuilderBeanList.forEach((value, key) => {
			var info = value;
			if (!isHave &&this.mGame.mUserInfo.mapBuilderStatus.get(info.builderId) == null) {
				var control2 = this.mControlList.get(info.builderId);
				control2.init(info.builderId, this.mGame, true);
				isHave = true;
			}			
		});

	}
	showLevelUp() {
		this.mControlList.forEach((value, key) => {
			value.showLevelUp();
		});
	}
	levelUpDeal(id: number) {
		var control = this.mControlList.get(id);
		control.levelUpDeal();
	}

}
