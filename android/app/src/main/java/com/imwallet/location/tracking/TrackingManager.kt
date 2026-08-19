package com.imwallet.location.tracking

import android.content.Context
import android.content.Intent
import androidx.core.content.ContextCompat

import com.imwallet.location.model.LocationResult as AppLocationResult
import com.imwallet.location.model.TrackingConfig
import com.imwallet.location.tracking.ForegroundLocationService

class TrackingManager(
    private val context: Context
) {

    companion object {
        private var locationListener:
                ((AppLocationResult) -> Unit)? = null

        private var tracking = false

        fun dispatchLocation(
            location: AppLocationResult
        ) {
            locationListener?.invoke(location)
        }

        fun isCurrentlyTracking(): Boolean {
            return tracking
        }
    }

    fun isTracking(): Boolean {
        return tracking
    }

    fun startTracking(
        config: TrackingConfig,
        onLocation: (AppLocationResult) -> Unit
    ) {

        if (tracking) {
            return
        }

        locationListener = onLocation
        tracking = true

        val intent = Intent(
            context,
            ForegroundLocationService::class.java
        ).apply {
            action = ForegroundLocationService.ACTION_START

            putExtra(
                ForegroundLocationService.EXTRA_UPDATE_INTERVAL,
                config.updateInterval
            )

            putExtra(
                ForegroundLocationService.EXTRA_FASTEST_INTERVAL,
                config.fastestInterval
            )

            putExtra(
                ForegroundLocationService.EXTRA_MIN_DISTANCE,
                config.minDistance
            )

            putExtra(
                ForegroundLocationService.EXTRA_MAX_UPDATE_DELAY,
                config.maxUpdateDelay
            )
        }

        ContextCompat.startForegroundService(
            context,
            intent
        )
    }

    fun stopTracking() {

        val intent = Intent(
            context,
            ForegroundLocationService::class.java
        ).apply {
            action = ForegroundLocationService.ACTION_STOP
        }

        context.startService(intent)

        locationListener = null
        tracking = false
    }
}