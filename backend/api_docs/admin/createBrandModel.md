# Create brand model

Adds a new model of given brand

**URL** : `/auth/admin/brand/:id/brand-model`

**Method** `POST`

**Auth required** : YES (ADMIN)

**Query requirements**

id: valid UUID

**Query example**

localhost:3000/auth/admin/brand/94ffe037-385f-4466-ac31-ca1b5fcc50f6/brand-model

**Body requirements**

```json
{
	"name" : "[just a string]"
}
```

**Body example**

```json
{
	"name" : "styrkova oktavia"
}
```

## Success Response

**Code** : `201 CREATED`

**Content example**

```json
{
	"error": null,
	"data": {
		"id": "eb1eceea-aa09-4999-9ac3-9fc03793a187",
		"brandId": "94ffe037-385f-4466-ac31-ca1b5fcc50f6",
		"name": "volga"
	}
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


**Condition** : If UUID of brand does not exists.

**Code**: `404 NOT FOUND`

**Content example** :
```json
{
	"status": "Not found",
	"error": "NotFound"
}
```

**Condition** : If Brand model with given name already exists.

**Code**: `400 BAD REQUEST`

**Content example** :
```json
{
	"error": "Brand model with given name already exists!",
	"data": null
}
```


**Condition** : If UUID param is invalid

**Code** : `400 BAD REQUEST`

**Content example** :
```json
{
	"error": "Invalid Params",
	"data": null
}
```
