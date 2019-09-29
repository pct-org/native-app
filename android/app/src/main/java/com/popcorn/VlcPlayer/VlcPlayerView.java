package com.popcorn.VlcPlayer;

import android.app.Activity;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Handler;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.Gravity;
import android.view.SurfaceView;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.FrameLayout;
import android.widget.Toast;

import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import org.videolan.libvlc.IVLCVout;
import org.videolan.libvlc.LibVLC;
import org.videolan.libvlc.Media;
import org.videolan.libvlc.MediaPlayer;
import org.videolan.libvlc.util.VLCUtil;

import java.util.ArrayList;

public class VlcPlayerView extends FrameLayout implements IVLCVout.Callback, LifecycleEventListener, MediaPlayer.EventListener {

  private boolean pausedState;

  public enum Events {
    EVENT_PROGRESS("onVLCProgress"),
    EVENT_ENDED("onVLCEnded"),
    EVENT_STOPPED("onVLCStopped"),
    EVENT_PLAYING("onVLCPlaying"),
    EVENT_BUFFERING("onVLCBuffering"),
    EVENT_PAUSED("onVLCPaused"),
    EVENT_ERROR("onVLCError"),
    EVENT_VOLUME_CHANGED("onVLCVolumeChanged"),
    EVENT_SEEK("onVLCVideoSeek");

    private final String mName;

    Events(final String name) {
      mName = name;
    }

    @Override
    public String toString() {
      return mName;
    }
  }

  private final VlcEventEmitter eventEmitter;


  public static final String EVENT_PROP_DURATION = "duration";
  public static final String EVENT_PROP_CURRENT_TIME = "currentTime";
  public static final String EVENT_PROP_POSITION = "position";
  public static final String EVENT_PROP_END = "endReached";
  public static final String EVENT_PROP_SEEK_TIME = "seekTime";

  private RCTEventEmitter mEventEmitter;
  private final AspectRatioFrameLayout layout;
  private ViewGroup.LayoutParams layoutParams;
  private SurfaceView surfaceView;
  private ThemedReactContext context;
  private boolean isFullscreen;
  private double aspectRatio;

  private String mSrcString;

  // media player
  private LibVLC libvlc;
  private MediaPlayer mMediaPlayer = null;

  private Media media;
  private boolean autoPlay;

  public VlcPlayerView(ThemedReactContext context) {
    super(context);

    this.context = context;

    this.eventEmitter = new VlcEventEmitter(context);

    mEventEmitter = this.context.getJSModule(RCTEventEmitter.class);
    this.context.addLifecycleEventListener(this);

    LayoutParams aspectRatioParams = new LayoutParams(
        LayoutParams.MATCH_PARENT,
        LayoutParams.MATCH_PARENT
    );
    aspectRatioParams.gravity = Gravity.CENTER;
    layout = new AspectRatioFrameLayout(context);
    layout.setLayoutParams(aspectRatioParams);

    layout.setBackgroundColor(ContextCompat.getColor(context, android.R.color.black));

    layoutParams = new ViewGroup.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT,
        ViewGroup.LayoutParams.MATCH_PARENT
    );

    updateSurfaceView();

    addViewInLayout(layout, 0, aspectRatioParams);

