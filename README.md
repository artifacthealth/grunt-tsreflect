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

This task uses the tsreflect-compiler to generate JSON files which contain type information from your TypeScript files.
The generated files are similar to TypeScript's .d.ts declaration files but are in a JSON format and have the extension .d.json.

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
    }
  }
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

#### noImplicitAny
Type: `Boolean`
Default value: `false`

Warn on expressions and declarations with an implied any type.

#### accessors
Type: `Boolean`
Default value: `false`

Emit property accessor declarations. By default property accessors are emitted as regular properties.

#### annotations
Type: `Boolean`
Default value: `false`

Include custom annotations in output.

#### removePrivates
Type: `Boolean`
Default value: `false`

Do not emit private class member declarations.

#### typePrivates
Type: `Boolean`
Default value: `false`

Emit type information, if accessible, for private class members.

By default, private class members are emitted. However, type information (such as parameter types or field types) are not emitted.
Additionally, if a method is overloaded, only the first overload is emitted. Enabling this optional will emit full
declarations for private class members (including all overloads) as long as the type of the member is accessible from outside of the module
that contains the class. If the type of the member is not accessible, the type information will be silently excluded.

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

#### Compile to specified file and emit custom annotations

```js
grunt.initConfig({
  tsreflect: {
    files: {
      options: {
        annotations: true
      },
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
