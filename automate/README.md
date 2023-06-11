# Step 1: Analyze the codebase for patterns

Looking at the codebase, the file structure, and the files, it appears that we have the manifestation of 3 main top-level concepts:

* A SubDomain (eg. `forum` and `users`)
* A Resource (Aggregate or Entity) (eg. `post` `comment` `member`or `user`)
* A UseCase (eg. `create...` or `getPopular...` or `upvote...`)

Other observations of the pattern:

* The concept of a "usecase" always has an associated API endpoint, which is either a GET (query) or a POST (command)
* The concept of a "resource" can either be a root aggregate or an entity, and they are implemented differently.

**Logical Relationships:**

* A Subdomain can have one or more Resources (only 1 Aggregate but many Entity)
* A Resource has one or more UseCases

**Structure:**

* A SubDomain
  * Name (eg. `forum` and `users`) -- we will need to disambiguate singular/plural naming convention here. We shall default to singular.
* A Resource
  * Name (eg. `post` or `comment`)
  * Kind = `aggregate` or `entity`
* A UseCase
  * Name (e.g. `create` or `getPopular`)
  * Kind (e.g. `command` or `query`)

# Step 2: Define the Pattern 



## Pattern Structure

The structure of the pattern is:

```
automate create pattern "SubDomain"
automate edit add-attribute "Name" --isrequired

automate edit add-collection "Resource" --isrequired --aschildof "{SubDomain}"
automate edit add-attribute "Name" --isrequired --aschildof "{SubDomain.Resource}"
automate edit add-attribute "Kind" --isrequired --isoneof "aggregate;entity" --defaultvalueis "entity" --aschildof "{SubDomain.Resource}"

automate edit add-collection "UseCase" --isrequired --aschildof "{SubDomain.Resource}"
automate edit add-attribute "Name" --isrequired --aschildof "{SubDomain.Resource.UseCase}"
automate edit add-attribute "Kind" --isrequired --isoneof "command;query" --defaultvalueis "command" --aschildof "{SubDomain.Resource.UseCase}"
automate edit add-attribute "Route" --isrequired --defaultvalueis "/" --aschildof "{SubDomain.Resource.UseCase}"
automate edit add-attribute "IsAuthenticated" --isrequired --isoftype "bool" --defaultvalueis "true" --aschildof "{SubDomain.Resource.UseCase}"
```

> We are enforcing that a `SubDomain` cannot exist without at least one `Resource`.
>
> We are enforcing that a `Resource` cannot exist without at least one `UseCase` 
>
> We can't (this version of automate) enforce the implied constraint that there can only be one `Aggregate`, but one or more `Entities`.



## Pattern Automation

The code templates to harvest from the existing codebase are:

On each `Resource`:

```
automate edit add-codetemplate-with-command "src/modules/forum/domain/post.ts" --name "Resource" --isoneoff --targetpath "src/modules/{{Parent.Name | string.camelsingular}}/domain/{{Name | string.camelsingular}}.ts" --aschildof "{SubDomain.Resource}"

automate edit add-codetemplate-with-command "src/modules/forum/dtos/postDTO.ts" --name "DTO" --isoneoff --targetpath "src/modules/{{Parent.Name | string.camelsingular}}/dtos/{{Name | string.camelsingular}}DTO.ts" --aschildof "{SubDomain.Resource}"

automate edit add-codetemplate-with-command "src/modules/forum/infra/http/routes/post.ts" --name "Routes" --isoneoff --targetpath "src/modules/{{Parent.Name | string.camelsingular}}/infra/http/routes/{{Name | string.camelsingular}}.ts" --aschildof "{SubDomain.Resource}"

automate edit add-codetemplate-with-command "src/modules/forum/mappers/postMap.ts" --name "Mapper" --isoneoff --targetpath "src/modules/{{Parent.Name | string.camelsingular}}/mappers/{{Name | string.camelsingular}}Map.ts" --aschildof "{SubDomain.Resource}"

automate edit add-codetemplate-with-command "src/modules/forum/repos/postRepo.ts" --name "RepoInterface" --isoneoff --targetpath "src/modules/{{Parent.Name | string.camelsingular}}/repos/{{Name | string.camelsingular}}Repo.ts" --aschildof "{SubDomain.Resource}"

automate edit add-codetemplate-with-command "src/modules/forum/repos/implementations/sequelizePostRepo.ts" --name "RepoImplementation" --isoneoff --targetpath "src/modules/{{Parent.Name | string.camelsingular}}/repos/sequelize{{Name | string.camelsingular}}Repo.ts" --aschildof "{SubDomain.Resource}"

automate edit add-codetemplate-with-command ".\src\modules\forum\repos\index.ts" --name "RepoIndex" --isoneoff --targetpath "src/modules/{{Parent.Name | string.camelsingular}}/repos/index.ts" --aschildof "{SubDomain.Resource}" 

automate edit add-codetemplate-with-command ".\src\modules\forum\domain\postId.ts" --name "Identifier" --isoneoff --targetpath "src/modules/{{Parent.Name | string.camelsingular}}/domain/{{Name | string.camelsingular}}Id.ts" --aschildof "{SubDomain.Resource}"
```

