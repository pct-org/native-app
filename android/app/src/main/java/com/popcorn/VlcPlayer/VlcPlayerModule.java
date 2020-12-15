package com.popcorn.VlcPlayer;

import android.net.Uri;
import android.text.TextUtils;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

import javax.annotation.Nullable;

public class VlcPlayerModule extends ViewGroupManager<VlcPlayerView> {

  public static final String PROP_SOURCE = "source";
  public static final String PROP_SEEK = "seek";
  public static final String PROP_PAUSED = "paused";
  public static final String PROP_VOLUME = "volume";
  public static final String PROP_RESIZE_MODE = "resizeMode";
  public static final String PROP_FULLSCREEN = "fullscreen";
  public static final String PROP_SUBTITLE = "subtitleUri";

  @Override
  public String getName() {
    return "VlcPlayer";
  }

  @Override
  protected VlcPlayerView createViewInstance(ThemedReactContext reactContext) {
    return new VlcPlayerView(reactContext);
  }

  @Override
  public @Nullable
  Map<String, Object> getExportedViewConstants() {
    return MapBuilder.<String, Object>of(
        "ScaleNone", Integer.toString(ResizeMode.RESIZE_MODE_FIT),
        "ScaleAspectFit", Integer.toString(ResizeMode.RESIZE_MODE_FIT),
        "ScaleToFill", Integer.toString(ResizeMode.RESIZE_MODE_FILL),
        "ScaleAspectFill", Integer.toString(ResizeMode.RESIZE_MODE_CENTER_CROP)
    );
  }

  @Override
  public void onDropViewInstance(VlcPlayerView view) {
    super.onDropViewInstance(view);
    view.onDropViewInstance();
  }

  @Nullable
  @Override
  public Map getExportedCustomDirectEventTypeConstants() {
    MapBuilder.Builder builder = MapBuilder.builder();

    for (VlcEventEmitter.Events event : VlcEventEmitter.Events.values()) {
      builder.put(event.toString(), MapBuilder.of("registrationName", event.toString()));
    }

    return builder.build();
  }

  @ReactProp(name = PROP_SOURCE)
  public void setPath(final VlcPlayerView playerView, ReadableMap map) {
    String path = map.getString("uri");
    boolean autoPlay = map.getBoolean("autoplay");

    playerView.setAutoPlay(autoPlay);
    playerView.setFilePath(path);
  }

  @ReactProp(name = PROP_SEEK)
  public void setSeek(final VlcPlayerView playerView, float seek) {
    playerView.seek((long) seek);
  }

  @ReactProp(name = PROP_PAUSED)
  public void setPaused(final VlcPlayerView playerView, boolean paused) {
    playerView.setPaused(paused);
  }

  @ReactProp(name = PROP_RESIZE_MODE)
  public void setResizeMode(final VlcPlayerView videoView, final String resizeModeOrdinalString) {
    videoView.setResizeMode(convertToIntDef(resizeModeOrdinalString));
  }

  @ReactProp(name = PROP_FULLSCREEN, defaultBoolean = false)
  public void setFullscreen(final VlcPlayerView videoView, final boolean fullscreen) {
    videoView.setFullscreen(fullscreen);
  }

  @ReactProp(name = PROP_SUBTITLE)
  public void setSubtitle(final VlcPlayerView videoView, final String uri) {
    videoView.setSubtitle(Uri.parse(uri));
  }

  private @ResizeMode.Mode
  int convertToIntDef(String resizeModeOrdinalString) {
    if (!TextUtils.isEmpty(resizeModeOrdinalString)) {
      int resizeModeOrdinal = Integer.parseInt(resizeModeOrdinalString);
      return ResizeMode.toResizeMode(resizeModeOrdinal);
    }

    return ResizeMode.RESIZE_MODE_FIT;
  }
}
