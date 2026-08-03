package com.imwallet.location.gps
import android.app.Activity
import com.facebook.react.bridge.Promise
import android.content.Context
import android.content.Intent
import android.location.LocationManager
import android.provider.Settings


class GpsManager(
    private val context: Context
) {

    /**
     * Returns true if GPS provider is enabled.
     */
    fun isGpsEnabled(): Boolean {

        val locationManager =
            context.getSystemService(Context.LOCATION_SERVICE)
                    as LocationManager

        return locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)
    }

    /**
     * Opens Android Location Settings.
     */
    fun openLocationSettings() {

        val intent = Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }

        context.startActivity(intent)
    }


   
    /**
     * Temporary implementation.
     * Later we'll replace this with SettingsClient.
     */
    fun ensureGpsEnabled(
        activity: Activity,
        promise: Promise
    ) {

        if (isGpsEnabled()) {
            promise.resolve(true)
            return
        }

        openLocationSettings()
        promise.resolve(false)
    }



}