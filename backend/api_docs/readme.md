## Open Endpoints

*Auth endpoints*:

* [Login](auth/login.md) : `POST /auth/login/`
* [Register](auth/register.md) : `POST /auth/registration`

## Secured Endpoints

*Auth endpoints*:

* [Logout](auth/logout.md) : `POST /auth/logout`
* [readAuth](auth/readAuth.md) : `GET /auth/info`

*Admin endpoints*:

* [verification](admin/verification.md) : `POST /auth/admin/technician/verification`
* [technician](admin/technician.md) : `GET /auth/admin/technician`
* [createBrand](admin/createBrand.md) : `POST /auth/admin/brand`
* [createBrandModel](admin/createBrandModel.md) : `POST /auth/admin/brand/:id/brand-model`

*Fault endpoints:*
* [create](fault/create.md) : `POST /auth/fault`
* [read](fault/read.md) : `GET /auth/fault`
* [readAll](fault/readAll.md) : `GET /auth/fault/unresolved/all`
* [update](fault/update.md) : `PATCH /auth/fault`
* [assign](fault/assign.md) : `PATCH /auth/fault/assignment/:id`

*Vehicle endpoints:*
* [create](vehicle/create.md) : `POST /auth/vehicle`
* [delete](vehicle/delete.md) : `DELETE /auth/vehicle`
* [read all](vehicle/read.md) : `GET /auth/vehicle`
* [read specific](vehicle/readSpecific.md) : `GET /auth/vehicle`

*User endpoints:*

* [update](user/update.md) : `PATCH /auth/user`

*Brand endpoints:*

* [read brands](brand/readBrands.md) : `GET /auth/brand`