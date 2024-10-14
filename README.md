## File manager

- Node.js Version: >=22.9.0
- The programm is started by npm-script `start`

```bash
node index.js --username=your-username
```

!Warning! If you use path with spaces you should insert your path inside quotes

- To exit the program you can use `.exit` or `ctrl + c`
- To go upper from current directory

```bash
up
```

- Go to dedicated folder from current directory (path_to_directory can be relative or absolute)

```bash
cd path_to_directory
```

- Print in console list of all files and folders in current directory

```bash
ls
```

- To get help about all 'File Manager' commands run:

```bash
help
```

---

### Working with files

- Read file and print it's content in console

```bash
cat path_to_file
```

- Create empty file in current working directory

```bash
add new_file_name
```

- Rename file

```bash
rn path_to_file new_filename
```

- Copy file

```bash
cp path_to_file path_to_new_directory
```

- Move file

```bash
mv path_to_file path_to_new_directory
```

- Delete file

```bash
rm path_to_file
```

### Get information about Operating system

- Get EOL(End-Of-Line)

```bash
os --EOL
```

- Get host machine CPUs info

```bash
os --cpus
```

- Get home directory

```bash
os --homedir
```

- Get current system user name

```bash
os --username
```

- Get CPU architecture

```bash
os --architecture
```

- To get all info about os commands type:

```bash
os .help
```

### Hash calculation

```bash
hash path_to_file
```

### Working with compression

- Compress file

```bash
compress path_to_file path_to_destination
```

- Decompress file

```bash
decompress path_to_file path_to_destination
```
