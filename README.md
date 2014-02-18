# Jerry Rig
Jerry Rig is a tool for starting web applications fast.

## Starter Specification
Running Jerry Rig require you have a jerry.json file.
The object inside the jerry.json file can have the following basic properties:<br/>
```
{
	"projectName": <Name for the project>,
	"version": <The Version of the project>,
	"clientDirectory": <The directory were all client-side code lives, if left blank it defaults to the root directory>
}
```
After you define the basic properties you can define more application specific properties. 
These are all detailed in the subsections below.

### Node Package Manager
```
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