# Create brand model

Adds a new model of given brand

**URL** : `/auth/admin/brand/:id/brand-model`

**Method** `POST`

**Auth required** : YES (ADMIN)

**Query requirements**

id : valid UUID


**Body requirements**

```json
{
	"name" : "[just a string]"
}
```

## Success Response

**Code** : `201 CREATED`

**Query example** : *request query :*
```code
localhost:3000/auth/admin/brand/94ffe037-385f-4466-ac31-ca1b5fcc50f6/brand-model
```

**Body example** *request body :*

```json
{
	"name" : "volga"
}
```

**Content example** *response body :*

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

**Condition** : If Brand model with given name already exists.

**Code** : `400 BAD REQUEST`

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

**Condition** : User is logged of thus unauthorized

**Code** : `401 UNAUTHORIZED`

**Content** :
```json
{
	"error": "Unauthorized",
	"data": null
}
```

**Condition** : Forbidden user access (Forbidden access: CLIENT, TECHNICIAN)

**Code** : `403 FORBIDDEN`

**Content** :
```json
{
	"error": "Forbidden",
	"data": null
}
```

**Condition** : If UUID of brand does not exists.

**Code**: `404 NOT FOUND`

**Content example** :
```json
{
	"error": "not found",
	"data": null
}
```
