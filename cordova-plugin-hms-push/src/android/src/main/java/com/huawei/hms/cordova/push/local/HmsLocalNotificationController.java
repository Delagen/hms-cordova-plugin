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

package com.huawei.hms.cordova.push.local;

import static com.huawei.hms.cordova.push.config.NotificationAttributes.fromJson;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.media.AudioAttributes;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.service.notification.StatusBarNotification;
import android.util.Log;

import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

import com.huawei.hms.cordova.push.basef.handler.Promise;
import com.huawei.hms.cordova.push.config.NotificationAttributes;
import com.huawei.hms.cordova.push.constants.Core;
import com.huawei.hms.cordova.push.constants.NotificationConstants;
import com.huawei.hms.cordova.push.constants.ResultCode;
import com.huawei.hms.cordova.push.receiver.HmsLocalNotificationActionsReceiver;
import com.huawei.hms.cordova.push.receiver.HmsLocalNotificationScheduledPublisher;
import com.huawei.hms.cordova.push.utils.ApplicationUtils;
import com.huawei.hms.cordova.push.utils.BundleUtils;
import com.huawei.hms.cordova.push.utils.MapUtils;
import com.huawei.hms.cordova.push.utils.NotificationConfigUtils;

import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class HmsLocalNotificationController {
    private final String TAG = HmsLocalNotificationController.class.getSimpleName();

    private final SharedPreferences sharedPreferences;

    private final Context context;

    public HmsLocalNotificationController(Context context) {
        this.context = context;
        this.sharedPreferences = context.getSharedPreferences(Core.PREFERENCE_NAME, Context.MODE_PRIVATE);
    }

    private AlarmManager getAlarmManager() {
        return (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
    }

    private NotificationManager notificationManager() {
        return (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
    }

    public Class getMainActivityClass() {
        String packageName = context.getPackageName();
        Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(packageName);
        String className = launchIntent.getComponent().getClassName();
        try {
            return Class.forName(className);
        } catch (ClassNotFoundException e) {
            Log.w(TAG, "getMainActivityClass: " + e.getLocalizedMessage());
            return null;
        }
    }

    public void createDefaultChannel() {
        NotificationManager notificationManager = notificationManager();

        int importance = 4; // HIGH
        Uri soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);

        String channelId = Core.NOTIFICATION_CHANNEL_ID + "-" + importance;
        createChannel(notificationManager, channelId, Core.NOTIFICATION_CHANNEL_NAME, Core.NOTIFICATION_CHANNEL_DESC,
            soundUri, importance, new long[] {0, Core.DEFAULT_VIBRATE_DURATION});
    }

    private void createChannel(NotificationManager notificationManager, String channelId, String channelName,
        String channelDescription, Uri soundUri, int importance, long[] vibratePattern) {

        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return;
        }
        if (notificationManager == null) {
            return;
        }

        NotificationChannel notificationChannel = notificationManager.getNotificationChannel(channelId);

        if (notificationChannel != null) {
            return;
        }

        if (channelName == null) {
            channelName = Core.NOTIFICATION_CHANNEL_NAME;
        }

        if (channelDescription == null) {
            channelDescription = Core.NOTIFICATION_CHANNEL_DESC;
        }

        notificationChannel = new NotificationChannel(channelId, channelName, importance);

        notificationChannel.setDescription(channelDescription);
        notificationChannel.enableLights(true);
        notificationChannel.enableVibration(true);
        notificationChannel.setVibrationPattern(vibratePattern);

        if (soundUri != null) {
            AudioAttributes audioAttributes = new AudioAttributes.Builder().setContentType(
                AudioAttributes.CONTENT_TYPE_SONIFICATION).setUsage(AudioAttributes.USAGE_NOTIFICATION).build();

            notificationChannel.setSound(soundUri, audioAttributes);
        } else {
            notificationChannel.setSound(null, null);
        }

        notificationManager.createNotificationChannel(notificationChannel);
    }

    public void localNotificationNow(final Bundle bundle, final Promise promise) {
        HmsLocalNotificationPicturesLoader notificationPicturesLoader = new HmsLocalNotificationPicturesLoader(
            (largeIconImage, bigPictureImage, cordovaCallback) -> localNotificationNowPicture(bundle, largeIconImage,
                bigPictureImage, cordovaCallback));

        notificationPicturesLoader.setCordovaCallBack(promise);
        notificationPicturesLoader.setLargeIconUrl(context, BundleUtils.get(bundle, NotificationConstants.LARGE_ICON_URL));
        notificationPicturesLoader.setBigPictureUrl(context, BundleUtils.get(bundle, NotificationConstants.BIG_PICTURE_URL));
    }

    public void invokeApp(Bundle bundle) {
        String packageName = context.getPackageName();
        Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(packageName);
        if (launchIntent == null) {
            return;
        }

        try {
            String className = launchIntent.getComponent().getClassName();

            Class<?> activityClass = Class.forName(className);
            Intent activityIntent = new Intent(context, activityClass);

            if (bundle != null) {
                activityIntent.putExtra(NotificationConstants.NOTIFICATION, bundle);
            }

            activityIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

            context.startActivity(activityIntent);
        } catch (Exception e) {
            Log.e(TAG, "Class not found", e);
        }
    }

    public void checkRequiredParams(Bundle bundle, Promise promise, String type) {
        if (getMainActivityClass() == null) {
            if (promise != null) {
                promise.error("No activity class");
            }
        }
        if (BundleUtils.get(bundle, NotificationConstants.MESSAGE) == null) {
            if (promise != null) {
                promise.error("Notification Message is required");
            }
        }
        if (BundleUtils.get(bundle, NotificationConstants.ID) == null) {
            if (promise != null) {
                promise.error("Notification ID is null");
            }
        }
        if (type.equals(Core.NotificationType.SCHEDULED)) {
            if (BundleUtils.getD(bundle, NotificationConstants.FIRE_DATE) == 0) {
                if (promise != null) {
                    promise.error("FireDate is null");
                }
            }
        }
    }

    public void localNotificationNowPicture(Bundle bundle, Bitmap largeIconBitmap, Bitmap bigPictureBitmap, Promise promise) {
        checkRequiredParams(bundle, promise, Core.NotificationType.NOW);
        try {

            String title = NotificationConfigUtils.configTitle(bundle, context);
            int priority = NotificationConfigUtils.configPriority(bundle);
            int importance = NotificationConfigUtils.configImportance(bundle);
            int visibility = NotificationConfigUtils.configVisibility(bundle);

            String channelId = Core.NOTIFICATION_CHANNEL_ID + "-" + importance;

            NotificationCompat.Builder notification = new NotificationCompat.Builder(context, "").setChannelId(
                    channelId)
                .setContentTitle(title)
                .setTicker(BundleUtils.get(bundle, NotificationConstants.TICKER))
                .setVisibility(visibility)
                .setPriority(priority)
                .setAutoCancel(BundleUtils.getB(bundle, NotificationConstants.AUTO_CANCEL, true))
                .setOnlyAlertOnce(BundleUtils.getB(bundle, NotificationConstants.ONLY_ALERT_ONCE, false));

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                boolean showWhen = BundleUtils.getB(bundle, NotificationConstants.SHOW_WHEN, true);
                notification.setShowWhen(showWhen);
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                notification.setDefaults(Notification.DEFAULT_LIGHTS);
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT_WATCH) {
                String group = BundleUtils.get(bundle, NotificationConstants.GROUP);

                if (group != null) {
                    notification.setGroup(group);
                }

                if (BundleUtils.contains(bundle, NotificationConstants.GROUP_SUMMARY) || BundleUtils.getB(bundle,
                    NotificationConstants.GROUP_SUMMARY)) {
                    notification.setGroupSummary(BundleUtils.getB(bundle, NotificationConstants.GROUP_SUMMARY));
                }
            }

            String message = NotificationConfigUtils.configMessage(bundle, context);
            notification.setContentText(message);

            String subText = BundleUtils.get(bundle, NotificationConstants.SUB_TEXT);

            if (subText != null) {
                notification.setSubText(subText);
            }

            String bigText = BundleUtils.get(bundle, NotificationConstants.BIG_TEXT);
            bigText = bigText == null ? message : bigText;

            String notificationNumber = BundleUtils.get(bundle, NotificationConstants.NUMBER);

            if (notificationNumber != null) {
                notification.setNumber(Integer.parseInt(notificationNumber));
            }

            notification.setSmallIcon(NotificationConfigUtils.configSmallIcon(bundle, context));

            largeIconBitmap = NotificationConfigUtils.configLargeIcon(bundle, context, largeIconBitmap);
            if (largeIconBitmap != null) {
                notification.setLargeIcon(largeIconBitmap);
            }

            NotificationCompat.Style style;

            if (bigPictureBitmap != null) {
                style = new NotificationCompat.BigPictureStyle().bigPicture(bigPictureBitmap)
                    .setBigContentTitle(title)
                    .setSummaryText(message);
            } else {
                style = new NotificationCompat.BigTextStyle().bigText(bigText);
            }

            notification.setStyle(style);

            Class intentClass = getMainActivityClass();

            Intent intent = new Intent(context, intentClass);
            intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            intent.putExtra(NotificationConstants.NOTIFICATION, bundle);

            Uri soundUri = null;

            if (!BundleUtils.contains(bundle, NotificationConstants.PLAY_SOUND) || BundleUtils.getB(bundle,
                NotificationConstants.PLAY_SOUND)) {
                soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);

                String soundName = BundleUtils.get(bundle, NotificationConstants.SOUND_NAME);

                if (soundName != null) {
                    if (!Core.Resource.DEFAULT.equalsIgnoreCase(soundName)) {

                        int resId;
                        if (context.getResources().getIdentifier(soundName, Core.RAW, context.getPackageName()) == 0
                            && soundName.contains(".")) {
                            soundName = soundName.substring(0, soundName.lastIndexOf('.'));
                        }
                        resId = context.getResources().getIdentifier(soundName, Core.RAW, context.getPackageName());

                        soundUri = Uri.parse("android.resource://" + context.getPackageName() + "/" + resId);
                    }
                } else {
                    soundName = Core.Resource.DEFAULT;
                }

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    channelId = channelId + "-" + soundName;
                }

                notification.setSound(soundUri);
            }

            if (soundUri == null || Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                notification.setSound(null);
            }

            if (BundleUtils.contains(bundle, NotificationConstants.ONGOING) || BundleUtils.getB(bundle,
                NotificationConstants.ONGOING)) {
                notification.setOngoing(BundleUtils.getB(bundle, NotificationConstants.ONGOING));
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                notification.setCategory(NotificationCompat.CATEGORY_CALL);

                String color = BundleUtils.get(bundle, NotificationConstants.COLOR);
                if (color != null) {
                    notification.setColor(Color.parseColor(color));
                }
            }

            int notificationID = Integer.parseInt(BundleUtils.get(bundle, NotificationConstants.ID));

            PendingIntent pendingIntent;

            if (android.os.Build.VERSION.SDK_INT >= 23) {
                pendingIntent = PendingIntent.getActivity(context, notificationID, intent,
                    PendingIntent.FLAG_IMMUTABLE);
            } else {
                pendingIntent = PendingIntent.getActivity(context, notificationID, intent,
                    PendingIntent.FLAG_UPDATE_CURRENT);
            }

            NotificationManager notificationManager = notificationManager();

            long[] vibratePattern = new long[] {0};

            if (!BundleUtils.contains(bundle, NotificationConstants.VIBRATE) || BundleUtils.getB(bundle,
                NotificationConstants.VIBRATE)) {
                long vibrateDuration = BundleUtils.contains(bundle, NotificationConstants.VIBRATE_DURATION)
                    ? BundleUtils.getL(bundle, NotificationConstants.VIBRATE_DURATION)
                    : Core.DEFAULT_VIBRATE_DURATION;
                if (vibrateDuration == 0) {
                    vibrateDuration = Core.DEFAULT_VIBRATE_DURATION;
                }

                channelId = channelId + "-" + vibrateDuration;

                vibratePattern = new long[] {0, vibrateDuration};

                notification.setVibrate(vibratePattern);
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                String shortcutId = BundleUtils.get(bundle, NotificationConstants.SHORTCUT_ID);

                if (shortcutId != null) {
                    notification.setShortcutId(shortcutId);
                }
            }

            String customChannelId = BundleUtils.get(bundle, NotificationConstants.CHANNEL_ID);
            if (customChannelId != null) {
                channelId = customChannelId;
            }

            String channelName = BundleUtils.get(bundle, NotificationConstants.CHANNEL_NAME);
            String channelDescription = BundleUtils.get(bundle, NotificationConstants.CHANNEL_DESCRIPTION);

            createChannel(notificationManager, channelId, channelName, channelDescription, soundUri, importance,
                vibratePattern);

            notification.setChannelId(channelId);
            notification.setContentIntent(pendingIntent);

            JSONArray actionArr = null;
            try {
                actionArr = BundleUtils.get(bundle, NotificationConstants.ACTIONS) != null ? new JSONArray(
                    BundleUtils.get(bundle, NotificationConstants.ACTIONS)) : null;
            } catch (Exception e) {
                if (promise != null) {
                    promise.error(e.getLocalizedMessage());
                }
            }

            if (actionArr != null) {
                int icon = 0;

                for (int i = 0; i < actionArr.length(); i++) {
                    String action;
                    try {
                        action = actionArr.getString(i);
                    } catch (Exception e) {
                        continue;
                    }

                    Intent actionIntent = new Intent(context, HmsLocalNotificationActionsReceiver.class);
                    actionIntent.setAction(context.getPackageName() + ".ACTION_" + i);

                    actionIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);

                    bundle.putString(NotificationConstants.ACTION, action);
                    actionIntent.putExtra(NotificationConstants.NOTIFICATION, bundle);
                    actionIntent.setPackage(context.getPackageName());

                    PendingIntent pendingActionIntent;

                    if (android.os.Build.VERSION.SDK_INT >= 23) {
                        pendingActionIntent = PendingIntent.getBroadcast(context, notificationID, actionIntent,
                            PendingIntent.FLAG_IMMUTABLE);
                    } else {
                        pendingActionIntent = PendingIntent.getBroadcast(context, notificationID, actionIntent,
                            PendingIntent.FLAG_UPDATE_CURRENT);
                    }

                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                        notification.addAction(
                            new NotificationCompat.Action.Builder(icon, action, pendingActionIntent).build());
                    } else {
                        notification.addAction(icon, action, pendingActionIntent);
                    }
                }
            }

            if (sharedPreferences.getString(BundleUtils.get(bundle, NotificationConstants.ID), null) != null) {
                SharedPreferences.Editor editor = sharedPreferences.edit();
                editor.remove(BundleUtils.get(bundle, NotificationConstants.ID));
                editor.apply();
            }

            if (!(ApplicationUtils.isApplicationInForeground(context) && BundleUtils.getB(bundle,
                NotificationConstants.DONT_NOTIFY_IN_FOREGROUND))) {
                Notification builtNotification = notification.build();
                builtNotification.defaults |= Notification.DEFAULT_LIGHTS;

                if (BundleUtils.contains(bundle, NotificationConstants.TAG)) {
                    String tag = BundleUtils.get(bundle, NotificationConstants.TAG);
                    notificationManager.notify(tag, notificationID, builtNotification);
                } else {
                    notificationManager.notify(notificationID, builtNotification);
                }
                if (promise != null) {
                    promise.success(MapUtils.fromBundle(bundle));
                }
            }

            this.localNotificationRepeat(bundle);
        } catch (NullPointerException | IllegalArgumentException | IllegalStateException | JSONException e) {
            if (promise != null) {
                promise.error(e.getLocalizedMessage());
            }
        }
    }

    private void localNotificationRepeat(Bundle bundle) {
        long newFireDate = NotificationConfigUtils.configNextFireDate(bundle);

        if (newFireDate == 0) {
            return;
        }

        bundle.putDouble(NotificationConstants.FIRE_DATE, newFireDate);
        this.localNotificationSchedule(bundle, null);
    }

    public void localNotificationSchedule(Bundle bundle, Promise promise) {
        checkRequiredParams(bundle, promise, Core.NotificationType.SCHEDULED);

        NotificationAttributes notificationAttributes = new NotificationAttributes(bundle);
        String id = notificationAttributes.getId();

        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(id, notificationAttributes.toJson().toString());
        editor.apply();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            localNotificationScheduleSetAlarm(bundle);
        }

        if (promise != null) {
            try {
                promise.success(MapUtils.fromBundle(bundle));
            } catch (Exception e) {
                promise.error(e.getLocalizedMessage());
            }
        }
    }

    public void localNotificationScheduleSetAlarm(Bundle bundle) {
        long fireDate = BundleUtils.getL(bundle, NotificationConstants.FIRE_DATE);
        boolean allowWhileIdle = BundleUtils.getB(bundle, NotificationConstants.ALLOW_WHILE_IDLE);
        long curr = new Date().getTime();
        if (curr > fireDate) {
            Log.e(TAG, "Scheduled time is earlier than now, fire immediately");
        }

        PendingIntent pendingIntent = buildScheduleNotificationIntent(bundle);

        if (pendingIntent == null) {
            return;
        }

        if (allowWhileIdle && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            getAlarmManager().setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, fireDate, pendingIntent); // Doze Mode
        } else {
            getAlarmManager().setExact(AlarmManager.RTC_WAKEUP, fireDate, pendingIntent);
        }
    }

    private PendingIntent buildScheduleNotificationIntent(Bundle bundle) {
        try {
            int id = Integer.parseInt(BundleUtils.get(bundle, NotificationConstants.ID));

            Intent intent = new Intent(context, HmsLocalNotificationScheduledPublisher.class);
            intent.putExtra(Core.ScheduledPublisher.NOTIFICATION_ID, id);
            intent.putExtras(bundle);

            if (android.os.Build.VERSION.SDK_INT >= 23) {
                return PendingIntent.getBroadcast(context, id, intent, PendingIntent.FLAG_IMMUTABLE);
            } else {
                return PendingIntent.getBroadcast(context, id, intent, PendingIntent.FLAG_UPDATE_CURRENT);
            }

        } catch (Exception e) {
            Log.e(TAG, ResultCode.ERROR, e);
        }

        return null;
    }

    public void isChannelBlocked(String channelId, Promise promise) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            promise.error("requires API level 24");
            return;
        }

        if (channelId == null) {
            promise.error("invalid channelId on isChannelBlocked");
            return;
        }

        NotificationChannel channel = notificationManager().getNotificationChannel(channelId);

        if (channel == null) {
            promise.error("invalid channelId on isChannelBlocked");
        }

        boolean res = NotificationManager.IMPORTANCE_NONE == channel.getImportance();
        promise.sendPluginResult(new PluginResult(PluginResult.Status.OK, res));

    }

    public void channelExists(String channelId, Promise promise) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            promise.error("requires API level 26");
            return;
        }

        if (channelId == null) {
            promise.error("invalid channelId on channelExists");
            return;
        }

        NotificationChannel channel = notificationManager().getNotificationChannel(channelId);

        if (channel == null) {
            promise.error("invalid channelId on channelExists");
        }

        boolean result = channel != null;
        promise.sendPluginResult(new PluginResult(PluginResult.Status.OK, result));

    }

    public void deleteChannel(String channelId, Promise promise) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            promise.error("requires API level 26");
            return;
        }

        try {
            notificationManager().deleteNotificationChannel(channelId);
            promise.sendPluginResult(new PluginResult(PluginResult.Status.OK, true));
        } catch (Exception e) {
            Log.e(TAG, ResultCode.ERROR, e);
            promise.error(e.getLocalizedMessage());
        }

    }

    public List<String> listChannels() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return new ArrayList<>();
        }

        List<String> channels = new ArrayList<>();

        try {
            List<NotificationChannel> notificationChannels = notificationManager().getNotificationChannels();
            for (NotificationChannel channel : notificationChannels) {
                channels.add(channel.getId());
            }
            return channels;
        } catch (NullPointerException | IllegalArgumentException | IllegalStateException e) {
            return channels;
        }

    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    public JSONArray getNotifications() throws JSONException {
        StatusBarNotification[] activeNotifications = notificationManager().getActiveNotifications();
        JSONArray result = new JSONArray();

        for (StatusBarNotification statusBarNotification : activeNotifications) {
            Notification notification = statusBarNotification.getNotification();
            Bundle extras = notification.extras;

            JSONObject notificationPrep = new JSONObject();
            notificationPrep.put(NotificationConstants.IDENTIFIER, "" + statusBarNotification.getId());
            notificationPrep.put(NotificationConstants.TITLE, extras.getString(Notification.EXTRA_TITLE));
            notificationPrep.put(NotificationConstants.BODY, extras.getString(Notification.EXTRA_TEXT));
            notificationPrep.put(NotificationConstants.TAG, statusBarNotification.getTag());
            notificationPrep.put(NotificationConstants.GROUP, notification.getGroup());
            result.put(notificationPrep);
        }
        return result;

    }

    public JSONArray getScheduledNotifications() {
        JSONArray result = new JSONArray();

        Map<String, ?> scheduledNotifications = sharedPreferences.getAll();

        for (Map.Entry<String, ?> entry : scheduledNotifications.entrySet()) {
            try {
                NotificationAttributes notification = fromJson(entry.getValue().toString());
                JSONObject notificationMap = new JSONObject();

                notificationMap.put(NotificationConstants.ID, notification.getId());
                notificationMap.put(NotificationConstants.TITLE, notification.getTitle());
                notificationMap.put(NotificationConstants.MESSAGE, notification.getMessage());
                notificationMap.put(NotificationConstants.DATA, notification.getData());
                notificationMap.put(NotificationConstants.TICKER, notification.getTicker());
                notificationMap.put(NotificationConstants.NUMBER, notification.getNumber());
                notificationMap.put(NotificationConstants.DATE, notification.getFireDate());
                notificationMap.put(NotificationConstants.CHANNEL_ID, notification.getChannelId());
                notificationMap.put(NotificationConstants.CHANNEL_NAME, notification.getChannelName());
                notificationMap.put(NotificationConstants.TAG, notification.getTag());
                notificationMap.put(NotificationConstants.REPEAT_INTERVAL, notification.getRepeatType());
                notificationMap.put(NotificationConstants.SOUND_NAME, notification.getSound());

                result.put(notificationMap);
            } catch (JSONException e) {
                Log.e(TAG, e.getLocalizedMessage());
            }
        }

        return result;
    }

    public void cancelNotifications() {
        notificationManager().cancelAll();
    }

    public void cancelNotification(int id) {
        notificationManager().cancel(id);
    }

    public void cancelNotification(String tag, int id) {
        notificationManager().cancel(tag, id);
    }

    public void cancelNotificationsWithId(JSONArray ids) throws JSONException {
        for (int idx = 0; idx < ids.length(); idx++) {
            String id = ids.getString(idx);
            if (id != null) {
                cancelNotification(Integer.parseInt(id));
            }
        }
    }

    public void cancelNotificationsWithIdTag(JSONArray idTags) throws JSONException {
        for (int idx = 0; idx < idTags.length(); idx++) {
            JSONObject notification = idTags.getJSONObject(idx);
            String id = notification.getString(NotificationConstants.ID);
            String tag = notification.getString(NotificationConstants.TAG);
            if (id != null) {
                cancelNotification(tag, Integer.parseInt(id));
            }
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    public void cancelNotificationsWithTag(String tag) {
        StatusBarNotification[] activeNotifications = notificationManager().getActiveNotifications();

        for (StatusBarNotification statusBarNotification : activeNotifications) {
            if (tag.equals(statusBarNotification.getTag())) {
                cancelNotification(tag, statusBarNotification.getId());
            }
        }
    }

    public void cancelScheduledNotifications() {
        for (String id : sharedPreferences.getAll().keySet()) {
            cancelScheduledNotification(id);
        }
    }

    private void cancelScheduledNotification(String id) {
        if (sharedPreferences.contains(id)) {
            SharedPreferences.Editor editor = sharedPreferences.edit();
            editor.remove(id);
            editor.apply();
        }

        NotificationManager notificationManager = notificationManager();

        Bundle bundle = new Bundle();
        bundle.putString(NotificationConstants.ID, id);
        PendingIntent pendingIntent = buildScheduleNotificationIntent(bundle);

        if (pendingIntent != null) {
            getAlarmManager().cancel(pendingIntent);
        }

        try {
            notificationManager.cancel(Integer.parseInt(id));
        } catch (Exception e) {
            Log.e(TAG, ResultCode.ERROR, e);
        }
    }
}
