package com.imwallet

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

// ADD THIS IMPORT
import com.imwallet.location.bridge.LocationPackage

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {

          // Register your native module
          add(LocationPackage())

        },
    )
  }

  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)
  }
}