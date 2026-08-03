package com.imwallet.location.model

data class TrackingConfig(

    val updateInterval: Long = 30000L,

    val fastestInterval: Long = 10000L,

    val minDistance: Float = 10f,

    val highAccuracy: Boolean = true,

    val waitForAccurateLocation: Boolean = true,

    val maxUpdateDelay: Long = 60000L
)