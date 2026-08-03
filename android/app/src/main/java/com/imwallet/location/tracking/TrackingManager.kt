package com.imwallet.location.tracking

import android.annotation.SuppressLint
import android.content.Context
import android.os.Looper
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import com.imwallet.location.model.LocationResult as AppLocationResult
import com.imwallet.location.model.TrackingConfig

class TrackingManager(
    context: Context
) {

    private val fusedClient =
        LocationServices.getFusedLocationProviderClient(context)

    private var callback: LocationCallback? = null

    private var tracking = false

    fun isTracking(): Boolean = tracking

    @SuppressLint("MissingPermission")
    fun startTracking(
        config: TrackingConfig,
        onLocation: (AppLocationResult) -> Unit
    ) {

        if (tracking) return

        val request = LocationRequest.Builder(
            Priority.PRIORITY_HIGH_ACCURACY,
            config.updateInterval
        )
            .setMinUpdateIntervalMillis(config.fastestInterval)
            .setMinUpdateDistanceMeters(config.minDistance)
            .setWaitForAccurateLocation(config.waitForAccurateLocation)
            .setMaxUpdateDelayMillis(config.maxUpdateDelay)
            .build()

        callback = object : LocationCallback() {

            override fun onLocationResult(
                result: com.google.android.gms.location.LocationResult
            ) {

                val location = result.lastLocation ?: return

                onLocation(
                    AppLocationResult(
                        latitude = location.latitude,
                        longitude = location.longitude,
                        accuracy = location.accuracy,
                        altitude = location.altitude,
                        speed = location.speed,
                        bearing = location.bearing,
                        timestamp = location.time
                    )
                )
            }
        }

        fusedClient.requestLocationUpdates(
            request,
            callback!!,
            Looper.getMainLooper()
        )

        tracking = true
    }

    fun stopTracking() {

        callback?.let {
            fusedClient.removeLocationUpdates(it)
        }

        callback = null
        tracking = false
    }
}