const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
	@property(cc.Node)
	mUp: cc.Node = null;
	@property(cc.Node)
	mDown: cc.Node = null;
	@property(cc.Node)
	mLeft: cc.Node = null;
	@property(cc.Node)
	mRight: cc.Node = null;
	@property(cc.Node)
	mText: cc.Node = null;
	@property(cc.Label)
	mStr: cc.Label = null;
    // LIFE-CYCLE CALLBACKS:

	isShow = false;
	show(x: number, y: number, w: number, h: number, text: string, type: number) {//type:1234 上下左右 5678 左上 右上 左下 右下 
		this.mUp.setContentSize(720, 1280 / 2 - (y + h / 2));
		this.mDown.setContentSize(720, 1280 / 2 + (y - h / 2));
		this.mLeft.setContentSize(720 / 2 + (x - w / 2),h);
		this.mRight.setContentSize(720 / 2 - (x + w / 2), h);

		this.mUp.setPosition(0, y+h/2);
		this.mDown.setPosition(0, y -h/2);
		this.mLeft.setPosition(x-w/2,y );
		this.mRight.setPosition(x + w / 2, y);

		if (type == 1) {
			this.mText.setPosition(x, y + h / 2 + this.mText.getContentSize().height/2);
		}
		else if (type == 2){

			this.mText.setPosition(x, y - h / 2 - this.mText.getContentSize().height / 2);
		}
		else if (type == 3) {

			this.mText.setPosition(x - w / 2 - this.mText.getContentSize().width/2, y);
		}
		else if (type == 4) {

			this.mText.setPosition(x + w / 2 + this.mText.getContentSize().width / 2, y);
		}
		else if (type == 5) {

			this.mText.setPosition(x - w / 2 - this.mText.getContentSize().width / 2, y + h / 2 + this.mText.getContentSize().height / 2);
		}
		else if (type == 6) {

			this.mText.setPosition(x + w / 2 + this.mText.getContentSize().width / 2, y + h / 2 + this.mText.getContentSize().height / 2);
		}
		else if (type == 7) {

			this.mText.setPosition(x - w / 2 - this.mText.getContentSize().width / 2, y - h / 2 - this.mText.getContentSize().height / 2);
		}
		else if (type == 8) {

			this.mText.setPosition(x + w / 2 + this.mText.getContentSize().width / 2, y - h / 2 - this.mText.getContentSize().height / 2);
		}
		this.mStr.string = text;
		this.node.setScale(1);
		this.isShow = true;
	}
	disShow() {
		this.node.setScale(0);
		this.isShow = false;
	}
	isShowing() {
		return this.isShow;
	}
    // update (dt) {}
}
