package com.popcorn;

import android.app.Application;
import android.os.StrictMode;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.popcorn.VlcPlayer.VlcPlayerPackage;

import java.lang.reflect.Method;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      List<ReactPackage> packages = new PackageList(this).getPackages();

      packages.add(new VlcPlayerPackage());

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
