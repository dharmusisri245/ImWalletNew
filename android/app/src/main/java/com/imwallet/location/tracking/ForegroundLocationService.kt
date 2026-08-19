package com.imwallet.location.tracking

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.os.Looper

import androidx.core.app.NotificationCompat

import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationResult
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority

import com.imwallet.location.model.LocationResult as AppLocationResult

class ForegroundLocationService : Service() {

    companion object {

        const val CHANNEL_ID =
            "employee_location_tracking"

        const val NOTIFICATION_ID = 1001

        const val ACTION_START =
            "com.imwallet.location.START_TRACKING"

        const val ACTION_STOP =
            "com.imwallet.location.STOP_TRACKING"

        const val EXTRA_UPDATE_INTERVAL =
            "update_interval"

        const val EXTRA_FASTEST_INTERVAL =
            "fastest_interval"

        const val EXTRA_MIN_DISTANCE =
            "min_distance"

        const val EXTRA_MAX_UPDATE_DELAY =
            "max_update_delay"
    }

    private lateinit var fusedLocationClient:
            FusedLocationProviderClient

    private var locationCallback:
            LocationCallback? = null

    override fun onCreate() {
        super.onCreate()

        fusedLocationClient =
            LocationServices.getFusedLocationProviderClient(this)

        createNotificationChannel()
    }

    override fun onStartCommand(
        intent: Intent?,
        flags: Int,
        startId: Int
    ): Int {

        when (intent?.action) {

            ACTION_START -> {

                val updateInterval =
                    intent.getLongExtra(
                        EXTRA_UPDATE_INTERVAL,
                        30_000L
                    )

                val fastestInterval =
                    intent.getLongExtra(
                        EXTRA_FASTEST_INTERVAL,
                        10_000L
                    )

                val minDistance =
                    intent.getFloatExtra(
                        EXTRA_MIN_DISTANCE,
                        10f
                    )

                val maxUpdateDelay =
                    intent.getLongExtra(
                        EXTRA_MAX_UPDATE_DELAY,
                        60_000L
                    )

                startLocationTracking(
                    updateInterval,
                    fastestInterval,
                    minDistance,
                    maxUpdateDelay
                )
            }

            ACTION_STOP -> {

                stopLocationTracking()

                stopForeground(STOP_FOREGROUND_REMOVE)

                stopSelf()
            }
        }

        return START_STICKY
    }

    private fun startLocationTracking(
        updateInterval: Long,
        fastestInterval: Long,
        minDistance: Float,
        maxUpdateDelay: Long
    ) {

        val notification =
            createNotification()

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {

            startForeground(
                NOTIFICATION_ID,
                notification,
                android.content.pm.ServiceInfo
                    .FOREGROUND_SERVICE_TYPE_LOCATION
            )

        } else {

            startForeground(
                NOTIFICATION_ID,
                notification
            )
        }

        if (locationCallback != null) {
            return
        }

        val request =
            LocationRequest.Builder(
                Priority.PRIORITY_HIGH_ACCURACY,
                updateInterval
            )
                .setMinUpdateIntervalMillis(
                    fastestInterval
                )
                .setMinUpdateDistanceMeters(
                    minDistance
                )
                .setWaitForAccurateLocation(
                    true
                )
                .setMaxUpdateDelayMillis(
                    maxUpdateDelay
                )
                .build()

        locationCallback =
            object : LocationCallback() {

                override fun onLocationResult(
                    result: LocationResult
                ) {

                    val location =
                        result.lastLocation
                            ?: return

                    val appLocation =
                        AppLocationResult(

                            latitude =
                                location.latitude,

                            longitude =
                                location.longitude,

                            accuracy =
                                location.accuracy,

                            altitude =
                                location.altitude,

                            speed =
                                location.speed,

                            bearing =
                                location.bearing,

                            timestamp =
                                location.time
                        )

                    TrackingManager
                        .dispatchLocation(
                            appLocation
                        )
                }
            }

        try {

            fusedLocationClient
                .requestLocationUpdates(
                    request,
                    locationCallback!!,
                    Looper.getMainLooper()
                )

            android.util.Log.d(
                "ForegroundLocation",
                "Location tracking started"
            )

        } catch (e: SecurityException) {

            android.util.Log.e(
                "ForegroundLocation",
                "Location permission missing",
                e
            )

            stopLocationTracking()
            stopSelf()
        }
    }

    private fun stopLocationTracking() {

        locationCallback?.let {

            fusedLocationClient
                .removeLocationUpdates(it)
        }

        locationCallback = null

        android.util.Log.d(
            "ForegroundLocation",
            "Location tracking stopped"
        )
    }

    private fun createNotification(): Notification {

        return NotificationCompat.Builder(
            this,
            CHANNEL_ID
        )
            .setContentTitle(
                "Employee Tracking Active"
            )
            .setContentText(
                "Your location is being tracked during working hours."
            )
            .setSmallIcon(
                android.R.drawable.ic_menu_mylocation
            )
            .setOngoing(true)
            .setPriority(
                NotificationCompat.PRIORITY_LOW
            )
            .setCategory(
                NotificationCompat.CATEGORY_SERVICE
            )
            .build()
    }

    private fun createNotificationChannel() {

        if (
            Build.VERSION.SDK_INT >=
            Build.VERSION_CODES.O
        ) {

            val channel =
                NotificationChannel(
                    CHANNEL_ID,
                    "Employee Location Tracking",
                    NotificationManager
                        .IMPORTANCE_LOW
                )

            channel.description =
                "Employee location tracking"

            channel.setShowBadge(false)

            val manager =
                getSystemService(
                    NotificationManager::class.java
                )

            manager.createNotificationChannel(
                channel
            )
        }
    }

    override fun onDestroy() {

        stopLocationTracking()

        super.onDestroy()

        android.util.Log.d(
            "ForegroundLocation",
            "Service destroyed"
        )
    }

    override fun onBind(
        intent: Intent?
    ): IBinder? {
        return null
    }
}