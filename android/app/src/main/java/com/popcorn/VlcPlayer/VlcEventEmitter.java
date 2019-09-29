package com.popcorn.VlcPlayer;

import android.view.View;

import androidx.annotation.StringDef;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

class VlcEventEmitter {

  private final RCTEventEmitter eventEmitter;

  private int viewId = View.NO_ID;

  VlcEventEmitter(ReactContext reactContext) {
    this.eventEmitter = reactContext.getJSModule(RCTEventEmitter.class);
  }

  private static final String EVENT_PLAYING = "onVLCPlaying";
  private static final String EVET_PROGRESS = "onVLCProgress";

  static final String[] Events = {
      EVENT_PLAYING,
      EVET_PROGRESS
  };

  @Retention(RetentionPolicy.SOURCE)
  @StringDef({
      EVENT_PLAYING,
      EVET_PROGRESS
  })
  @interface VideoEvents {
  }

  void setViewId(int viewId) {
    this.viewId = viewId;
  }

  void startedPlaying() {
    receiveEvent(EVENT_PLAYING, null);
  }

  private void receiveEvent(@VideoEvents String type, WritableMap event) {
    eventEmitter.receiveEvent(viewId, type, event);
  }

}