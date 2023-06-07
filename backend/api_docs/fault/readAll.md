# Read all faults

Read all faults, which are unresolved and without assigned technician

**URL** : `/auth/fault`

**Method** : `GET`

**Auth required** : YES (TECHNICIAN, ADMIN)

## Success Response

**Code** : `200 OK`

**Content example** : *request URL:*

```code
	localhost:3000/auth/fault?unresolved=true
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
			"ownerFirstName": "Alino",
			"ownerLastName": "Krasnansky",
			"brandName": "Seat",
			"brandModel": "Seat Ibiza 2000"
		}
	]
}
```

OR

**Content example** : *request URI:*

```code
	localhost:3000/auth/fault?unresolved=false
```

**Content example** : *response body :*

```json
{
	"data": [
		{
			"id": "89a81c0c-dd05-413e-ae86-b7053f9af85d",
			"createdAt": "2019-03-07T12:45:03.000Z",
			"description": "esteticky tuning",
			"mileage": 20000,
			"name": "Oprava c.4",
			"technicianId": "72e4eda6-5bd0-466c-8c56-b5405cd12e2f",
			"vehicleId": "6fbe873a-73e7-443a-b528-ead0d59ac747",
			"resolvedAt": "2019-03-25T12:45:03.000Z",
			"workPrice": 1200,
			"licensePlate": "KE-487-KT",
			"ownerFirstName": "Vajcomira",
			"ownerLastName": "Gombitova",
			"brandName": "porsche",
			"brandModel": "911 Carrera T"
		},
		{
			"id": "b9ec9015-9edc-4e66-bc96-b1eca94d64ca",
			"createdAt": "2014-03-05T12:45:03.000Z",
			"description": "Vymena turba",
			"mileage": 150000,
			"name": "Oprava",
			"technicianId": "72e4eda6-5bd0-466c-8c56-b5405cd12e2f",
			"vehicleId": "2be2a276-60f5-4583-8dc1-3c2be9aae841",
			"resolvedAt": null,
			"workPrice": 0,
			"licensePlate": "TO-123-XY",
			"ownerFirstName": "Alino",
			"ownerLastName": "Krasnansky",
			"brandName": "Seat",
			"brandModel": "Seat Ibiza 2000"
		},
		{
			"id": "08cd4aa8-3482-4cc9-a542-806ee641eff4",
			"createdAt": "2012-03-07T12:45:03.000Z",
			"description": "vymena baterie",
			"mileage": 100000,
			"name": "Oprava c.3",
			"technicianId": "72e4eda6-5bd0-466c-8c56-b5405cd12e2f",
			"vehicleId": "2be2a276-60f5-4583-8dc1-3c2be9aae841",
			"resolvedAt": "2012-03-25T12:45:03.000Z",
			"workPrice": 120,
			"licensePlate": "TO-123-XY",
			"ownerFirstName": "Alino",
			"ownerLastName": "Krasnansky",
			"brandName": "Seat",
			"brandModel": "Seat Ibiza 2000"
		},
		{
			"id": "2653e9cd-ac59-4d85-bd88-4a6a2c5ae315",
			"createdAt": "2012-02-07T12:45:03.000Z",
			"description": "Vymena oleja",
			"mileage": 90000,
			"name": "Oprava c.1",
			"technicianId": "72e4eda6-5bd0-466c-8c56-b5405cd12e2f",
			"vehicleId": "2be2a276-60f5-4583-8dc1-3c2be9aae841",
			"resolvedAt": "2012-02-25T12:45:03.000Z",
			"workPrice": 30,
			"licensePlate": "TO-123-XY",
			"ownerFirstName": "Alino",
			"ownerLastName": "Krasnansky",
			"brandName": "Seat",
			"brandModel": "Seat Ibiza 2000"
		}
	]
}
```