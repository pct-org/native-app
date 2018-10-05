package com.popcorn;

import android.os.Bundle;
import com.facebook.react.GoogleCastActivity;
import android.content.Intent;
import android.content.res.Configuration;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends GoogleCastActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "popcorn";
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);

        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);

        this.sendBroadcast(intent);
    }
}
