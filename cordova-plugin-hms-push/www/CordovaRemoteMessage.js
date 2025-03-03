/*
    Copyright 2020-2023. Huawei Technologies Co., Ltd. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License")
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CordovaRemoteMessage = void 0;
class CordovaRemoteMessage {
    constructor(options = {}) {
        this.remoteMsg = options;
    }
    /*
     * parse all element,unordered
     */
    parseMsgAllAttribute() {
        let pushResult = "";
        for (const key in this.remoteMsg) {
            pushResult = pushResult + key + " : " + this.remoteMsg[key] + "\n";
        }
        return pushResult;
    }
    /*
     * getCollapseKey() Obtains the classification identifier (collapse key) of a message.
     */
    getCollapseKey() {
        return this.remoteMsg[CordovaRemoteMessage.COLLAPSEKEY];
    }
    /*
     * getData() Obtains valid content data of a message.
     */
    getData() {
        return this.remoteMsg[CordovaRemoteMessage.DATA];
    }
    /*
     * getDataOfMap() a message map.
     */
    getDataOfMap() {
        return this.remoteMsg[CordovaRemoteMessage.DATAOFMAP];
    }
    /*
     * getMessageId() Obtains the ID of a message.
     */
    getMessageId() {
        return this.remoteMsg[CordovaRemoteMessage.MESSAGEID];
    }
    /*
     * getMessageType() Obtains the type of a message.
     */
    getMessageType() {
        return this.remoteMsg[CordovaRemoteMessage.MESSAGETYPE];
    }
    /*
     * getOriginalUrgency() Obtains the original priority of a message.
     */
    getOriginalUrgency() {
        return this.remoteMsg[CordovaRemoteMessage.ORIGINALURGENCY];
    }
    /*
     * getUrgency() Obtains priority of a message.
     */
    getUrgency() {
        return this.remoteMsg[CordovaRemoteMessage.URGENCY];
    }
    /*
     * getTtl() Obtains valid getTtl of a message.
     */
    getTtl() {
        return this.remoteMsg[CordovaRemoteMessage.TTL];
    }
    /*
     * getSentTime() Obtains the time when a message is sent from the server.
     */
    getSentTime() {
        return this.remoteMsg[CordovaRemoteMessage.SENTTIME];
    }
    /*
     * getTo() Obtains the recipient of a message.
     */
    getTo() {
        return this.remoteMsg[CordovaRemoteMessage.TO];
    }
    /*
     * getFrom() Obtains the sender of a message.
     */
    getFrom() {
        return this.remoteMsg[CordovaRemoteMessage.FROM];
    }
    /*
     * getToken() Obtains valid token
     */
    getToken() {
        return this.remoteMsg[CordovaRemoteMessage.TOKEN];
    }
    getAnalyticInfo() {
        return this.remoteMsg[CordovaRemoteMessage.ANALYTICINFO];
    }
    getAnalyticInfoMap() {
        return this.remoteMsg[CordovaRemoteMessage.ANALYTICINFOMAP];
    }
    /*
     * Notification:getTitle() Obtains the title of a message
     */
    getNotificationTitle() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.TITLE];
    }
    /*
     * Notification:getTitleLocalizationKey() Obtains the key of the displayed title of a notification message
     */
    getTitleLocalizationKey() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.TITLELOCALIZATIONKEY];
    }
    /*
     * Notification:getTitleLocalizationArgs() Obtains variable parameters of the displayed title of a message
     */
    getTitleLocalizationArgs() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.TITLELOCALIZATIONARGS];
    }
    /*
     * Notification:getBodyLocalizationKey() Obtains the key of the displayed content of a message
     */
    getBodyLocalizationKey() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.BODYLOCALIZATIONKEY];
    }
    /*
     * Notification:getBodyLocalizationArgs() Obtains variable parameters of the displayed content of a message
     */
    getBodyLocalizationArgs() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.BODYLOCALIZATIONARGS];
    }
    /*
     * Notification:getBody() Obtains the body of a message
     */
    getBody() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.BODY];
    }
    /*
     * Notification:getIcon() Obtains the icon of a message
     */
    getIcon() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.ICON];
    }
    /*
     * Notification:getSound() Obtains the sound from a message
     */
    getSound() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.SOUND];
    }
    /*
     * Notification:getTag() Obtains the tag from a message for message overwriting
     */
    getTag() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.TAG];
    }
    /*
     * Notification:getColor() Obtains the colors of icons in a message
     */
    getColor() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.COLOR];
    }
    /*
     * Notification:getClickAction() Obtains actions triggered by message tapping
     */
    getClickAction() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.CLICKACTION];
    }
    /*
     * Notification:getChannelId() Obtains IDs of channels that support the display of messages
     */
    getChannelId() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.CHANNELID];
    }
    /*
     * Notification:getImageUrl() Obtains the image URL from a message
     */
    getImageUrl() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.IMAGEURL];
    }
    /*
     * Notification:getLink() Obtains the URL to be accessed from a message
     */
    getLink() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.LINK];
    }
    /*
     * Notification:getNotifyId() Obtains the unique ID of a message
     */
    getNotifyId() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.NOTIFYID];
    }
    /*
     * Notification:getWhen()
     */
    getWhen() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.WHEN];
    }
    /*
     * Notification:getLightSettings()
     */
    getLightSettings() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.LIGHTSETTINGS];
    }
    /*
     * Notification:getBadgeNumber()
     */
    getBadgeNumber() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.BADGENUMBER];
    }
    /*
     * Notification:getImportance()
     */
    getImportance() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.IMPORTANCE];
    }
    /*
     * Notification:getTicker()
     */
    getTicker() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.TICKER];
    }
    /*
     * Notification:getVibrateConfig()
     */
    getVibrateConfig() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.VIBRATECONFIG];
    }
    /*
     * Notification:getVisibility()
     */
    getVisibility() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.VISIBILITY];
    }
    /*
     * Notification:getIntentUri()
     */
    getIntentUri() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.INTENTURI];
    }
    /*
     * Notification:isAutoCancel()
     */
    isAutoCancel() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.ISAUTOCANCEL];
    }
    /*
     * Notification:getIntentUri()
     */
    isLocalOnly() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.ISLOCALONLY];
    }
    /*
     * Notification:isDefaultLight()
     */
    isDefaultLight() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.ISDEFAULTLIGHT];
    }
    /*
     * Notification:isDefaultSound()
     */
    isDefaultSound() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.ISDEFAULTSOUND];
    }
    /*
     * Notification:isDefaultVibrate()
     */
    isDefaultVibrate() {
        return this.remoteMsg[CordovaRemoteMessage.NOTIFICATION.ISDEFAULTVIBRATE];
    }
}
exports.CordovaRemoteMessage = CordovaRemoteMessage;
CordovaRemoteMessage.INSTANCE_ID_SCOPE = "HCM";
CordovaRemoteMessage.PRIORITY_UNKNOWN = 0;
CordovaRemoteMessage.PRIORITY_HIGH = 1;
CordovaRemoteMessage.PRIORITY_NORMAL = 2;
CordovaRemoteMessage.COLLAPSEKEY = "collapseKey";
CordovaRemoteMessage.DATA = "data";
CordovaRemoteMessage.DATAOFMAP = "dataOfMap";
CordovaRemoteMessage.MESSAGEID = "messageId";
CordovaRemoteMessage.MESSAGETYPE = "messageType";
CordovaRemoteMessage.ORIGINALURGENCY = "originalUrgency";
CordovaRemoteMessage.URGENCY = "urgency";
CordovaRemoteMessage.TTL = "ttl";
CordovaRemoteMessage.SENTTIME = "sentTime";
CordovaRemoteMessage.TO = "to";
CordovaRemoteMessage.FROM = "from";
CordovaRemoteMessage.TOKEN = "token";
CordovaRemoteMessage.ANALYTICINFO = "analyticInfo";
CordovaRemoteMessage.ANALYTICINFOMAP = "analyticInfoMap";
CordovaRemoteMessage.NOTIFICATION = {
    TITLE: "title",
    TITLELOCALIZATIONKEY: "titleLocalizationKey",
    TITLELOCALIZATIONARGS: "titleLocalizationArgs",
    BODYLOCALIZATIONKEY: "bodyLocalizationKey",
    BODYLOCALIZATIONARGS: "bodyLocalizationArgs",
    BODY: "body",
    ICON: "icon",
    SOUND: "Sound",
    TAG: "Tag",
    COLOR: "Color",
    CLICKACTION: "ClickAction",
    CHANNELID: "ChannelId",
    IMAGEURL: "ImageUrl",
    LINK: "Link",
    NOTIFYID: "NotifyId",
    WHEN: "When",
    LIGHTSETTINGS: "LightSettings",
    BADGENUMBER: "BadgeNumber",
    IMPORTANCE: "Importance",
    TICKER: "Ticker",
    VIBRATECONFIG: "vibrateConfig",
    VISIBILITY: "visibility",
    INTENTURI: "intentUri",
    ISAUTOCANCEL: "isAutoCancel",
    ISLOCALONLY: "isLocalOnly",
    ISDEFAULTLIGHT: "isDefaultLight",
    ISDEFAULTSOUND: "isDefaultSound",
    ISDEFAULTVIBRATE: "isDefaultVibrate",
};
//# sourceMappingURL=CordovaRemoteMessage.js.map