On each `UseCase`:

```
automate edit add-codetemplate-with-command "src/modules/forum/useCases/post/createPost/CreatePost.ts" --name "UseCase" --isoneoff --targetpath "src/modules/{{Parent.Parent.Name | string.camelsingular}}/useCases/{{Parent.Name | string.camelsingular}}/{{Name | string.camelsingular}}{{Parent.Name | string.pascalsingular}}/{{Name | string.camelsingular}}{{Parent.Name | string.pascalsingular}}.ts" --aschildof "{SubDomain.Resource.UseCase}"

automate edit add-codetemplate-with-command "src/modules/forum/useCases/post/createPost/CreatePostController.ts" --name "Controller" --isoneoff --targetpath "src/modules/{{Parent.Parent.Name | string.camelsingular}}/useCases/{{Parent.Name | string.camelsingular}}/{{Name | string.camelsingular}}{{Parent.Name | string.pascalsingular}}/{{Name | string.camelsingular}}{{Parent.Name | string.pascalsingular}}Controller.ts" --aschildof "{SubDomain.Resource.UseCase}"

automate edit add-codetemplate-with-command "src/modules/forum/useCases/post/createPost/CreatePostDTO.ts" --name "DTO" --isoneoff --targetpath "src/modules/{{Parent.Parent.Name | string.camelsingular}}/useCases/{{Parent.Name | string.camelsingular}}/{{Name | string.camelsingular}}{{Parent.Name | string.pascalsingular}}/{{Name | string.camelsingular}}{{Parent.Name | string.pascalsingular}}DTO.ts" --aschildof "{SubDomain.Resource.UseCase}"

automate edit add-codetemplate-with-command "src/modules/forum/useCases/post/createPost/CreatePostErrors.ts" --name "Errors" --isoneoff --targetpath "src/modules/{{Parent.Parent.Name | string.camelsingular}}/useCases/{{Parent.Name | string.camelsingular}}/{{Name | string.camelsingular}}{{Parent.Name | string.pascalsingular}}/{{Name | string.camelsingular}}{{Parent.Name | string.pascalsingular}}Errors.ts" --aschildof "{SubDomain.Resource.UseCase}"

automate edit add-codetemplate-with-command "src/modules/forum/useCases/post/createPost/index.ts" --name "Index" --isoneoff --targetpath "src/modules/{{Parent.Parent.Name | string.camelsingular}}/useCases/{{Parent.Name | string.camelsingular}}/{{Name | string.camelsingular}}{{Parent.Name | string.pascalsingular}}/index.ts" --aschildof "{SubDomain.Resource.UseCase}"
```

On whole pattern:

```
automate edit add-command-launchpoint "*" --name "Go" --from "{SubDomain.Resource}"
automate edit update-command-launchpoint "Go" --add "*" --from "{SubDomain.Resource.UseCase}"
```



# Step 3: First look at the toolkit

## Build the toolkit

```
automate build toolkit
```

## Install the toolkit

```
automate install toolkit "C:\Users\jezzs\OneDrive\Desktop\SubDomain_0.1.0.toolkit"
```

## Create a draft

```
automate run toolkit "SubDomain" --name "bananas"
```

## Configure the draft for a new sub domain, a new resource and a couple use cases

