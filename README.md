# Jerry Rig
Jerry Rig is a tool for starting web applications fast.

### Requirements
You need nodejs and more importantly npm to run Jerry Rig.

## Starter Specification
Running Jerry Rig require you have a jerry.json file.
The object inside the jerry.json file can have the following basic properties:<br/>
```JSON
{
    "projectName": <Name for the project>,
    "version": <The Version of the project>
}
```
After you define the basic properties you can define more application specific properties. 
These are all detailed in the subsections below.

### Structuring Projects
You can structure the resulting directory by adding a key-value pair like this:
```JSON
{
    ...
    "structure": {
        ".": ["index.html"],
        "webapp":{
            "css": []
        }
    }
    ...
}
```
This adds an empty file called index.html in the root directory of the project and a folder called webapp.
Inside the webapp directory is an empty folder called css.

### Node Package Manager
```JSON
{
    ...
    "npm": {
        depends: {
            <package> : <version>
        },
        devDepends: {
            <package> : <version>
        }
    }
    ...
}
```