const { ccclass, property } = cc._decorator;
import BuilderUnitControl from './BuilderUnitControl';
@ccclass
export default class NewClass extends cc.Component {

	mUiControl: BuilderUnitControl;

	mPoint: cc.Vec2;
	init(ui: BuilderUnitControl) {
		if (this.mCollider == null) {
			this.mCollider = this.node.getComponent(cc.CircleCollider);
			cc.director.getCollisionManager().enabled = true;
		}
		this.mUiControl = ui;
		this.mCollider.enabled = true;
	}
	mCollider: cc.CircleCollider;
	start() {
		if (this.mCollider == null) {
			this.mCollider = this.node.getComponent(cc.CircleCollider);
			cc.director.getCollisionManager().enabled = true;
			this.mCollider.enabled = false;
		}

		//cc.director.getCollisionManager().enabledDebugDraw = true;
	}


	onCollisionEnter (other, self) {
		console.log('on collision enter');
		if (this.mUiControl.isEable()) {
			this.mCollider.enabled = false;
			this.mUiControl.gainMoney();
		}		
	}
}
