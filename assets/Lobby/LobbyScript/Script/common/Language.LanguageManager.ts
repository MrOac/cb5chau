
const { ccclass, property } = cc._decorator;

namespace Language {
    @ccclass
    export class LanguageMananger extends cc.Component {

        static instance: LanguageMananger = null;

        @property(cc.TextAsset)
        json: cc.TextAsset = null;


        languageCode = "vi";
        private texts: Object = {};
        //private listeners: Array<any> = [];
        private listeners: { handler: Function, target: any }[];

        onLoad() {
            LanguageMananger.instance = this;
            this.texts = JSON.parse(this.json.text);
            let langCode = cc.sys.localStorage.getItem("langCode");
            if (langCode != null) {
                this.languageCode = langCode;
            }
        }

        public setLanguage(languageCode: string) {
            const handlerList = this.listeners;
            this.languageCode = languageCode;
            cc.sys.localStorage.setItem("langCode", languageCode);
            let i;
            for (i = 0; i < handlerList.length; i++) {
                const objHandler = handlerList[i];
                if (objHandler.handler) {
                    objHandler.handler.apply(objHandler.target, languageCode);
                }
            }
        }

        public addListener(callback: (languageCode: string) => void, target?: any) {
            // this.listeners.push({
            //     callback: callback,
            //     target: target
            // });
            const objHandler = { handler: callback, target: target };

            let handlerList = this.listeners;
            if (!handlerList) {
                handlerList = [];
            }

            for (var i = 0; i < handlerList.length; i++) {
                if (!handlerList[i]) {
                    handlerList[i] = objHandler;
                    return i;
                }
            }

            handlerList.push(objHandler);
        }

        public removeListener(handler: Function, target?: any) {
            const handlerList = this.listeners

            if (!handlerList) {
                return;
            }

            for (let i = 0; i < handlerList.length; i++) {
                const oldObj = handlerList[i];
                if (oldObj.handler === handler && (!target || target === oldObj.target)) {
                    handlerList.splice(i, 1);
                    break;
                }
            }
        };

        public getString(id: string): string {
            if (this.texts.hasOwnProperty(id)) {
                if (this.texts[id].hasOwnProperty(this.languageCode)) {
                    return this.texts[id][this.languageCode];
                }
            }
            return id;
        }
    }

}
export default Language.LanguageMananger;