    initializePlayerIfNeeded();
  }

  @Override
  public void setId(int id) {
    super.setId(id);
    eventEmitter.setViewId(id);
  }

  private void updateSurfaceView() {
    SurfaceView view = new SurfaceView(context);
    view.setLayoutParams(layoutParams);

    surfaceView = view;

    if (layout.getChildAt(0) != null) {
      layout.removeViewAt(0);
    }

    layout.addView(surfaceView, 0, layoutParams);

    if (this.mMediaPlayer != null) {
      setVideoView();
    }
  }

  private void setVideoView() {
    final IVLCVout vout = mMediaPlayer.getVLCVout();

    if (!vout.areViewsAttached()) {
      // vout.setVideoView((SurfaceView) surfaceView);
      vout.setVideoView(surfaceView);
    }

    vout.addCallback(this);
    vout.attachViews();
  }

  private void initializePlayerIfNeeded() {
    if (mMediaPlayer == null) {
      final SharedPreferences pref = PreferenceManager.getDefaultSharedPreferences(getContext().getApplicationContext());
      // Create LibVLC
      ArrayList<String> options = new ArrayList<>(50);
      int deblocking = getDeblocking(-1);

      int networkCaching = pref.getInt("network_caching_value", 0);
      if (networkCaching > 60000) {
        networkCaching = 60000;

      } else if (networkCaching < 0) {
        networkCaching = 0;
      }

      options.add("--audio-time-stretch");
      options.add("--avcodec-skiploopfilter");
      options.add("" + deblocking);
      options.add("--avcodec-skip-frame");
      options.add("0");
      options.add("--avcodec-skip-idct");
      options.add("0");
      options.add("--subsdec-encoding");
      options.add("--stats");

      if (networkCaching > 0) {
        options.add("--network-caching=" + networkCaching);
      }

      options.add("--androidwindow-chroma");
      options.add("RV32");

      options.add("-vv");

      libvlc = new LibVLC(options);

      // Create media player
      mMediaPlayer = new MediaPlayer(libvlc);
      surfaceView.setKeepScreenOn(true);
      mMediaPlayer.setEventListener(this);

      if (mMediaPlayer != null) {
        setVideoView();
      }
    }
  }

  private void setMedia(String filePath) {
    Uri uri = Uri.parse(filePath);
    media = new Media(libvlc, uri);
    mMediaPlayer.setMedia(media);

    if (autoPlay) {
      mMediaPlayer.play();
    }
  }

  private static int getDeblocking(int deblocking) {
    int ret = deblocking;
    if (deblocking < 0) {
      /**
       * Set some reasonable sDeblocking defaults:
       *
       * Skip all (4) for armv6 and MIPS by default
       * Skip non-ref (1) for all armv7 more than 1.2 Ghz and more than 2 cores
       * Skip non-key (3) for all devices that don't meet anything above
       */
      VLCUtil.MachineSpecs m = VLCUtil.getMachineSpecs();
      if (m == null) return ret;
      if ((m.hasArmV6 && !(m.hasArmV7)) || m.hasMips) ret = 4;
      else if (m.frequency >= 1200 && m.processors > 2) ret = 1;
      else if (m.bogoMIPS >= 1200 && m.processors > 2) {
        ret = 1;
      } else ret = 3;
    } else if (deblocking > 4) { // sanity check
      ret = 3;
    }
    return ret;
  }

  private void releasePlayer() {
    if (libvlc == null) {
      return;
    }

    if (isFullscreen) {
      setFullscreen(false);
    }

    mMediaPlayer.stop();
    final IVLCVout vout = mMediaPlayer.getVLCVout();
    vout.removeCallback(this);
    vout.detachViews();
    libvlc.release();
    libvlc = null;
  }

  public void setFilePath(String filePath) {
    this.mSrcString = filePath;
    setMedia(mSrcString);
  }

  public void setAutoPlay(boolean autoPlay) {
    this.autoPlay = autoPlay;
  }

  /**
   * Play or pause the media.
   */
  public void setPaused(boolean paused) {
    pausedState = paused;
    if (paused) {
      if (mMediaPlayer.isPlaying()) {
        mMediaPlayer.pause();
      }

    } else {
      if (!mMediaPlayer.isPlaying()) {
        mMediaPlayer.play();
      }
    }
  }

  public void onDropViewInstance() {
    releasePlayer();
  }

  public void seek(float seek) {
    WritableMap event = Arguments.createMap();
    event.putDouble(EVENT_PROP_CURRENT_TIME, mMediaPlayer.getTime());
    event.putDouble(EVENT_PROP_SEEK_TIME, seek);
    mEventEmitter.receiveEvent(getId(), Events.EVENT_SEEK.toString(), event);
    mMediaPlayer.setTime((long) (mMediaPlayer.getLength() * seek));
  }

  public void setVolume(int volume) {
    mMediaPlayer.setVolume(volume);
  }

