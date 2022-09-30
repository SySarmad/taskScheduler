# Task Scheduler

**Assumptions**

started kind of late in the day so i figured i would just power through here but at least show my assumptions and thought process. 

Initially a bit confused on how std in is being processed, I went with the pattern
```js
cat [path-to-file] | program
```
should be easy to handle another pattern like '>' or path to the file directly to the program. 


### Usage
```bash
npm i 
npm run build
cat [path-to-file] | node ./dist/index.js
```

**Problem:**
 Task execution ordering. Imagine a system of related tasks where
 some tasks depend on others to complete before they can start. Some tasks
 will have no dependencies and can start right away, and others will need
 to wait for one or more tasks to complete.

 These dependency relationships are defined in a text stream with lines
 starting with a task identifier (1-20 case sensitive roman alphabet
 characters [a-zA-Z]), followed by a ':', followed by a comma delimited list
 of dependencies (task identifiers). For example, if T depends on A and B,
 you'll have the line:

 T:A,B

This file is valid input, and contains four examples of task groups

**EXAMPLE OUTPUT(S)**
B A T 

A B T


## Betterments

If i had more time or in an ideal world, I would like to experiment with multiple data structures. I think we are loosing some efficiency in the current iteration, wanted to go with what I know out of the gate. The light memoization helps, but I worry about some edge cases here. And maybe an actual testing suite. 
