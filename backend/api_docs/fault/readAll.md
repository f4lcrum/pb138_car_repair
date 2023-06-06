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
	"data": [
		{
			"id": "b9ec9015-9edc-4e66-bc96-b1eca94d64ca",
			"createdAt": "2014-03-05T12:45:03.000Z",
			"description": "Vymena turba",
			"mileage": 150000,
			"name": "Oprava c.2",
			"technicianId": null,
			"vehicleId": "2be2a276-60f5-4583-8dc1-3c2be9aae841",
			"resolvedAt": null,
			"workPrice": 0,
			"licensePlate": "TO-123-XY",
			"brandName": "Seat",
			"brandModel": "Seat Ibiza 2000"
		}
	]
}
```