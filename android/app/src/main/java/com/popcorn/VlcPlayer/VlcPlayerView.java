package com.popcorn.VlcPlayer;

import android.app.Activity;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Handler;
import android.preference.PreferenceManager;
import android.util.AttributeSet;
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

public class VlcPlayerView extends FrameLayout implements IVLCVout.Callback, LifecycleEventListener {

  private boolean pausedState;

  private final VlcEventEmitter eventEmitter;

  private final AspectRatioFrameLayout layout;
  private ViewGroup.LayoutParams layoutParams;
  private SurfaceView surfaceView;
  private ThemedReactContext context;
  private boolean isFullscreen;

  // media player
  private LibVLC libvlc;
  private MediaPlayer mMediaPlayer = null;
  private boolean autoPlay;


  public VlcPlayerView(ThemedReactContext context) {
    this(context, null);
  }

  public VlcPlayerView(ThemedReactContext context, AttributeSet attrs) {
    this(context, attrs, 0);
  }

  public VlcPlayerView(ThemedReactContext context, AttributeSet attrs, int defStyleAttr) {
    super(context);

    this.context = context;
    this.context.addLifecycleEventListener(this);

    this.eventEmitter = new VlcEventEmitter(context);

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

    this.eventEmitter.setViewId(id);
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

      this.eventEmitter.setMediaPlayer(mMediaPlayer);
      mMediaPlayer.setEventListener(this.eventEmitter);

      if (mMediaPlayer != null) {
        setVideoView();
      }
    }
  }

  private void setMedia(String filePath) {
    Uri uri = Uri.parse(filePath);
    Media media = new Media(libvlc, uri);
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
    setMedia(filePath);
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
    // event.putDouble(EVENT_PROP_CURRENT_TIME, mMediaPlayer.getTime());
    // event.putDouble(EVENT_PROP_SEEK_TIME, seek);
    // mEventEmitter.receiveEvent(getId(), Events.EVENT_SEEK.toString(), event);
    mMediaPlayer.setTime((long) (mMediaPlayer.getLength() * seek));
  }

  public void setVolume(int volume) {
    mMediaPlayer.setVolume(volume);
  }

  @Override
  public void onNewLayout(IVLCVout vout, int width, int height, int visibleWidth, int visibleHeight, int sarNum, int sarDen) {
    if (width * height == 0) {
      return;
    }

    double videoWidth = visibleWidth,
        videoHeight = visibleHeight,
        aspectRatio;

    // compute the aspect ratio
    if (sarDen == sarNum) {
      /* No indication about the density, assuming 1:1 */
      aspectRatio = videoWidth / videoHeight;
    } else {
      /* Use the specified aspect ratio */
      videoWidth = videoWidth * (double) sarNum / sarDen;
      aspectRatio = videoWidth / videoHeight;
    }

    boolean isInitialRatio = layout.getAspectRatio() == 0;
    layout.setAspectRatio((float) aspectRatio);

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

    // React native workaround for measuring and layout on initial load.
    post(measureAndLayout);
  }
}
