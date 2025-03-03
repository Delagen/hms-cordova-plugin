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

import { Injectable } from '@angular/core';
import { Plugin, Cordova, IonicNativePlugin } from '@ionic-native/core';

@Plugin({
  pluginName: 'HMSAnalytics',
  plugin: 'cordova-plugin-hms-analytics',
  pluginRef: 'HMSAnalytics',
  repo: "https://github.com/HMS-Core/hms-cordova-plugin",
  platforms: ['Android','iOS']
})
@Injectable()
export class HMSAnalytics extends IonicNativePlugin {

  @Cordova({ otherPromise: true })
  getInstance(routePolicy?: string): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  setAnalyticsEnabled(enabled: boolean): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  setUserId(userId: string): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  setCustomReferrer(customReferrer: string): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  setChannel(channel: string): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  setUserProfile(name: string, value: string): Promise<void> {
    return;
  }
  
  
  @Cordova({ otherPromise: true })
  setPropertyCollection(property: string, enabled: boolean): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  deleteUserProfile(name: string): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  setPushToken(token: string): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  setMinActivitySessions(milliseconds: number): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  setSessionDuration(milliseconds: number): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  onEvent(eventId: HAEventType | string, params: HAParamType | EventParams): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  clearCachedData(): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  getAAID(): Promise<string> {
    return;
  }

  @Cordova({ otherPromise: true })
  getDataUploadSiteInfo(): Promise<string> {
    return;
  }

  @Cordova({ otherPromise: true })
  getUserProfiles(predefined: boolean): Promise<UserProfiles> {
    return;
  }

  @Cordova({ otherPromise: true })
  pageStart(pageName: string, pageClassOverride: string): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  pageEnd(pageName: string): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  setReportPolicies(reportPolicies: ReportPolicy): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  getReportPolicyThreshold(reportPolicyType: ReportPolicyType): Promise<number> {
    return;
  }

  @Cordova({ otherPromise: true })
  setRestrictionEnabled(isEnabled: boolean): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  isRestrictionEnabled(): Promise<boolean> {
    return;
  }

  @Cordova({ otherPromise: true })
  setCollectAdsIdEnabled(isEnabled: boolean): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  addDefaultEventParams(params: EventParams): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  enableLog(logLevel: LogLevelType = LogLevelType.DEBUG): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  enableLogger(): Promise<void> {
    return;
  }

  @Cordova({ otherPromise: true })
  disableLogger(): Promise<void> {
    return;
  }
}


///////////////////////////////////////////////////////////////
// Data Types
///////////////////////////////////////////////////////////////
export interface GenericObject {
  [key: string]: any;
}
export type UserProfiles = GenericObject;
export type EventParams = GenericObject;
/**
 * ReportPolicy types for Sets automatic event reporting policies.
 */
export interface ReportPolicy {
  "onScheduledTimePolicy" ? : number,
  "onAppLaunchPolicy" ? : boolean,
  "onMoveBackgroundPolicy" ? : boolean,
  "onCacheThresholdPolicy" ? : number
}
/**
 * ReportPolicy types
 */
export enum ReportPolicyType {
  ON_SCHEDULED_TIME_POLICY = "ON_SCHEDULED_TIME_POLICY",
  ON_APP_LAUNCH_POLICY = "ON_APP_LAUNCH_POLICY",
  ON_MOVE_BACKGROUND_POLICY = "ON_MOVE_BACKGROUND_POLICY",
  ON_CACHE_THRESHOLD_POLICY = "ON_CACHE_THRESHOLD_POLICY"
}

///////////////////////////////////////////////////////////////
// Constants
///////////////////////////////////////////////////////////////
/**
 * HiAnalyticsTools log level enum.
 */
export enum LogLevelType {
  DEBUG = 3,
  INFO = 4,
  WARN = 5,
  ERROR = 6
}
/**
* HAUserProfileType types for provides constants that define the names of all predefined user attributes.
*/
export enum HAUserProfileType {
  USERLEVEL = "user_level",
  ISFULLLEVEL = "is_full_level",
  ISMEMBER = "is_member"
}
/**
 * HAEventType types for provides the IDs of all predefined events.
 */