//  @Override
//  protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
//    super.onMeasure(widthMeasureSpec, heightMeasureSpec);
//
//    if (aspectRatio == 0) {
//      // Aspect ratio not set.
//      return;
//    }
//
//    int measuredWidth = getMeasuredWidth();
//    int measuredHeight = getMeasuredHeight();
//
//    float viewAspectRatio = (float) measuredWidth / measuredHeight;
//    double aspectDeformation = aspectRatio / viewAspectRatio - 1;
//    Log.d("TYCHO", "w:" + measuredWidth + " h:" + measuredHeight);
//    Log.d("TYCHO", "aspectDeformation:" + aspectDeformation);
//
//    if (aspectDeformation > 0) {
//      ViewGroup.LayoutParams lp = surfaceView.getLayoutParams();
//      lp.width = measuredWidth;
//      lp.height = measuredHeight;
//      surfaceView.setLayoutParams(lp);
//      surfaceView.invalidate();
//
//    } else {
//      ViewGroup.LayoutParams lp = surfaceView.getLayoutParams();
//      lp.width = measuredWidth;
//      lp.height = measuredHeight;
//      surfaceView.setLayoutParams(lp);
//      surfaceView.invalidate();
//    }
//  }

  @Override
  public void onNewLayout(IVLCVout vout, int width, int height, int visibleWidth, int visibleHeight, int sarNum, int sarDen) {
    if (width * height == 0) {
      return;
    }

    double videoWidth = visibleWidth,
        videoHeight = visibleHeight;

    // compute the aspect ratio
    if (sarDen == sarNum) {
      /* No indication about the density, assuming 1:1 */
      aspectRatio = videoWidth / videoHeight;
    } else {
      /* Use the specified aspect ratio */
      videoWidth = videoWidth * (double) sarNum / sarDen;
      aspectRatio = videoWidth / videoHeight;
    }

    Log.d("TYCHO onNewLayout", "aspectRatio: " + aspectRatio);
    Log.d("TYCHO onNewLayout", "videoHeight: " + videoHeight);
    Log.d("TYCHO onNewLayout", "videoWidth: " + videoWidth);

    boolean isInitialRatio = layout.getAspectRatio() == 0;
    layout.setAspectRatio((float) aspectRatio);

    ViewGroup.LayoutParams lp = surfaceView.getLayoutParams();
    lp.width = (int) videoWidth;
    lp.height = visibleHeight;
    surfaceView.setLayoutParams(lp);
    surfaceView.invalidate();

    // React native workaround for measuring and layout on initial load.
    if (isInitialRatio) {
      post(measureAndLayout);
    }
  }

  @Override
  public void onSurfacesCreated(IVLCVout vout) {

  }

  @Override
  public void onSurfacesDestroyed(IVLCVout vout) {

  }

  @Override
  public void onHardwareAccelerationError(IVLCVout vout) {
    // Handle errors with hardware acceleration
    this.releasePlayer();
    Toast.makeText(getContext(), "Error with hardware acceleration", Toast.LENGTH_LONG).show();
  }

  @Override
  public void onHostResume() {
    new Handler().post(new Runnable() {
      @Override
      public void run() {
        // Restore original state
        setPaused(pausedState);
      }
    });
  }

  @Override
  public void onHostPause() {
    setPaused(true);
  }

  @Override
  public void onHostDestroy() {

  }

  /**
   * Sets the resize mode which can be of value {@link ResizeMode.Mode}
   *
   * @param resizeMode The resize mode.
   */
  public void setResizeMode(@ResizeMode.Mode int resizeMode) {
    if (layout.getResizeMode() != resizeMode) {
      layout.setResizeMode(resizeMode);
      post(measureAndLayout);
    }

  }

  private final Runnable measureAndLayout = new Runnable() {
    @Override
    public void run() {
      measure(
          MeasureSpec.makeMeasureSpec(getWidth(), MeasureSpec.EXACTLY),
          MeasureSpec.makeMeasureSpec(getHeight(), MeasureSpec.EXACTLY));
      layout(getLeft(), getTop(), getRight(), getBottom());
    }
  };

  @Override
  public void onEvent(MediaPlayer.Event event) {
    WritableMap eventMap = Arguments.createMap();

    switch (event.type) {
      case MediaPlayer.Event.EndReached:
        pausedState = false;
        eventMap.putBoolean(EVENT_PROP_END, true);
        mEventEmitter.receiveEvent(getId(), Events.EVENT_ENDED.toString(), eventMap);
        break;
      case MediaPlayer.Event.Stopped:
        mEventEmitter.receiveEvent(getId(), Events.EVENT_STOPPED.toString(), null);
        break;
      case MediaPlayer.Event.Playing:
        Log.d("TYCHO", "Playing event");
        eventMap.putDouble(EVENT_PROP_DURATION, mMediaPlayer.getLength());
        mEventEmitter.receiveEvent(getId(), Events.EVENT_PLAYING.toString(), eventMap);

        this.eventEmitter.startedPlaying();

        break;
//            case MediaPlayer.Event.Buffering:
//                mEventEmitter.receiveEvent(getId(), Events.EVENT_PLAYING.toString(), null);
//                break;
      case MediaPlayer.Event.Paused:
        mEventEmitter.receiveEvent(getId(), Events.EVENT_PAUSED.toString(), null);
        break;
      case MediaPlayer.Event.EncounteredError:
        mEventEmitter.receiveEvent(getId(), Events.EVENT_ERROR.toString(), null);
        break;
      case MediaPlayer.Event.TimeChanged:
        eventMap.putDouble(EVENT_PROP_CURRENT_TIME, mMediaPlayer.getTime());
        eventMap.putDouble(EVENT_PROP_DURATION, mMediaPlayer.getLength());
        eventMap.putDouble(EVENT_PROP_POSITION, mMediaPlayer.getPosition());
        mEventEmitter.receiveEvent(getId(), Events.EVENT_PROGRESS.toString(), eventMap);
        break;
    }
  }

  public void setFullscreen(boolean fullscreen) {
    if (fullscreen == isFullscreen) {
      return; // Avoid generating events when nothing is changing
    }

    isFullscreen = fullscreen;

    Activity activity = context.getCurrentActivity();
    if (activity == null) {
      return;
    }

    Window window = activity.getWindow();
    View decorView = window.getDecorView();
    int uiOptions;
    if (isFullscreen) {
      uiOptions = SYSTEM_UI_FLAG_HIDE_NAVIGATION
          | SYSTEM_UI_FLAG_IMMERSIVE_STICKY
          | SYSTEM_UI_FLAG_LAYOUT_STABLE
          | SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
          | SYSTEM_UI_FLAG_FULLSCREEN;

      // eventEmitter.fullscreenWillPresent();
      decorView.setSystemUiVisibility(uiOptions);
      // eventEmitter.fullscreenDidPresent();

    } else {
      uiOptions = View.SYSTEM_UI_FLAG_VISIBLE;
      // eventEmitter.fullscreenWillDismiss();
      decorView.setSystemUiVisibility(uiOptions);
      // eventEmitter.fullscreenDidDismiss();
    }

    // Update the view
    ViewGroup.LayoutParams lp = surfaceView.getLayoutParams();
    lp.width = getMeasuredWidth();
    lp.height = getMeasuredHeight();
    surfaceView.setLayoutParams(lp);
    surfaceView.invalidate();

    // React native workaround for measuring and layout on initial load.
    post(measureAndLayout);
  }
}
