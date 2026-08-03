import Foundation
import CoreLocation
import React

@objc(LocationModule)
class LocationModule: RCTEventEmitter {

    private let locationManager = CLLocationManager()

    override init() {
        super.init()
        locationManager.delegate = self
    }

    // Module Name
    @objc
    override static func moduleName() -> String! {
        return "LocationModule"
    }

    // Required by RCTEventEmitter
    override func supportedEvents() -> [String]! {
        return [
            "onLocationChanged"
        ]
    }

    @objc
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    // MARK: - Module Info

    @objc(getModuleInfo:rejecter:)
    func getModuleInfo(
        _ resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        resolve("Location Module Initialized Successfully 🚀")
    }

    // MARK: - Current Location

    @objc(getCurrentLocation:rejecter:)
    func getCurrentLocation(
        _ resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {

        locationManager.requestWhenInUseAuthorization()

        guard let location = locationManager.location else {

            reject(
                "LOCATION_ERROR",
                "Unable to get current location.",
                nil
            )

            return
        }

        resolve([
            "latitude": location.coordinate.latitude,
            "longitude": location.coordinate.longitude,
            "accuracy": location.horizontalAccuracy,
            "altitude": location.altitude,
            "speed": location.speed,
            "bearing": location.course,
            "timestamp": location.timestamp.timeIntervalSince1970 * 1000
        ])
    }

    // MARK: - Last Known Location

    @objc(getLastKnownLocation:rejecter:)
    func getLastKnownLocation(
        _ resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        getCurrentLocation(resolve, rejecter: reject)
    }

    // MARK: - Start Tracking

    @objc(startTracking:rejecter:)
    func startTracking(
        _ resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {

        locationManager.startUpdatingLocation()

        resolve(true)
    }

    // MARK: - Stop Tracking

    @objc(stopTracking:rejecter:)
    func stopTracking(
        _ resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {

        locationManager.stopUpdatingLocation()

        resolve(true)
    }

    // MARK: - GPS Status

    @objc(isGpsEnabled:rejecter:)
    func isGpsEnabled(
        _ resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {

        resolve(CLLocationManager.locationServicesEnabled())
    }

    // MARK: - Open Settings

    @objc(openLocationSettings:rejecter:)
    func openLocationSettings(
        _ resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {

        guard let url = URL(string: UIApplication.openSettingsURLString) else {
            resolve(false)
            return
        }

        UIApplication.shared.open(url)

        resolve(true)
    }

    // MARK: - Ensure GPS Enabled

@objc(ensureGpsEnabled:rejecter:)
func ensureGpsEnabled(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
) {

    if CLLocationManager.locationServicesEnabled() {
        resolve(true)
        return
    }

    guard let url = URL(string: UIApplication.openSettingsURLString) else {
        resolve(false)
        return
    }

    UIApplication.shared.open(url)

    resolve(false)
}
}

// MARK: - CLLocationManagerDelegate

extension LocationModule: CLLocationManagerDelegate {

    func locationManager(
        _ manager: CLLocationManager,
        didUpdateLocations locations: [CLLocation]
    ) {

        guard let location = locations.last else {
            return
        }

        sendEvent(withName: "onLocationChanged", body: [
            "latitude": location.coordinate.latitude,
            "longitude": location.coordinate.longitude,
            "accuracy": location.horizontalAccuracy,
            "altitude": location.altitude,
            "speed": location.speed,
            "bearing": location.course,
            "timestamp": location.timestamp.timeIntervalSince1970 * 1000
        ])
    }
}