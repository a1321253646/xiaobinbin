import GameControl from "./GameControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Node)
	item: cc.Node = null;

	isMove = true;
	x = 0;
	y = 0;

    start () {
		this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
		this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchStart, this);
		this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.end, this);
		this.node.on(cc.Node.EventType.TOUCH_END, this.end, this);
		this.item.getComponent(cc.MotionStreak).enabled = false;
    }
	touchStart(event) {
		var pos = new cc.Vec2(event.getLocationX(), event.getLocationY());
		pos = this.node.convertToNodeSpaceAR(pos);
		//console.log(" event.getLocationX() =  " + pos.x + "   event.getLocationY()=" + pos.y);
		this.item.setPosition(pos)
		this.item.getComponent(cc.MotionStreak).enabled = true;
		if (!this.isMove) {
			var x2 = pos.x - this.x;
			var y2 = pos.y - this.y;
			if (x2 * x2 + y2 * y2 >= 400) {
				this.isMove = true;
			}
		}
	}
	end(event) {
		this.item.getComponent(cc.MotionStreak).enabled = false;
		this.item.setPosition(new cc.Vec2(-10000, -10000));
		this.isMove = true;
		this.x = -9999;
		this.y = -9999;
	}

	objectClickObjec(): boolean {
		if (!this.isMove) {
			return this.isMove;
		}
		this.x = this.item.getPosition().x;
		this.y = this.item.getPosition().y;
		this.isMove = false;
		return true;
	}
    // update (dt) {}
}
