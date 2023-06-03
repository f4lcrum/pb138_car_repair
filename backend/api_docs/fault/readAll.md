# Read all faults

Read all faults, which are unresolved and without assigned technician

**URL** : `/auth/fault/unresolved/all`

**Method** : `GET`

**Auth required** : YES (TECHNICIAN, ADMIN)

## Success Response

**Code** : `200 OK`

**Content example** : *request query:*

```code
localhost:3000/auth/fault/unresolved/all
```

**Content example** : *response body :*

```json
{
	"error": null,
	"data": [
		{
			"id": "b4558b1c-a7c7-400e-8207-cba6fb19ff20",
			"createdAt": "2023-06-03T19:28:20.040Z",
			"description": "Auto mi netaha ani na vysokych otackach, strata vykonu..",
			"mileage": 300,
			"name": "stock",
			"technicianId": null,
			"vehicleId": "2be2a276-60f5-4583-8dc1-3c2be9aae841",
			"resolvedAt": null,
			"workPrice": 0
		},
		{
			"id": "b9ec9015-9edc-4e66-bc96-b1eca94d64ca",
			"createdAt": "2014-03-05T12:45:03.000Z",
			"description": "Vymena turba",
			"mileage": 150000,
			"name": "Oprava c.2",
			"technicianId": null,
			"vehicleId": "2be2a276-60f5-4583-8dc1-3c2be9aae841",
			"resolvedAt": null,
			"workPrice": 0
		}
	]
}
```