export enum HAEventType {
  CREATEPAYMENTINFO = "$CreatePaymentInfo",
  ADDPRODUCT2CART = "$AddProduct2Cart",
  ADDPRODUCT2WISHLIST = "$AddProduct2WishList",
  STARTAPP = "$StartApp",
  STARTCHECKOUT = "$StartCheckout",
  VIEWCAMPAIGN = "$ViewCampaign",
  VIEWCHECKOUTSTEP = "$ViewCheckoutStep",
  WINVIRTUALCOIN = "$WinVirtualCoin",
  COMPLETEPURCHASE = "$CompletePurchase",
  OBTAINLEADS = "$ObtainLeads",
  JOINUSERGROUP = "$JoinUserGroup",
  COMPLETELEVEL = "$CompleteLevel",
  STARTLEVEL = "$StartLevel",
  UPGRADELEVEL = "$UpgradeLevel",
  SIGNIN = "$SignIn",
  SIGNOUT = "$SignOut",
  SUBMITSCORE = "$SubmitScore",
  CREATEORDER = "$CreateOrder",
  REFUNDORDER = "$RefundOrder",
  DELPRODUCTFROMCART = "$DelProductFromCart",
  SEARCH = "$Search",
  VIEWCONTENT = "$ViewContent",
  UPDATECHECKOUTOPTION = "$UpdateCheckoutOption",
  SHARECONTENT = "$ShareContent",
  REGISTERACCOUNT = "$RegisterAccount",
  REGISTERFAILED = "$RegisterFailed",
  PERMISSIONAPPLICATION = "$PermissionApplication",
  CONSUMEVIRTUALCOIN = "$ConsumeVirtualCoin",
  STARTTUTORIAL = "$StartTutorial",
  COMPLETETUTORIAL = "$CompleteTutorial",
  OBTAINACHIEVEMENT = "$ObtainAchievement",
  VIEWPRODUCT = "$ViewProduct",
  VIEWPRODUCTLIST = "$ViewProductList",
  VIEWSEARCHRESULT = "$ViewSearchResult",
  UPDATEMEMBERSHIPLEVEL = "$UpdateMembershipLevel",
  FILTRATEPRODUCT = "$FiltrateProduct",
  VIEWCATEGORY = "$ViewCategory",
  UPDATEORDER = "$UpdateOrder",
  CANCELORDER = "$CancelOrder",
  COMPLETEORDER = "$CompleteOrder",
  CANCELCHECKOUT = "$CancelCheckout",
  VIPCLICK = "$VipCclick",
  VIPFAILED = "$VipFailed",
  VIPSUC = "$VipSuc",
  OBTAINVOUCHER = "$ObtainVoucher",
  CONTACTCUSTOMSERVICE = "$ContactCustomService",
  RATE = "$Rate",
  INVITE = "$Invite",
  NOVICEGUIDESTART = "$NoviceGuideStart",
  NOVICEGUIDEEND = "$NoviceGuideEnd",
  STARTGAME = "$StartGame",
  ENDGAME = "$EndGame",
  WINPROPS = "$WinProps",
  CONSUMEPROPS = "$ConsumeProps",
  ADDFRIEND = "$AddFriend",
  ADDBLACKLIST = "$AddBlacklist",
  VIEWFRIENDLIST = "$ViewFriendList",
  QUITUSERGROUP = "$QuitUserGroup",
  CREATEUSERGROUP = "$CreateUserGroup",
  DISBANDUSERGROUP = "$DisbandUserGroup",
  UPGRADEUSERGROUP = "$UpgradeUserGroup",
  VIEWUSERGROUP = "$ViewUserGroup",
  JOINTEAM = "$JoinTeam",
  SENDMESSAGE = "$SendMessage",
  LEARNSKILL = "$LearnSkill",
  USESKILL = "$UseSkill",
  GETEQUIPMENT = "$GetEquipment",
  LOSEEQUIPMENT = "$LoseEquipment",
  ENHANCEEQUIPMENT = "$EnhanceEquipment",
  SWITCHCLASS = "$SwitchClass",
  ACCEPTTASK = "$AcceptTask",
  FINISHTASK = "$FinishTask",
  ATTENDACTIVITY = "$AttendActivity",
  FINISHCUTSCENE = "$FinishCutscene",
  SKIPCUTSCENE = "$SkipCutscene",
  GETPET = "$GetPet",
  LOSEPET = "$LosePet",
  ENHANCEPET = "$EnhancePet",
  GETMOUNT = "$GetMount",
  LOSEMOUNT = "$LoseMount",
  ENHANCEMOUNT = "$EnhanceMount",
  CREATEROLE = "$CreateRole",
  SIGNINROLE = "$SignInRole",
  SIGNOUTROLE = "$SignOutRole",
  STARTBATTLE = "$StartBattle",
  ENDBATTLE = "$EndBattle",
  STARTDUNGEON = "$StartDungeon",
  FINISHDUNGEON = "$FinishDungeon",
  VIEWPACKAGE = "$ViewPackage",
  REDEEM = "$Redeem",
  MODIFYSETTING = "$ModifySetting",
  WATCHVIDEO = "$WatchVideo",
  CLICKMESSAGE = "$ClickMessage",
  DRAWCARD = "$DrawCard",
  VIEWCARDLIST = "$ViewCardList",
  BINDACCOUNT = "$BindAccount",
  STARTEXERCISE = "$StartExercise",
  ENDEXERCISE = "$EndExercise",
  STARTPLAYMEDIA = "$StartPlayMedia",
  ENDPLAYMEDIA = "$EndPlayMedia",
  STARTEXAMINE = "$StartExamine",
  ENDEXAMINE = "$EndExamine",
  CHECKIN = "$CheckIn",
  COMPENSATION = "$Compensation",
  POST = "$Post",
  SHAREAPP = "$ShareApp",
  IMPROVEINFORMATION = "$ImproveInformation",
  VIEWHOUSELIST = "$ViewHouseList",
  VIEWHOUSEDETAIL = "$ViewHouseDetail",
  EXCHANGEGOODS = "$ExchangeGoods",
  BINDDEVICE = "$BindDevice",
  UNBINDDEVICE = "$UnBindDevice",
  RESERVEMAINTENANCE = "$ReserveMaintenance",
  DEVICEMISSINGREPORT = "$DeviceMissingReport",
  STARTBOOKING = "$StartBooking",
  LEARNTARGET = "$LearnTarget",
  LANGUAGETEST = "$LanguageTest",
  STARTTRAINING = "$StartTraining",
  ENDTRAINING = "$EndTraining",
  REGISTERACTIVITY = "$RegisterActivity",
  EXITACTIVITY = "$ExitActivity",
  COMPLETEACTIVITY = "$CompleteActivity",
  ENTERACCOUNTOPENING = "$EnterAccountOpening",
  SUBMITACCOUNTOPENING = "$SubmitAccountOpening",
  BANDCARD = "$BandCard",
  BANKTRANSFERIN = "$BankTransferIn",
  BANKTRANSFEROUT = "$BankTransferOut",
  VIEWSTOCKDETAIL = "$ViewStockDetail",
  TRADESTOCKS = "$TradeStocks",
  VIEWFINANCEPAGE = "$ViewFinancePage",
  PURCHASEFINANCE = "$PurchaseFinance",
  REDEMPTIONFINANCE = "$RedemptionFinance",
  FUNDTRADING = "$FundTrading",
  FIXEDINVESTMENT = "$Fixedinvestment",
  APPLYNEW = "$ApplyNew",
  VIEWINFORMATIONSECTION = "$ViewInformationSection",
  VIEWINFORMATION = "$ViewInformation",
  MODULARCLICK = "$ModularClick",
  PAGEVIEW = "$PageView",
  DISPLAYVOUCHER = "$DisplayVoucher",
  BOOKCOURSE = "$BookCourse",
  LEARNCOURSES = "$LearnCourses",
  TRYOUT = "$Tryout",
  ANSWER = "$Answer",
  COMMENTCONTENT = "$CommentContent",
  LIKECONTENT = "$LikeContent",
  DELETEPRODUCT2WISHLIST = "$DeleteProduct2WishList",
  ADCLICK = "$AdClick",
  ADDISPLAY = "$AdDisplay",
  ENABLEMEMBER = "$EnableMember",
  CANCELMEMBER = "$CancelMember",
  CLICKPURCHASE = "$ClickPurchase",
  VIEWFUNDPAGE = "$ViewFundPage"
}

