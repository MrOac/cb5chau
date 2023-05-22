const { ccclass, property, requireComponent } = cc._decorator;

import LanguageManager from "./Language.LanguageManager";

namespace Language {
    @ccclass
    @requireComponent(cc.Label)
    export class Label extends cc.Component {

        @property
        id: string = "";
        @property
        isUpperCase: boolean = false;

        start() {
            LanguageManager.instance.addListener(this.updateText,
                this);
            this.updateText("");
        }

        protected onDisable(): void {
            LanguageManager.instance.removeListener(this.updateText, this);
        }

        private updateText(data) {
            let str = LanguageManager.instance.getString(this.id);

            if (str != null && str.trim().length == 0) {
                return;
            }

            if (this.isUpperCase) {
                str = str.toUpperCase();
            }
            try {
                this.getComponent(cc.Label).string = str;
            } catch (error) {

            }
        }
    }

}
export default Language.Label;