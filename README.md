# grunt-tsreflect

> Grunt plugin to generate TypeScript declaration files in JSON format for runtime type information.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tsreflect --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tsreflect');
```

## The "tsreflect" task

### Overview
In your project's Gruntfile, add a section named `tsreflect` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  tsreflect: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### noCheck
Type: `Boolean`
Default value: `false`

Disable type checking. If you are sure that your code already compiles correctly with TypeScript, you can enable this option for slightly faster compile times.

#### noLib
Type: `Boolean`
Default value: `false`

Disable inclusion of default lib.d.ts.

#### removeComments
Type: `Boolean`
Default value: `false`

Do not include the description from JsDoc comments in compiled output.

### Usage Examples

#### Compile files to output directory


```js
grunt.initConfig({
  tsreflect: {
    files: {
      src: [
        'src/file1.ts',
        'src/file2.ts',
        'src/files3.d.ts'
      ],
      dest: 'build/'
    }
  }
});
```

#### Compile to specified file

```js
grunt.initConfig({
  tsreflect: {
    files: {
      src: [
        'src/file1.ts',
        'src/file2.ts',
        'src/files3.d.ts'
      ],
      dest: 'build/file.d.json'
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.

## Release History
