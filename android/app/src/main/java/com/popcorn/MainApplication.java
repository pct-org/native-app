package com.popcorn;

import android.app.Application;
import android.os.StrictMode;

import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.reactcommunity.rnlanguages.RNLanguagesPackage;
import com.tripss.updaternapp.UpdateRNAppPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rnfs.RNFSPackage;
import com.futurepress.staticserver.FPStaticServerPackage;
import com.googlecast.GoogleCastPackage;
import com.ghondar.torrentstreamer.*;
import com.github.yamill.orientation.OrientationPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SplashScreenReactPackage(),
            new RNLanguagesPackage(),
            new UpdateRNAppPackage(),
            new VectorIconsPackage(),
            new RNFSPackage(),
            new FPStaticServerPackage(),
            new GoogleCastPackage(),
            new TorrentStreamerPackage(),
            new OrientationPackage(),
            new ReactVideoPackage(),
            new LinearGradientPackage()
      );
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
    try{
      Method m = StrictMode.class.getMethod("disableDeathOnFileUriExposure");
      m.invoke(null);
    }catch(Exception e){
      e.printStackTrace();
    }

    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
