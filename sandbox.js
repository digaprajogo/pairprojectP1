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