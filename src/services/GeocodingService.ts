//  export interface Coordinates {
//   latitude: number;
//   longitude: number;
// }

// export interface AddressResult {
//   displayName: string;
//   shortAddress: string;
// }

// export async function reverseGeocode$({
//   latitude,
//   longitude,
// }: Coordinates): Promise<AddressResult> {
//   const controller = new AbortController();

//   const timeout = setTimeout(() => {
//     controller.abort();
//   }, 10000);

//   try {
//     const response = await fetch(
//       `https://photon.komoot.io/reverse?lat=${encodeURIComponent(
//         latitude,
//       )}&lon=${encodeURIComponent(longitude)}`,
//       {
//         signal: controller.signal,
//       },
//     );

//     clearTimeout(timeout);

//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}`);
//     }

//     const data = await response.json();

//     if (!data?.features?.length) {
//       return {
//         displayName: 'Address not found',
//         shortAddress: 'Unknown location',
//       };
//     }

//     const props = data.features[0].properties ?? {};
//     const displayName =
//       [
//         props.name,
//         props.street
//           ? `${props.street}${
//               props.housenumber ? ` ${props.housenumber}` : ''
//             }`
//           : null,
//         props.city || props.district,
//         props.state,
//         props.country,
//       ]
//         .filter(Boolean)
//         .join(', ') || 'Address unavailable';

//     const shortAddress =
//       [
//         props.street,
//         props.city || props.district,
//       ]
//         .filter(Boolean)
//         .join(', ') || 'Unknown location';

//     return {
//       displayName,
//       shortAddress,
//     };
//   } catch (error: any) {
//     clearTimeout(timeout);

//     console.log('Photon Reverse Geocode Error:', error);

//     return {
//       displayName: 'Address unavailable',
//       shortAddress: 'Unable to fetch address',
//     };
//   }
// }



// it's  paid version of google cloud console Api Dharmu production

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface AddressResult {
    displayName: string;
    shortAddress: string;
}

const GEOCODING_KEY = "AIzaSyDw6Tv2HiJQ-ZXRx3jS5hDoWr2picgrRV4";

export async function reverseGeocode$({
    latitude,
    longitude,
}: Coordinates): Promise<AddressResult> {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, 10000);

    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GEOCODING_KEY}`,
            {
                signal: controller.signal,
            },
        );

        clearTimeout(timeout);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        // console.log("Location:", location);

        // const data = await response.json();

        console.log("Status:", data.status);
        console.log("Results Count:", data.results.length);

        data.results.forEach((r: any, index: number) => {
            console.log(
                `Result ${index}:`,
                r.formatted_address,
                r.types
            );
        });
        console.log(JSON.stringify(data.results[0], null, 2));


        if (data.status !== "OK" || !data.results?.length) {
            return {
                displayName: "Address not found",
                shortAddress: "Unknown location",
            };
        }

        // Prefer A-103 (establishment / point_of_interest)
        let result =
            data.results.find(
                (r: any) =>
                    r.types.includes("establishment") ||
                    r.types.includes("point_of_interest")
            ) ||

            // Otherwise use subpremise
            data.results.find(
                (r: any) =>
                    r.types.includes("subpremise")
            ) ||

            // Otherwise use normal address
            data.results[0];

        return {
            displayName: result.formatted_address,
            shortAddress: result.formatted_address,
        };

    } catch (error) {
        clearTimeout(timeout);

        console.log("Google Reverse Geocode Error:", error);

        return {
            displayName: "Address unavailable",
            shortAddress: "Unable to fetch address",
        };
    }
}