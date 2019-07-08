const { ccclass, property } = cc._decorator;
import BuilderCoinControl from './BuilderCoinControl';
@ccclass
export default class NewClass extends cc.Component {

	mUiControl: BuilderCoinControl;
	isUping = false;
	idDonw = false;
	mTime = 0;
	isShow = false;

	update(dt) {

		if (!this.isShow) {
			return;
		}
		if (!this.idDonw && !this.isUping) {
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
		this.mCollider.enabled = false;
		//cc.director.getCollisionManager().enabledDebugDraw = true;
	}

	show() {
		if (this.isShow) {
			return;
		}
		this.mTime = 0;
		this.isShow = true;
		this.idDonw = false;
		this.isUping = true;
		this.node.setScale(1, 1);
		this.node.setPosition(this.mPoint);
		this.mCollider.enabled = true;
		
	}
	disShow() {
		if (!this.isShow) {
			return;
		}
		this.isShow = false;
		this.node.setScale(0, 0);
		this.mCollider.enabled = false;
		
	}

	onCollisionEnter (other, self) {
		console.log('on collision enter');
		this.mUiControl.gainMoney();
		
	}
}