/**
* HAParamType types for provides the IDs of all predefined parameters, 
* including the IDs of predefined parameters and user attributes.
*/
export enum HAParamType {
  STORENAME = "$StoreName",
  BRAND = "$Brand",
  CATEGORY = "$Category",
  PRODUCTID = "$ProductId",
  PRODUCTNAME = "$ProductName",
  PRODUCTFEATURE = "$ProductFeature",
  PRICE = "$Price",
  QUANTITY = "$Quantity",
  REVENUE = "$Revenue",
  CURRNAME = "$CurrName",
  PLACEID = "$PlaceId",
  DESTINATION = "$Destination",
  ENDDATE = "$EndDate",
  BOOKINGDAYS = "$BookingDays",
  PASSENGERSNUMBER = "$PassengersNumber",
  BOOKINGROOMS = "$BookingRooms",
  ORIGINATINGPLACE = "$OriginatingPlace",
  BEGINDATE = "$BeginDate",
  TRANSACTIONID = "$TransactionId",
  CLASS = "$Class",
  CLICKID = "$ClickId",
  PROMOTIONNAME = "$PromotionName",
  CONTENT = "$Content",
  EXTENDPARAM = "$ExtendParam",
  MATERIALNAME = "$MaterialName",
  MATERIALSLOT = "$MaterialSlot",
  MEDIUM = "$Medium",
  SOURCE = "$Source",
  KEYWORDS = "$Keywords",
  OPTION = "$Option",
  STEP = "$Step",
  VIRTUALCURRNAME = "$VirtualCurrName",
  VOUCHER = "$Voucher",
  PLACE = "$Place",
  SHIPPING = "$Shipping",
  TAXFEE = "$TaxFee",
  USERGROUPID = "$UserGroupId",
  LEVELNAME = "$LevelName",
  RESULT = "$Result",
  ROLENAME = "$RoleName",
  LEVELID = "$LevelId",
  CHANNEL = "$Channel",
  SCORE = "$Score",
  SEARCHKEYWORDS = "$SearchKeywords",
  CONTENTTYPE = "$ContentType",
  ACHIEVEMENTID = "$AchievementId",
  FLIGHTNO = "$FlightNo",
  POSITIONID = "$PositionId",
  PRODUCTLIST = "$ProductList",
  ACOUNTTYPE = "$AcountType",
  OCCURREDDATE = "$OccurredDate",
  EVTRESULT = "$EvtResult",
  PREVLEVEL = "$PrevLevel",
  CURRVLEVEL = "$CurrvLevel",
  VOUCHERS = "$Vouchers",
  MATERIALSLOTTYPE = "$MaterialSlotType",
  LISTID = "$ListId",
  FILTERS = "$Filters",
  SORTS = "$Sorts",
  ORDERID = "$OrderId",
  PAYTYPE = "$PayType",
  REASON = "$Reason",
  EXPIREDATE = "$ExpireDate",
  VOUCHERTYPE = "$VoucherType",
  SERVICETYPE = "$ServiceType",
  DETAILS = "$Details",
  COMMENTTYPE = "$CommentType",
  REGISTMETHOD = "$RegistMethod",
  DURATION = "$Duration",
  LEVEL = "$Level",
  PURCHASEENTRY = "$PurchaseEntry",
  PROPS = "$Props",
  ENTRY = "$Entry",
  INVITER = "$Inviter",
  VIPLEVEL = "$VIPLevel",
  FIRSTSIGNIN = "$FirstSignIn",
  DISCOUNT = "$Discount",
  FIRSTPAY = "$FirstPay",
  TASKID = "$TaskId",
  FRIENDNUMBER = "$FriendNumber",
  USERGROUPNAME = "$UserGroupName",
  USERGROUPLEVEL = "$UserGroupLevel",
  MEMBERS = "$Members",
  LEVELBEFORE = "$LevelBefore",
  MESSAGETYPE = "$MessageType",
  ROLECOMBAT = "$RoleCombat",
  ISTOPLEVEL = "$IsTopLevel",
  ROLECLASS = "$RoleClass",
  SKILLNAME = "$SkillName",
  SKILLLEVEL = "$SkillLevel",
  SKILLLEVELBEFORE = "$SkillLevelBefore",
  EQUIPMENTID = "$EquipmentId",
  EQUIPMENTNAME = "$EquipmentName",
  EQUIPMENTLEVEL = "$EquipmentLevel",
  CLASSLIMIT = "$ClassLimit",
  LEVELLIMIT = "$LevelLimit",
  ISFREE = "$IsFree",
  TOTALAFTERCHANGE = "$TotalAfterChange",
  QUALITY = "$Quality",
  ENHANCETYPE = "$EnhanceType",
  NEWCLASS = "$NewClass",
  OLDCLASS = "$OldClass",
  TASKTYPE = "$TaskType",
  TASKNAME = "$TaskName",
  REWARD = "$Reward",
  ACTIVITYTYPE = "$ActivityType",
  ACTIVITYNAME = "$ActivityName",
  CUTSCENENAME = "$CutsceneName",
  PETID = "$PetId",
  PETDEFAULTNAME = "$PetDefaultName",
  PETLEVEL = "$PetLevel",
  MOUNTID = "$MountId",
  MOUNTDEFAULTNAME = "$MountDefaultName",
  MOUNTLEVEL = "$MountLevel",
  ROLEGENDER = "$RoleGender",
  SERVER = "$Server",
  FIRSTCREATE = "$FirstCreate",
  COMBAT = "$Combat",
  BATTLETYPE = "$BattleType",
  BATTLENAME = "$BattleName",
  NUMBEROFCARDS = "$NumberOfCards",
  CARDLIST = "$CardList",
  PARTICIPANTS = "$Participants",
  DIFFICULTY = "$Difficulty",
  MVP = "$MVP",
  DAMAGE = "$Damage",
  RANKING = "$Ranking",
  DUNGEONNAME = "$DungeonName",
  WINREASON = "$WinReason",
  BALANCE = "$Balance",
  PACKAGETYPE = "$PackageType",
  AMOUNT = "$Amount",
  ITEMLIST = "$ItemList",
  GIFTTYPE = "$GiftType",
  GIFTNAME = "$GiftName",
  TYPE = "$Type",
  OLDVALUE = "$OldValue",
  NEWVALUE = "$NewValue",
  VIDEOTYPE = "$VideoType",
  VIDEONAME = "$VideoName",
  MESSAGETITLE = "$MessageTitle",
  OPERATION = "$Operation",
  NUMBEROFDRAWING = "$NumberOfDrawing",
  LEFTPULLSFORGUARANTEE = "$LeftPullsForGuarantee",
  VIPTYPE = "$VIPType",
  VIPSTATUS = "$VIPStatus",
  VIPEXPIREDATE = "$VIPExpireDate",
  ENTER = "$Enter",
  STARTDATE = "$StartDate",
  EFFECTIVETIME = "$EffectiveTime",
  NAME = "$Name",
  MODE = "$Mode",
  SUBJECT = "$Subject",
  ACCURACY = "$Accuracy",
  CONTENTLENGTH = "$ContentLength",
  REMARK = "$Remark",
  CONTENTNAME = "$ContentName",
  SECTION = "$Section",
  DAYS = "$Days",
  POSTID = "$PostId",
  INFORMATIONTYPE = "$InformationType",
  INFORMATION = "$Information",
  FEATURE = "$Feature",
  ROOMS = "$Rooms",
  SALEPRICE = "$SalePrice",
  RENTFEE = "$RentFee",
  RENTTYPE = "$RentType",
  PAGENAME = "$PageName",
  SERIES = "$Series",
  MODEL = "$Model",
  DEVICETYPE = "$DeviceType",
  DEVICENAME = "$DeviceName",
  BINDDURATION = "$BindDuration",
  DEALERNAME = "$DealerName",
  ARRIVALDATE = "$ArrivalDate",
  BUYERTYPE = "$BuyerType",
  SEAT = "$Seat",
  ENERGY = "$Energy",
  CONFIGURATION = "$Configuration",
  ISLOAN = "$IsLoan",
  LOANPRODUCTNAME = "$LoanProductName",
  LOANCHANNEL = "$LoanChannel",
  REPAYMENTMETHOD = "$RepaymentMethod",
  ACTION = "$Action",
  PAGE = "$Page",
  INDEX = "$Index",
  MODULE = "$Module",
  SOURCEPAGE = "$SourcePage",
  SOURCEPAGENAME = "$SourcePageName",
  SOURCELOCATION = "$SourceLocation",
  CITY = "$City",
  FROMCITY = "$FromCity",
  TOCITY = "$ToCity",
  DEPARTUREDATE = "$DepartureDate",
  RETURNDATE = "$ReturnDate",
  TRIPTYPE = "$TripType",
  SEARCHHOTEL = "$SearchHotel",
  SPECIALTICKET = "$SpecialTicket",
  HASBABY = "$HasBaby",
  HASCHILDREN = "$HasChildren",
  COUNTRY = "$Country",
  STAR = "$Star",
  CHECKINDATE = "$CheckinDate",
  CHECKOUTDATE = "$CheckoutDate",
  ALDULTCOUNT = "$AldultCount",
  BABYCOUNT = "$BabyCount",
  CHILDRENCOUNT = "$ChildrenCount",
  FROM = "$From",
  CARMODE = "$CarMode",
  CARTIME = "$CarTime",
  FLIGHTID = "$FlightID",
  SEARCHRESULT = "$SearchResult",
  PRODUCT = "$Product",
  DEPARTURETIME = "$DepartureTime",
  ARRIVETIME = "$ArriveTime",
  DEPARTUREAIRPORT = "$DepartureAirport",
  ARRIVEEAIRPORT = "$ArriveeAirport",
  AIRLINE = "$Airline",
  FLIGHTTYPE = "$FlightType",
  DIRECTFLIGHT = "$DirectFlight",
  TRAINTYPE = "$TrainType",
  FROMSTATION = "$FromStation",
  BEDTYPE = "$BedType",
  BREAKFAST = "$Breakfast",
  ARRIVEDATE = "$ArriveDate",
  TRAINID = "$TrainID",
  HOTELID = "$HotelID",
  HOTELNAME = "$HotelName",
  TRIPTAG = "$TripTag",
  HOTELTYPE = "$HotelType",
  CABIN = "$Cabin",
  ROOMTYPE = "$RoomType",
  CARTYPE = "$CarType",
  SUPPLIER = "$Supplier",
  STUDENTCOUNT = "$StudentCount",
  ROOMCOUNT = "$RoomCount",
  PERSONCOUNT = "$PersonCount",
  VOUCHERID = "$VoucherID",
  VOUCHERNAME = "$VoucherName",
  VOUCHERPRICE = "$VoucherPrice",
  USERTYPE = "$UserType",
  TARGET = "$Target",
  ISCOMPELETED = "$IsCompeleted",
  USERLEVEL = "$UserLevel",
  TIME = "$Time",
  DISTANCE = "$Distance",
  CALORIECONSUMED = "$CalorieConsumed",
  PROGRESS = "$Progress",
  MULTIPLEACCOUNTS = "$MultipleAccounts",
  ACCOUNTTYPE = "$AccountType",
  FAILUREREASON = "$FailureReason",
  AUTHORITY = "$Authority",
  CARDTYPE = "$CardType",
  ISSUEBANK = "$IssueBank",
  TRANSFORMAMOUNT = "$TransformAmount",
  BANKNAME = "$BankName",
  SOURCEMODULE = "$SourceModule",
  STOCKCODE = "$Stockcode",
  STOCKNAME = "$Stockname",
  MARKETCODE = "$MarketCode",
  MARKETNAME = "$MarketName",
  VIEWTYPE = "$ViewType",
  TRENDCYCLE = "$TrendCycle",
  TRANSACTIONTYPE = "$TransactionType",
  CURRENCY = "$Currency",
  MONEY = "$Money",
  FINANCEID = "$FinanceId",
  FINANCENAME = "$FinanceName",
  FINANCETYPE = "$FinanceType",
  FINANCERATE = "$FinanceRate",
  FINANCETIMELIMIT = "$FinanceTimeLimit",
  FINANCEAMOUNTMIN = "$FinanceAmountMin",
  FINANCERISKLEV = "$FinanceRiskLev",
  PURCHASEAMOUNT = "$PurchaseAmount",
  HANDLINGFEES = "$HandlingFees",
  REDEMPTIONAMOUNT = "$RedemptionAmount",
  RETURNAMOUNT = "$ReturnAmount",
  FUNDCODE = "$FundCode",
  FUNDTYPE = "$FundType",
  FUNDNAME = "$FundName",
  FUNDRISKLEV = "$FundRiskLev",
  CHARGERATE = "$ChargeRate",
  PAYMENTMETHOD = "$PaymentMethod",
  FIXEDCYCLE = "$FixedCycle",
  ENTRANCE = "$Entrance",
  CODE = "$code",
  NEWSTOPIC = "$NewsTopic",
  INFORMATIONSOURCE = "$InformationSource",
  COMMENTSNUMBER = "$CommentsNumber",
  FORWARDINGNUMBER = "$forwardingNumber",
  LIKES = "$Likes",
  TITLE = "$Title",
  SEARCHTYPE = "$SearchType",
  LOCATION = "$Location",
  ID = "$Id",
  PLAYMODE = "$PlayMode",
  LISTS = "$Lists",
  ADLOCATION = "$Adlocation",
  ADCATEGORY = "$AdCategory",
  ADTHEME = "$AdTheme",
  BUTTONNAME = "$ButtonName",
  USERID = "$UserID",
  PAGECATEGORY = "$PageCategory",
  RATING = "$Rating",
  PERFORMANCE = "$Performance",
  TRADINGRULES = "$TradingRules",
  PORTFOLIO = "$Portfolio",
  INVESTMENTMANAGER = "$InvestmentManager",
  FUNDSIZE = "$FundSize"
}