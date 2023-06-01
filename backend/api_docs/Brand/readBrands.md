# Read brands

Read all brands and it's models

**URL** : `/auth/brand`

**Method** `GET`

**Auth required** : YES (ANY ROLE)



## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"error": null,
	"data": [
		{
			"id": "94ffe037-385f-4466-ac31-ca1b5fcc50f6",
			"brand": "Skoda",
			"models": [
				{
					"id": "7dab8964-cfed-4dc4-bedd-19c4a92f3271",
					"name": "Skoda Octavia 1"
				},
				{
					"id": "0d4ecaa8-efa5-49f7-9470-1033f9435ee9",
					"name": "Skoda Superb 2"
				},
				{
					"id": "d663949f-27aa-4404-a43f-80e064143ceb",
					"name": "Skoda Fabia 2"
				},
				{
					"id": "b2c5f6d0-4732-4ca4-bef2-8e0baa6c9ab7",
					"name": "styrkova oktavia"
				},
				{
					"id": "eb1eceea-aa09-4999-9ac3-9fc03793a187",
					"name": "volga"
				}
			]
		},
		{
			"id": "903013aa-a819-4efe-b4fb-ca0e0269376d",
			"brand": "Seat",
			"models": [
				{
					"id": "875bc2f6-bd26-4f6a-ae29-1c3669021831",
					"name": "Seat Ibiza 2000"
				},
				{
					"id": "848c8f6a-80e5-4266-8cb0-002eb1aa64e1",
					"name": "Seat Leon 1998"
				},
				{
					"id": "2abfbf29-5729-4b86-944f-dcadfaf7cf09",
					"name": "Seat Arona 2020"
				}
			]
		},
		{
			"id": "c1e8a124-f744-11ed-b67e-0242ac120002",
			"brand": "BMW",
			"models": [
				{
					"id": "0e791123-f79e-4fee-8ab9-6c9dc6f1f656",
					"name": "BMW i7 M70 xDrive"
				},
				{
					"id": "40fc1f92-dbc5-4595-ad7e-a61e677d2843",
					"name": "BMW X6"
				}
			]
		},
		{
			"id": "f611b2a6-f744-11ed-b67e-0242ac120002",
			"brand": "porsche",
			"models": [
				{
					"id": "6f439f5e-f745-11ed-b67e-0242ac120002",
					"name": "911 Carrera T"
				},
				{
					"id": "755a4280-f745-11ed-b67e-0242ac120002",
					"name": "Taycan 4S"
				}
			]
		},
		{
			"id": "149d26a8-211e-48fa-9650-15aad01fdfe9",
			"brand": "SAAB",
			"models": []
		}
	]
}
```

## Error Response

**Condition** : If Prisma or Postgresql endures a fatal error.

**Code**: `500 INTERNAL SERVER ERROR`

**Content example** :
```json
{
    "status": "Internal error"
}
```