const { ccclass, property } = cc._decorator;
import BuilderCoinControl from './BuilderCoinControl';
import TouchLayoutControl from './TouchLayoutControl';
@ccclass
export default class NewClass extends cc.Component {

	mUiControl: BuilderCoinControl;
	isUping = false;
	idDonw = false;
	mTime = 0;
	isShow = false;
	mTouch: TouchLayoutControl;

	update(dt) {

		if (!this.isShow) {
			return;
		}
		if (!this.idDonw && !this.isUping) {
			return;
		}
		if (this.isCollisionStatus == 1 || this.isCollisionStatus == 2) {
			if (this.isCollisionStatus == 1) {
				this.isCollisionIngTime += dt;
			} else {
				this.isCollisionIngTime -= dt;
			}
			
			if (this.isCollisionIngTime >= 0.15) {
				this.isCollisionIngTime = 0.15;
				if (this.isCollisionStatus == 1) {
					this.isCollisionStatus = 2;
				}
			}
			else if (this.isCollisionIngTime <= 0) {
				this.isCollisionIngTime = 0;
				if (this.isCollisionStatus == 2) {
					this.isCollisionStatus = -1;
					
				}
			}
			var scale = 0.2 * (this.isCollisionIngTime / 0.15) + 1;
			this.node.setScale(scale, scale);
			if (this.isCollisionStatus == -1) {
				
			}
			return;
		}
		this.mTime += dt;
		if (this.mTime > 0.4) {
			this.mTime = 0;
			if (this.isUping) {
				this.isUping = false;
				this.idDonw = true;
			} else if (this.idDonw) {
				this.idDonw = false;
				this.isUping = true;
				this.node.setPosition(this.mPoint);
			}
		}
		if (this.isUping) {
			this.node.setPosition(this.node.getPosition().x, this.node.getPosition().y + 0.8)
		} else if (this.idDonw){
			this.node.setPosition(this.node.getPosition().x, this.node.getPosition().y - 0.8)
		}

	}
	mPoint: cc.Vec2;
	init(ui: BuilderCoinControl) {
		this.mCollider = this.node.getComponent(cc.CircleCollider);
		this.mUiControl = ui;
		this.mPoint = this.node.getPosition();
		this.mCollider.enabled = true;
	}
	mCollider: cc.CircleCollider;
	start() {
		this.mCollider = this.node.getComponent(cc.CircleCollider);
		cc.director.getCollisionManager().enabled = true;
	//	this.mCollider.enabled = false;
		//cc.director.getCollisionManager().enabledDebugDraw = true;
		this.mTouch = cc.find("Canvas/Main Camera/touchLayout").getComponent(TouchLayoutControl);
	}

	show() {
		this.mCollider.enabled = true;
		if (this.isShow) {
			return;
		}
		this.mTime = 0;
		this.isShow = true;
		this.idDonw = false;
		this.isUping = true;
		this.node.setScale(1, 1);
		this.node.setPosition(this.mPoint);
		
		
	}
	disShow() {
		if (!this.isShow) {
			return;
		}
		this.isShow = false;
		this.node.setScale(0, 0);
		this.mCollider.enabled = false;
		
	}
	isCollisionStatus = -1;
	isCollisionIngTime = 0;
	onCollisionEnter(other, self) {
		if (this.mTouch.objectClickObjec()) {
			console.log('on collision onCollisionEnter');
			this.mUiControl.gainMoney();
		}
	}
	onCollisionExit(other, self) {

		console.log('on collision onCollisionExit');

	}
}
