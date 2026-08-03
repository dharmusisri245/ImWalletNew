package com.imwallet.location.bridge

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.imwallet.location.gps.GpsManager
import com.imwallet.location.provider.FusedLocationProvider

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

import com.facebook.react.modules.core.DeviceEventManagerModule
import com.imwallet.location.model.TrackingConfig
import com.imwallet.location.tracking.TrackingManager

class LocationModule(
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    private val gpsManager = GpsManager(reactContext)
    private val provider = FusedLocationProvider(reactContext)
    private val trackingManager = TrackingManager(reactContext)

    override fun getName(): String = "LocationModule"


    

    @ReactMethod
    fun getModuleInfo(promise: Promise) {
        promise.resolve("Location Module Initialized Successfully 🚀")
    }


    private fun sendLocationEvent(
    eventName: String,
    params: com.facebook.react.bridge.WritableMap
) {
    reactApplicationContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        .emit(eventName, params)
}

    /**
     * Current Location
     */
    @ReactMethod
    fun getCurrentLocation(promise: Promise) {

        CoroutineScope(Dispatchers.IO).launch {

            try {

                val location = provider.getCurrentLocation()

                val map = Arguments.createMap().apply {

                    putDouble("latitude", location.latitude)

                    putDouble("longitude", location.longitude)

                    putDouble("altitude", location.altitude)

                    putDouble("accuracy", location.accuracy.toDouble())

                    putDouble("speed", location.speed.toDouble())

                    putDouble("bearing", location.bearing.toDouble())

                    putDouble("timestamp", location.timestamp.toDouble())

                }

                promise.resolve(map)

            } catch (e: Exception) {

                promise.reject(
                    "LOCATION_ERROR",
                    e.message,
                    e
                )

            }

        }

    }

    /**
     * Last Known Location
     */
    @ReactMethod
    fun getLastKnownLocation(promise: Promise) {

        CoroutineScope(Dispatchers.IO).launch {

            try {

                val location = provider.getLastKnownLocation()

                val map = Arguments.createMap().apply {

                    putDouble("latitude", location.latitude)

                    putDouble("longitude", location.longitude)

                    putDouble("altitude", location.altitude)

                    putDouble("accuracy", location.accuracy.toDouble())

                    putDouble("speed", location.speed.toDouble())

                    putDouble("bearing", location.bearing.toDouble())

                    putDouble("timestamp", location.timestamp.toDouble())

                }

                promise.resolve(map)

            } catch (e: Exception) {

                promise.reject(
                    "LOCATION_ERROR",
                    e.message,
                    e
                )

            }

        }

    }

  @ReactMethod
fun startTracking(promise: Promise) {

    try {

        val config = TrackingConfig()

        trackingManager.startTracking(config) { location ->

            val map = Arguments.createMap().apply {

                putDouble("latitude", location.latitude)
                putDouble("longitude", location.longitude)
                putDouble("accuracy", location.accuracy.toDouble())
                putDouble("altitude", location.altitude)
                putDouble("speed", location.speed.toDouble())
                putDouble("bearing", location.bearing.toDouble())
                putDouble("timestamp", location.timestamp.toDouble())

            }

            sendLocationEvent("onLocationChanged", map)
        }

        promise.resolve(true)

    } catch (e: Exception) {

        promise.reject(
            "TRACKING_ERROR",
            e.message,
            e
        )
    }
}

  @ReactMethod
fun stopTracking(promise: Promise) {

    try {

        trackingManager.stopTracking()

        promise.resolve(true)

    } catch (e: Exception) {

        promise.reject(
            "TRACKING_ERROR",
            e.message,
            e
        )
    }
}


   @ReactMethod
   fun isGpsEnabled(promise: Promise) {

    try {

        promise.resolve(gpsManager.isGpsEnabled())

    } catch (e: Exception) {

        promise.reject(
            "GPS_ERROR",
            e.message,
            e
        )

    }

   }

   @ReactMethod
   fun openLocationSettings(promise: Promise) {

    try {

        gpsManager.openLocationSettings()

        promise.resolve(true)

    } catch (e: Exception) {

        promise.reject(
            "GPS_ERROR",
            e.message,
            e
        )

    }

  }


  @ReactMethod
fun ensureGpsEnabled(promise: Promise) {

    val activity = getCurrentActivity()

    if (activity == null) {
        promise.reject(
            "NO_ACTIVITY",
            "Current Activity is null."
        )
        return
    }

    gpsManager.ensureGpsEnabled(
        activity,
        promise
    )
}

}