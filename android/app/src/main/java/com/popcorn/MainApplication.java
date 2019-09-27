package com.popcorn;

import android.app.Application;
import android.app.UiModeManager;
import android.content.res.Configuration;
import android.os.StrictMode;

import com.facebook.react.ReactApplication;
import com.ghondar.vlc.VlcPlayerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import com.reactcommunity.rnlanguages.RNLanguagesPackage;
import com.tripss.updaternapp.UpdateRNAppPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rnfs.RNFSPackage;
import com.futurepress.staticserver.FPStaticServerPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnative.googlecast.GoogleCastPackage;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      List<ReactPackage> packages = new LinkedList<ReactPackage>(
          Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new VlcPlayerPackage(),
              new AsyncStoragePackage(),
              new RNGestureHandlerPackage(),
              new SplashScreenReactPackage(),
              new RNLanguagesPackage(),
              new UpdateRNAppPackage(),
              new VectorIconsPackage(),
              new RNFSPackage(),
              new FPStaticServerPackage(),
              new ReactVideoPackage(),
              new LinearGradientPackage()
          )
      );

      UiModeManager uiModeManager = (UiModeManager) getSystemService(UI_MODE_SERVICE);
      if (uiModeManager.getCurrentModeType() != Configuration.UI_MODE_TYPE_TELEVISION) {

        // Only add the ChromeCast if it's not TV
        packages.add(
            new GoogleCastPackage()
        );
      }

      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    try {
      Method m = StrictMode.class.getMethod("disableDeathOnFileUriExposure");
      m.invoke(null);
    } catch (Exception e) {
      e.printStackTrace();
    }

    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
