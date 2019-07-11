const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Node)
	item: cc.Node = null;

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
	//	this.item.getComponent(cc.MotionStreak).enabled = true;
	}
	end(event) {
	//	this.item.getComponent(cc.MotionStreak).enabled = false;

		this.item.setPosition(new cc.Vec2(-10000, -10000))
	}
    // update (dt) {}
}
