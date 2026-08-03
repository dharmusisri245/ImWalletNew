package com.imwallet.location.model

/**
 * Standard location model returned by the native module.
 */
data class LocationResult(

    val latitude: Double,

    val longitude: Double,

    /**
     * Accuracy in meters.
     */
    val accuracy: Float,

    /**
     * Altitude in meters.
     */
    val altitude: Double,

    /**
     * Speed in meters/second.
     */
    val speed: Float,

    /**
     * Direction in degrees.
     */
    val bearing: Float,

    /**
     * UTC timestamp.
     */
    val timestamp: Long

)