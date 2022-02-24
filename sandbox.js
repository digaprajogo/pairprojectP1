// npx sequelize-cli model:generate --name Profile --attributes firstName:string,lastName:string,bio:string,profileUrl:string


//posts
// npx sequelize-cli model:generate --name Post --attributes title:string,postUrl:string,caption:string,like:integer,dislike:integer

//tags
// npx sequelize-cli model:generate --name Tag --attributes name:string

//Post
// sequelize model:generate --name Post --attributes title:string,postUrl:string,caption:string,like:integer,dislike:integer

//Tags
// sequelize model:generate --name Tag --attributes name:string

//Poststag
// sequelize model:generate --name Poststag --attributes name:string

// sequelize migration:create --name add-postid-to-poststags

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("Iam hansome af", salt);

console.log(hash)

console.log(bcrypt.compareSync("Iam hansome af", hash))// true)
console.log(bcrypt.compareSync("Iam hansome", hash))// true)


// Executing (default): SELECT "Profile".*, "Posts"."id" AS "Posts.id", "Posts"."title" AS "Posts.title", "Posts"."postUrl" AS "Posts.postUrl", "Posts"."caption" AS "Posts.caption", "Posts"."like" AS "Posts.like", "Posts"."dislike" AS "Posts.dislike", "Posts"."ProfileId" AS "Posts.ProfileId", "Posts"."createdAt" AS "Posts.createdAt", "Posts"."updatedAt" AS "Posts.updatedAt" FROM (SELECT "Profile"."id", "Profile"."firstName", "Profile"."lastName", "Profile"."bio", "Profile"."profileUrl", "Profile"."UserId", "Profile"."createdAt", "Profile"."updatedAt" FROM "Profiles" AS "Profile" LIMIT 1) AS "Profile" LEFT OUTER JOIN "Posts" AS "Posts" ON "Profile"."id" = "Posts"."ProfileId";

// Executing (default): SELECT "Profile".*, 
// "Posts"."id" AS "Posts.id", "Posts"."title" AS "Posts.title", "Posts"."postUrl" AS "Posts.postUrl", "Posts"."caption" AS "Posts.caption", "Posts"."like" AS "Posts.like", "Posts"."dislike" AS "Posts.dislike", "Posts"."ProfileId" AS "Posts.ProfileId", "Posts"."createdAt" AS "Posts.createdAt", "Posts"."updatedAt" AS "Posts.updatedAt" FROM (SELECT "Profile"."id", "Profile"."firstName", "Profile"."lastName", "Profile"."bio", "Profile"."profileUrl", "Profile"."UserId", "Profile"."createdAt", "Profile"."updatedAt" FROM "Profiles" AS "Profile" LIMIT 1) AS "Profile" LEFT OUTER JOIN "Posts" AS "Posts" ON "Profile"."id" = "Posts"."ProfileId";