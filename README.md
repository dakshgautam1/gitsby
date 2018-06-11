# GITSBY

Gitsby is a CLI application that lets you speed up "git" initialization process faster.

It performs following actions with one command:
1. Creates `.gitignore` file. 
2. Creates a repository on Github. 
3. Initializes `.git `on the remote. 
4. Adds `.gitignore `and makes the first default commit. 
5. Pushes the changes to the repository. 

### Installing

Installing the package on the local machine. 
```
npm install -g gitsby
```

To start the process, navigate to the working directory. 

1. Command without arguments.
```
gitsby 
```

2. Command with arguments.
```
gitsby [repository-name] [repo-description]
```

###### Example: 

```
gitsby hello-world "A starter repo"
```

## Contributing

Any kind of contributions will be appreciated. PR away!


## Authors

* **Daksh Gautam** - *Initial work* - (https://github.com/dakshgautam1)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