```
automate configure on "{SubDomain}" --and-set "Name=Bananas"
automate configure add-one-to "{SubDomain.Resource}" --and-set "Name=Apple" --and-set "Kind=aggregate"
automate configure add-one-to "{SubDomain.Resource.<RESOURCEID>.UseCase}" --and-set "Name=Create" --and-set "Kind=command" --and-set "Route=/"
automate configure add-one-to "{SubDomain.Resource.<RESOURCEID>.UseCase}" --and-set "Name=Get" --and-set "Kind=query" --and-set "Route=/"
```

## Validate the draft

```
automate validate draft
```

## Apply the draft

```
automate execute command "Go"
```

This will generate a bunch of files and folders in the codebase for us to look at.



# Step 4: Modify the Pattern

## Review the structure 

We may notice that some of the folders and filenames are not quite right, perhaps?

We can now correct those files and folder names, by changing the `--targetpath` of the relevant code template command that generated them. 

First, we need to know which command to edit. The answer is in this data:

```
automate view pattern --all
```

Find the automation that references the code template called `DTO`. 

In this case, the command is called `CodeTemplateCommand2`, so that is the one we can change the `--targetpath` on.

```
automate edit update-codetemplate-with-command "CodeTemplateCommand2" --targetpath "src/modules/{{Parent.Parent.Name | string.camelsingular}}/useCases/{{Parent.Name | string.camelsingular}}/{{Name | string.camelsingular}}{{Parent.Name | string.pascalsingular}}.ts" --aschildof "{SubDomain.Resource.UseCase}"
```

 Once changed, you can test the command to see what path it will produce, using dummy test data.

```
automate test codetemplate-command "CodeTemplateCommand2" --aschildof "{SubDomain.Resource.UseCase}"
```

## Review the code templates

Edit all the code templates:

* Add relevant substitutions e.g. `{{Parent.Name | string.pascalsingular}}`
* Add conditional and looping logic

List templates to edit:

```
automate view pattern --all
```

Edit a specific template: 

```
automate edit codetemplate "DTO" --aschildof "{SubDomain.Resource}"  --with notepad.exe
```

You can test any of the code templates with dummy data:

```
automate test codetemplate "DTO" --aschildof "{SubDomain.Resource}" --export-data "sampleresource.json"
```

Then, edit the generated `sampleresource.json` file and add some other pieces of data.

In our case, a use case for a `command` and use case for a `query`, and some variance for other things.

 ```
 {
   "Id": "4JaUqrdF",
   "Name": "name3",
   "Kind": "entity",
   "UseCase": {
     "Id": "4vsrPzdy",
     "Items": [
       {
         "Id": "cnHgDyzy",
         "Name": "create",
         "Kind": "command",
         "Route": "/acreateroute",
         "IsAuthenticated": true
       },
       {
         "Id": "eYu3NeX3",
         "Name": "get",
         "Kind": "query",
         "Route": "/agetroute",
         "IsAuthenticated": true
       },
       {
         "Id": "6rauJeDh",
         "Name": "change",
         "Kind": "command",
         "Route": "/achangeroute",
         "IsAuthenticated": false
       }
     ]
   }
 }
 ```

Now, we can use this more specific file to test with:

```
automate test codetemplate "DTO" --aschildof "{SubDomain.Resource}" --import-data "sampleresource.json"
```

## Rebuild, upgrade

Once we have updated and tested the commands and code templates, it's time to upgrade the toolkit and try it out again.

```
automate build toolkit
```

This creates the next version of the toolkit, which we need to install.

```
automate install toolkit "C:\Users\jezzs\OneDrive\Desktop\SubDomain_0.2.0.toolkit"
```

Now, we need to upgrade our existing draft

```
automate upgrade draft
```

## Clear out old code

Before we run the toolkit again, we need to delete the original code that it created.

We need to do this because (at this point) most of the code template commands are configured only to generate `--isoneoff` templates. 

In this configuration, those commands will not run if the generated already exists on disk (as is the case right now).

First, delete all the newly generated code.

## Try again

With the old code gone, it is time to retry the toolkit.

```
automate execute command "Go"
```

Now, lets review, and refine the generated code, as above.
