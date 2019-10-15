package com.popcorn.VlcPlayer;

import android.util.Log;
import android.view.View;

import androidx.annotation.StringDef;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import org.videolan.libvlc.MediaPlayer;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

class VlcEventEmitter implements MediaPlayer.EventListener {

  private final RCTEventEmitter eventEmitter;

  private MediaPlayer mediaPlayer;
  private int viewId = View.NO_ID;

  public static final String PROP_DURATION = "duration";
  public static final String PROP_CURRENT_TIME = "currentTime";
  public static final String PROP_POSITION = "position";

  VlcEventEmitter(ReactContext reactContext) {
    this.eventEmitter = reactContext.getJSModule(RCTEventEmitter.class);
  }

  public enum Events {
    PLAYING("onPlaying"),
    PAUSED("onPaused"),
    PROGRESS("onProgress");

    private final String mName;

    Events(final String name) {
      mName = name;
    }

    @Override
    public String toString() {
      return mName;
    }
  }

  void setViewId(int viewId) {
    this.viewId = viewId;
  }

  public void setMediaPlayer(MediaPlayer mediaPlayer) {
    this.mediaPlayer = mediaPlayer;
  }

  @Override
  public void onEvent(MediaPlayer.Event event) {
    WritableMap eventMap = Arguments.createMap();


    switch (event.type) {
      case MediaPlayer.Event.Playing:
        eventMap.putDouble(PROP_DURATION, this.mediaPlayer.getLength());

        this.receiveEvent(Events.PLAYING.toString(), eventMap);
        break;

      case MediaPlayer.Event.Paused:
        this.receiveEvent(Events.PAUSED.toString(), null);
        break;

      case MediaPlayer.Event.TimeChanged:
        eventMap.putDouble(PROP_CURRENT_TIME, this.mediaPlayer.getTime());
        eventMap.putDouble(PROP_DURATION, this.mediaPlayer.getLength());
        eventMap.putDouble(PROP_POSITION, this.mediaPlayer.getPosition());

        this.receiveEvent(Events.PROGRESS.toString(), eventMap);
        break;


//      case MediaPlayer.Event.EndReached:
//        pausedState = false;
//        eventMap.putBoolean(EVENT_PROP_END, true);
//        mEventEmitter.receiveEvent(getId(), VlcPlayerView.Events.EVENT_ENDED.toString(), eventMap);
//        break;
//      case MediaPlayer.Event.Stopped:
//        mEventEmitter.receiveEvent(getId(), VlcPlayerView.Events.EVENT_STOPPED.toString(), null);
//        break;
//      case MediaPlayer.Event.Playing:
//        Log.d("TYCHO", "Playing event");
//        eventMap.putDouble(EVENT_PROP_DURATION, mMediaPlayer.getLength());
//        mEventEmitter.receiveEvent(getId(), VlcPlayerView.Events.EVENT_PLAYING.toString(), eventMap);
//
//        this.eventEmitter.startedPlaying();
//
//        break;
////            case MediaPlayer.Event.Buffering:
////                mEventEmitter.receiveEvent(getId(), Events.EVENT_PLAYING.toString(), null);
////                break;
//      case MediaPlayer.Event.Paused:
//        mEventEmitter.receiveEvent(getId(), VlcPlayerView.Events.EVENT_PAUSED.toString(), null);
//        break;
//      case MediaPlayer.Event.EncounteredError:
//        mEventEmitter.receiveEvent(getId(), VlcPlayerView.Events.EVENT_ERROR.toString(), null);
//        break;
//      case MediaPlayer.Event.TimeChanged:
//        eventMap.putDouble(EVENT_PROP_CURRENT_TIME, mMediaPlayer.getTime());
//        eventMap.putDouble(EVENT_PROP_DURATION, mMediaPlayer.getLength());
//        eventMap.putDouble(EVENT_PROP_POSITION, mMediaPlayer.getPosition());
//        mEventEmitter.receiveEvent(getId(), VlcPlayerView.Events.EVENT_PROGRESS.toString(), eventMap);
//        break;
    }
  }

  private void receiveEvent(String type, WritableMap event) {
    eventEmitter.receiveEvent(viewId, type, event);
  }

}