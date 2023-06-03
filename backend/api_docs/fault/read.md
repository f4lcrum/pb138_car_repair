# Read Fault

Read all faults of provided vehicle

**URL** : `/auth/fault/:id`

**Method** : `GET`

**Auth required** : YES (CLIENT, ADMIN)

**Params constraints**

Param need to be UUID of vehicle


## Success Response

**Code** : `200 OK`

**Content example** : *request query:*

```code
localhost:3000/auth/fault/2be2a276-60f5-4583-8dc1-3c2be9aae841
```

**Content example** : *response body :*

```json
{
	"error": null,
	"data": [
		{
			"id": "2653e9cd-ac59-4d85-bd88-4a6a2c5ae315",
			"createdAt": "2012-02-07T12:45:03.000Z",
			"description": "Vymena oleja",
			"mileage": 90000,
			"name": "Oprava c.1",
			"vehicleId": "2be2a276-60f5-4583-8dc1-3c2be9aae841",
			"resolvedAt": "2012-02-25T12:45:03.000Z",
			"workPrice": 30,
			"material": [
				{
					"id": "41221bf6-d3d6-407b-bba7-ffe50f0275be",
					"description": "5V20 motorovy olej",
					"name": "5V20 by Bosch",
					"price": 20
				}
			],
			"technicianEmail": "jozino@azet.sk",
			"technicianName": "Jozef Novak"
		},
		{
			"id": "b9ec9015-9edc-4e66-bc96-b1eca94d64ca",
			"createdAt": "2014-03-05T12:45:03.000Z",
			"description": "Vymena turba",
			"mileage": 150000,
			"name": "Oprava c.2",
			"vehicleId": "2be2a276-60f5-4583-8dc1-3c2be9aae841",
			"resolvedAt": null,
			"workPrice": 0,
			"material": [],
			"technicianName": " "
		},
		{
			"id": "08cd4aa8-3482-4cc9-a542-806ee641eff4",
			"createdAt": "2012-03-07T12:45:03.000Z",
			"description": "vymena baterie",
			"mileage": 100000,
			"name": "Oprava c.3",
			"vehicleId": "2be2a276-60f5-4583-8dc1-3c2be9aae841",
			"resolvedAt": "2012-03-25T12:45:03.000Z",
			"workPrice": 120,
			"material": [
				{
					"id": "27c350c4-e2a0-4663-8129-f219909bacf6",
					"description": "auto bateria",
					"name": "Baterie AAAA",
					"price": 80
				}
			],
			"technicianEmail": "jozino@azet.sk",
			"technicianName": "Jozef Novak"
		},
		{
			"id": "b4558b1c-a7c7-400e-8207-cba6fb19ff20",
			"createdAt": "2023-06-03T19:28:20.040Z",
			"description": "Auto mi netaha ani na vysokych otackach, strata vykonu..",
			"mileage": 300,
			"name": "stock",
			"vehicleId": "2be2a276-60f5-4583-8dc1-3c2be9aae841",
			"resolvedAt": null,
			"workPrice": 0,
			"material": [],
			"technicianName": " "
		}
	]
}
```

## Error Responses

**Condition** : If Invalid UUID is passed to function

**Code** : `400 BAD REQUEST`

**Content**:

```json
{
	"error": "Invalid params",
	"data": null
}
```

**Condition** : User is logged of thus unauthorized

**Code** : `401 UNAUTHORIZED`

**Content** :
```json
{
	"error": "Unauthorized",
	"data": null
}
```

**Condition** : If user tries to read fault of vehicle, which don't belongs to him or user have role of TECHNICIAN

**Code** :  `403 FORBIDDEN`

**Content** :
```json
{
	"error": "Forbidden",
	"data": null
}
```

**Condition** : If user tries to read fault of already deleted vehicle or input UUID of nonexistent vehicle

**Code** : `404 NOT FOUND`

**Content** :
```json
{
	"error": "The specified vehicle has already been deleted!",
	"data": null
}
```