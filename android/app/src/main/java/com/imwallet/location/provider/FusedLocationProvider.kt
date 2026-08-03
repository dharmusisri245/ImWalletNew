package com.imwallet.location.provider



import android.annotation.SuppressLint

import android.content.Context

import android.location.Location



import com.google.android.gms.location.CurrentLocationRequest

import com.google.android.gms.location.FusedLocationProviderClient

import com.google.android.gms.location.LocationServices

import com.google.android.gms.location.Priority



import com.imwallet.location.model.LocationResult



import kotlinx.coroutines.tasks.await

class FusedLocationProvider(

    context: Context

) {



    private val fusedLocationClient: FusedLocationProviderClient =

        LocationServices.getFusedLocationProviderClient(context)



    /**

     * Get Current High Accuracy Location

     */

    @SuppressLint("MissingPermission")
suspend fun getCurrentLocation(): LocationResult {

    android.util.Log.e("TEST_LOCATION", "FUNCTION ENTERED")

    val request = CurrentLocationRequest.Builder()
        .setPriority(Priority.PRIORITY_HIGH_ACCURACY)
        .setMaxUpdateAgeMillis(5000)
        .setDurationMillis(15000)
        .build()

    android.util.Log.e("TEST_LOCATION", "REQUEST CREATED")

    val location = fusedLocationClient
        .getCurrentLocation(request, null)
        .await()

    android.util.Log.e("TEST_LOCATION", "LOCATION = $location")

    if (location == null) {
        android.util.Log.e("TEST_LOCATION", "NULL LOCATION")
        throw Exception("Unable to get current location.")
    }

    return location.toLocationResult()
}


    /**

     * Get Last Known Location

     */

    @SuppressLint("MissingPermission")

    suspend fun getLastKnownLocation(): LocationResult {



        val location: Location =

            fusedLocationClient

                .lastLocation

                .await()

                ?: throw Exception("Last known location not available.")



        return location.toLocationResult()

    }



    /**

     * Convert Android Location -> LocationResult

     */

    private fun Location.toLocationResult(): LocationResult {



        return LocationResult(

            latitude = latitude,

            longitude = longitude,

            accuracy = accuracy,

            altitude = altitude,

            speed = speed,

            bearing = bearing,

            timestamp = time

        )

    }



}